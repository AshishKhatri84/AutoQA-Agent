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
    1. IMPORTS:
       - selenium
       - webdriver from selenium
       - By from selenium.webdriver.common.by
       - WebDriverWait from selenium.webdriver.support.ui
       - expected_conditions as EC from selenium.webdriver.support
       - os
       - time (only if absolutely necessary, prefer explicit waits)
    
    2. DRIVER SETUP:
       - Initialize 'driver = webdriver.Chrome()'.
       - Set an implicit wait: 'driver.implicitly_wait(10)'.
       - Load the file: 
         current_dir = os.getcwd()
         file_path = os.path.join(current_dir, 'checkout.html')
         driver.get(f"file:///{file_path}")
    
    3. TEST EXECUTION:
       - Use 'WebDriverWait(driver, 10).until(EC...)' for critical interactions (buttons, dynamic elements).
       - Use PRECISE selectors (ID is best, then CSS Selector) found in the HTML content provided.
       - Perform the actions described in the Scenario.
    
    4. ASSERTION & VALIDATION:
       - Retrieve the actual result from the page (text, element presence, etc.).
       - Compare with Expected Result.
       - Print "TEST PASSED: [details]" if it matches.
       - Print "TEST FAILED: [details]" if it fails.
    
    5. ROBUSTNESS:
       - Wrap the execution logic in a 'try...finally' block to ensure 'driver.quit()' is ALWAYS called, even if the test fails.
    
    6. OUTPUT FORMAT:
       - Return ONLY the Python code. 
       - Do NOT wrap in markdown (\`\`\`python). 
       - Do NOT add explanations outside the code comments.
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
    
    // Improved cleanup for markdown code blocks to ensure clean copy-paste
    // Removes ```python at start, ``` at end, and generic ```
    text = text.replace(/^```python\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
    
    return text.trim();
  } catch (error) {
    console.error("Error generating script:", error);
    throw error;
  }
};