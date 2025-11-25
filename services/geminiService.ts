import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TestCase, UploadedFile } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const TEST_CASE_SCHEMA: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      testId: { type: Type.STRING },
      feature: { type: Type.STRING },
      scenario: { type: Type.STRING },
      expectedResult: { type: Type.STRING },
      groundedIn: { type: Type.STRING, description: "The specific document name this test is based on." },
    },
    required: ["testId", "feature", "scenario", "expectedResult", "groundedIn"],
  },
};

export const generateTestCases = async (
  prompt: string,
  documents: UploadedFile[]
): Promise<TestCase[]> => {
  // Using gemini-3-pro-preview for complex reasoning and grounding
  const model = "gemini-3-pro-preview";
  
  const docContext = documents
    .filter(d => d.type === 'document')
    .map(d => `--- DOCUMENT: ${d.name} ---\n${d.content}\n--- END DOCUMENT ---`)
    .join('\n\n');

  const htmlContext = documents.find(d => d.type === 'html');
  const htmlString = htmlContext 
    ? `--- TARGET HTML: ${htmlContext.name} ---\n${htmlContext.content}\n--- END HTML ---`
    : "No HTML provided.";

  const fullPrompt = `
    You are an expert QA Automation Engineer. 
    Your goal is to generate comprehensive test cases grounded STRICTLY in the provided documentation.
    Do not hallucinate features. If a feature is not in the docs or HTML, do not test it.
    
    CONTEXT:
    ${docContext}

    ${htmlString}

    USER REQUEST:
    ${prompt}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: TEST_CASE_SCHEMA,
        systemInstruction: "You are an autonomous QA agent. Always return a valid JSON array of test cases.",
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as TestCase[];
    }
    throw new Error("No response from Gemini");
  } catch (error) {
    console.error("Error generating test cases:", error);
    throw error;
  }
};

export const generateSeleniumScript = async (
  testCase: TestCase,
  documents: UploadedFile[]
): Promise<string> => {
  // Using gemini-3-pro-preview for high-quality coding tasks
  const model = "gemini-3-pro-preview";

  const htmlContext = documents.find(d => d.type === 'html');
  const htmlContent = htmlContext ? htmlContext.content : "";
  
  const relevantDocs = documents
    .filter(d => d.type === 'document')
    .map(d => `--- DOCUMENT: ${d.name} ---\n${d.content}`)
    .join('\n\n');

  const prompt = `
    You are a Senior Python Selenium Automation Expert.
    
    TASK:
    Generate a robust, runnable Python Selenium script for the following test case.
    
    TEST CASE:
    ID: ${testCase.testId}
    Scenario: ${testCase.scenario}
    Expected Result: ${testCase.expectedResult}
    
    TARGET HTML CONTENT (Use this for accurate selectors):
    ${htmlContent}
    
    SUPPORTING DOCS:
    ${relevantDocs}
    
    REQUIREMENTS:
    1. Include all necessary imports:
       - selenium
       - webdriver from selenium
       - By from selenium.webdriver.common.by
       - WebDriverWait from selenium.webdriver.support.ui
       - expected_conditions as EC from selenium.webdriver.support
       - os
       - time (if needed for small pauses, though explicit waits are preferred)
    2. Setup the Chrome driver (using webdriver.Chrome()).
    3. Load the page. Assume the file is named 'checkout.html' and is located in the same directory as the script. Use os.getcwd() + filename.
    4. Implement the test steps using precise selectors (ID, Name, CSS) found in the provided HTML content.
    5. Add assertions to verify the Expected Result programmatically. Print "TEST PASSED" or "TEST FAILED" based on the assertion.
    6. Wrap the logic in a try-finally block to ensure driver.quit() is always called.
    7. Return ONLY the Python code. No markdown formatting, no backticks.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.1, // Very low temperature for precise code generation
      }
    });

    let text = response.text || "";
    
    // Improved cleanup for markdown code blocks
    text = text.replace(/^```python\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
    
    return text.trim();
  } catch (error) {
    console.error("Error generating script:", error);
    throw error;
  }
};