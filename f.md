# 🎥 AutoQA Agent - Demo Video Screenplay

**Target Duration:** 5-10 Minutes
**Goal:** Demonstrate compliance with all assignment requirements (Functionality, Grounding, Script Quality).

---

## 🎬 Scene 1: Introduction & Architecture (0:00 - 1:30)

**Visual:** 
- Start on the **Deployed Web App** (Landing Page).
- Show the clean UI, the title "Autonomous QA Agent", and the "Gemini 2.5 Flash" badge.

**Narration (Voiceover):**
> "Hi, this is Ashish Khatri. Welcome to my submission for the Autonomous QA Agent assignment.
> 
> What you are seeing is the live deployment of the AutoQA Agent. This is an intelligent system designed to ingest raw project documentation and HTML, and autonomously convert them into grounded test plans and executable Selenium Python scripts.
> 
> Before we run the agent, I want to briefly show you the architecture and code that powers it."

---

## 🎬 Scene 2: Codebase Walkthrough (VS Code) (1:30 - 3:00)

**Visual:**
- Open VS Code.
- Navigate to `examples/` folder.
- Show `product_specs.md`, `ui_ux_guide.txt`, `api_endpoints.json`, and `checkout.html`.

**Narration:**
> "Let me show you the files we'll be uploading. In the examples folder, we have the product specifications—this markdown file describes all the business rules and features, like what discount codes are valid. We have a UI guide that explains the design and how things should work. We also have an API endpoints file that documents the backend endpoints. And we have the checkout HTML file—this is the actual page we want to test.
>
> When I upload these to the app, the system will read through everything and understand what needs to be tested."

**Visual:**
- Open `src/services/geminiService.ts`.
- Show the three main functions: `buildKnowledgeBase()`, `generateTestCases()`, `generateSeleniumScript()`.

**Narration:**
> "This is the core service file written in TypeScript. It has three main functions. First, it builds the knowledge base from the documents you upload. Second, it generates test cases based on what you ask for. And third, it creates the actual Selenium scripts that will automate the tests. I used Google AI Studio during development to help with the code generation and deployment setup, which made the whole process much smoother."

**Visual:**
- Open `src/components/IngestionPanel.tsx`.
- Show the file structure with other components like `TestCasePanel.tsx` and `ScriptPanel.tsx`.

**Narration:**
> "These are the React components that make up the user interface. The IngestionPanel is where you upload files. The TestCasePanel displays the generated test cases. And the ScriptPanel shows the Selenium code that's been generated. Together, they create the workflow you'll see in the app."

---

## 🎬 Scene 3: GitHub & Documentation (3:00 - 4:00)

**Visual:**
- Switch to GitHub in browser.
- Show the repository page with all the files visible.
- Scroll through the file structure showing the `examples/` folder with all the files we just saw.

**Narration:**
> "The entire project is hosted on GitHub. You can see all the files here.Here's the comprehensive README that documents everything — key features, a setup guide, usage instructions, and all the details about how the system works."

**Visual:**
- Scroll back to the top of the repository page.
- Show the "About" section or repository description area where the deployment link is visible.

**Narration:**
> "I've deployed this application using Google AI Studio, which helped me set up the deployment quickly and efficiently. Let's checkout the deployment link where the live application is running."

---

## 🎬 Scene 4: Knowledge Base Ingestion (4:00 - 5:30)

**Visual:**
- The application loads and shows the landing page.
- The interface displays two main upload sections: "Support Documents" and "Target HTML".

**Narration:**
> "We're now in the application. Phase 1 is all about uploading your files and building the knowledge base. You'll see two upload sections here. First, the Support Documents area—this is where we upload the product specs, UI guide, and API endpoints. Second, the Target HTML area—this is where we upload the checkout.html file."

**Visual:**
- Click on the "Support Documents" upload area.
- A file picker opens.

**Narration:**
> "Let's start by uploading the three document files on the Support Documents section. As I select them, you can see they appear in the list.
>
> Now let's move on to the target HTML file—the checkout page we want to test."

**Visual:**
- Show a "Build Knowledge Base" button that appears after all files are uploaded.
- Click the button.
- Show a loading/processing state with a progress indicator or status message.

**Narration:**
> "Once all files are uploaded, click 'Build Knowledge Base'. The system will now process all these documents. It reads through them, chunks the information, and prepares everything.
> You'll see a loading indicator showing the progress. This is the system learning about your project.
> And once it's done, we move to Phase 2 where we can generate test cases."

---

## 🎬 Scene 5: Grounded Test Case Generation (5:30 - 7:00)

**Visual:**
- The app transitions to Phase 2.
- Show a text input field with placeholder text for entering a prompt.

**Narration:**
> "Phase 2 is Test Case Generation. Here you can enter a prompt asking the system to generate test cases for specific features. For testing i have already hardcoded the prompt into the scripting asking the system to generate both positive and negative test cases for the discount code feature.
>
>This will test valid codes, invalid codes, edge cases—everything a QA team would typically test."

**Visual:**
- Click the "Generate" button.
- Show a loading state with a message like "Generating test cases..." or spinning indicator.

**Narration:**
> "Now clicking on Generate button, the system is analyzing the documents we uploaded, understanding the business rules, and creating comprehensive test cases.
> It will take a few minutes."

**Visual:**
- Wait a few seconds for the loading to complete.
- Show the generated test cases appearing with details like:
  - Test case name (e.g., "Apply valid discount code SAVE15")
  - Description
  - Grounding tag showing source (e.g., "Grounded_In: product_specs.md")

**Narration:**
> "You can see the generated test cases, each one has a grounding tag showing where it came from in the documentation.
>
> Now the Phase 3 is where we generate the actual Selenium script. I'll select one of the test cases and generate the Python code for it."
---

## 🎬 Scene 6: Selenium Script Generation (7:00 - 8:30)

**Visual:**
- Click the "Generate Script" button.
- Show a loading state with message like "Writing robust Selenium code..."

**Narration:**
> "The system is now writing the Python Selenium code for the specific test case. It's analyzing the HTML structure, finding the right elements, and creating automation code."

**Visual:**
- Wait for loading to complete.
- Show the generated Python code in a code block with syntax highlighting.
- The code should show things like:
  - `from selenium import webdriver`
  - `from selenium.webdriver.common.by import By`
  - `driver.find_element(By.ID, "discount-code")`
  - `WebDriverWait` usage

**Narration:**
> "This is the generated Python code - complete and ready to run. It imports Selenium, finds the discount code input field using the ID we saw in the HTML, enters the code, and verifies the result.
> We can also copy this code or download it as a Python file. Let's download the file and open it on VS Code."


## 🎬 Scene 7: Execution & Conclusion (8:30 - End)

**Visual:**
- Open VS Code.
- Open or navigate to the downloaded Python file.
- Show the complete script with proper formatting and syntax highlighting.

**Narration:**
> "Here's the downloaded script in VS Code. You can see the complete automation code. It opens a browser, navigates to the checkout page, enters the discount code, clicks apply, and verifies it worked. This is production-ready code that actually runs."

**Visual:**
- Scroll through the code to show key sections like error handling, waits, and browser cleanup.

**Narration:**
> "The code is well-structured with proper waits, error handling, and it closes the browser cleanly when done. This is exactly what a real test script should look like. We can also run this code which will open a browser, navigate to the checkout page, enters the discount code, click apply, and verify the working.
>
> And that completes the full workflow, from uploading documents to generating test cases and getting Selenium scripts. The Autonomous QA Agent handles the entire process automatically."

---