# Demo Video Screenplay: Autonomous QA Agent

**Target Duration:** 5–10 Minutes
**Goal:** Demonstrate compliance with all assignment requirements (Ingestion, Grounding, Script Generation, Execution).

---

## 🎬 1. Introduction (0:00 - 0:45)
**Visual:** Face camera or Title Slide, then switch to the `README.md` on GitHub or VS Code.
**Action:** Briefly introduce the project.
**Script:**
> "Hi, I am [Your Name]. This is my submission for the Autonomous QA Agent assignment.
> This system uses a React frontend and a Gemini-powered backend to automatically generate grounded test cases and Selenium scripts from raw documentation.
> I will walk you through the full workflow: uploading documents, building the knowledge base, generating a test plan, and finally executing a generated Selenium script."

---

## 🎬 2. Phase 1: Knowledge Base Ingestion (0:45 - 2:30)
**Visual:** The App's Landing Page (Ingestion Panel).
**Action:**
1.  Point to the "Support Documents" upload area.
2.  Select/Drag-and-drop the files from the `examples/` folder: `product_specs.md`, `ui_ux_guide.txt`, `api_endpoints.json`.
3.  **Key Point:** Mention what's in them.
    > "I am uploading the Product Specs which contain the logic for the 15% discount, and the UI Guide which specifies that errors must be red."
4.  Upload `checkout.html` to the "Target HTML" area.
5.  Click the **"Build Knowledge Base"** button.
6.  Wait for the visual simulation (Chunking, Embedding, Indexing) to finish.

**Script:**
> "First, I ingest the project assets. Here I have the product specifications, UI/UX guidelines, and API docs. I also upload the raw `checkout.html` file so the agent knows the real DOM structure.
> When I click 'Build', the system parses these files, chunks the text, and generates vector embeddings to create a grounded Knowledge Base."

---

## 🎬 3. Phase 2: Test Case Generation (2:30 - 4:30)
**Visual:** The `Test Generator` Panel (automatically appears after building).
**Action:**
1.  Show the Prompt Input.
2.  Type: *"Generate all positive and negative test cases for the discount code feature."*
3.  Click **Generate**.
4.  Scroll through the results.
5.  **Crucial:** Hover over or highlight the `Grounded_In` badge on a test case.

**Script:**
> "Now that the brain is built, I'll ask the Agent to generate test cases for the Discount Code feature.
> Notice the output. It generated a positive case for 'SAVE15' giving a 15% discount.
> Most importantly, look at the grounding. This test case explicitly cites `product_specs.md` as its source. This proves the system isn't hallucinating; it's using the uploaded context."

---

## 🎬 4. Phase 3: Selenium Script Generation (4:30 - 6:00)
**Visual:** Selecting a Test Case -> Script Panel.
**Action:**
1.  Click **"Generate Script"** on the `TC-001` (or similar) Discount Code test case.
2.  Show the loading state ("Writing robust Selenium code...").
3.  Once code appears, scroll through it.
4.  **Highlight:** Point out `By.ID` selectors and `WebDriverWait`.

**Script:**
> "I'll select this test case to generate an automated script. The agent now retrieves the specific HTML content and the relevant docs to write Python Selenium code.
> Looking at the generated code:
> 1. It imports `webdriver` and `WebDriverWait`.
> 2. It uses the REAL IDs from my HTML file, like `id='discount-code'`.
> 3. It even includes assertion logic to verify the total price changed correctly."

---

## 🎬 5. Phase 4: Execution & Validation (6:00 - End)
**Visual:** VS Code / Terminal + Browser Window.
**Action:**
1.  Click the **"Download .py"** button in the app.
2.  Move the downloaded file to the folder containing `checkout.html`.
3.  Open a terminal.
4.  Run: `python TC-001_selenium.py` (or whatever the file name is).
5.  **Visual:** Let the browser open, fill the field, click apply, and close.
6.  Show the terminal output: `TEST PASSED: Discount applied correctly.`

**Script:**
> "Finally, let's verify this runs. I've downloaded the script.
> I will run it locally against the `checkout.html` file.
> [Browser opens]
> You can see the browser opens, enters 'SAVE15', clicks Apply, and verifies the price.
> [Back to Terminal]
> The assertion passed. The agent successfully automated the feature based entirely on documentation. Thank you."
