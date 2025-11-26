# 🎥 AutoQA Agent - Demo Video Screenplay

**Target Duration:** 5-10 Minutes
**Goal:** Demonstrate compliance with all assignment requirements (Functionality, Grounding, Script Quality).

---

## 🎬 Scene 1: Introduction & Setup (0:00 - 1:00)

**Visual:**
- Start with the **README.md** file open on GitHub.
- Briefly show the `checkout.html` file in the code editor to prove it exists and is valid HTML.
- **Action:** Open the terminal, run `npm start` (or `npm run dev`), and click the localhost link to open the app in the browser.

**Narration (Voiceover):**
> "Hi, this is Ashish Khatri. This is my submission for the Autonomous QA Agent assignment.
> The goal is to build an AI agent that ingests documentation and generates grounded test cases and Selenium scripts.
> Here is the source code structure, the README with full setup instructions, and the target `checkout.html` file we will be testing.
> Let's launch the application."

---

## 🎬 Scene 2: Knowledge Base Ingestion (1:00 - 3:00)

**Visual:**
- **Action:** Click on the "Upload Support Documents" box.
- **Action:** Select `product_specs.md`, `ui_ux_guide.txt`, and `api_endpoints.json` from the `examples/` folder.
- **Action:** Point out the PDF badge (or mention PDF support if you upload a dummy PDF).
- **Action:** Click "Target HTML" and upload `checkout.html`.
- **Action:** Click the **"Build Knowledge Base"** button.
- **Observation:** Zoom in or highlight the status text showing "Parsing...", "Chunking...", "Indexing...".

**Narration:**
> "Phase 1 is Knowledge Base Ingestion. I am uploading the provided support documents: Product Specs, UI/UX Guide, and API definition.
> I also upload the target web page, `checkout.html`.
> When I click 'Build', the system simulates a RAG pipeline: it parses the text, chunks it, generates embeddings, and indexes them for retrieval.
> Once complete, the system is ready for context-aware queries."

---

## 🎬 Scene 3: Grounded Test Case Generation (3:00 - 5:00)

**Visual:**
- App automatically navigates to the **Test Generator** tab.
- **Action:** Type the prompt: *"Generate positive and negative test cases for the discount code feature."*
- **Action:** Click "Generate".
- **Observation:** Wait for the results. Scroll through the generated cards.
- **Highlight:** Hover over the "Grounded_In: product_specs.md" tag on a test case.

**Narration:**
> "Now for Phase 2: Test Case Generation. I'll ask the agent to generate tests for the 'Discount Code' feature.
> Notice the output. It produced specific scenarios like applying 'SAVE15' for a 15% discount.
> Crucially, look at the 'Grounded In' tag. This proves the agent isn't hallucinating; it pulled this rule directly from the `product_specs.md` file I uploaded earlier.
> It also generated negative cases for invalid codes, as per the specs."

---

## 🎬 Scene 4: Selenium Script Generation (5:00 - 7:00)

**Visual:**
- **Action:** Click the **"Generate Script"** button on the "Apply SAVE15" test case.
- **Observation:** The screen transitions to the Script Panel.
- **Observation:** The AI writes the Python code line-by-line (or shows the final block).
- **Highlight:** Point out the specific selectors in the code (e.g., `By.ID, "discount-code"`).
- **Highlight:** Point out the `WebDriverWait` usage.

**Narration:**
> "Moving to Phase 3: Selenium Script Generation. I'll select the positive test case.
> The agent is now retrieving the full HTML structure of `checkout.html` to find the exact selectors.
> Looking at the generated code:
> 1. It imports the correct Selenium libraries.
> 2. It uses `WebDriverWait`, which is a best practice for stability.
> 3. It targets the real ID `discount-code` found in the HTML file.
> 4. It includes assertions to verify the '15% Applied' message."

---

## 🎬 Scene 5: Execution & Conclusion (7:00 - End)

**Visual:**
- **Action:** Click the **"Download .py"** button.
- **Action:** Open a terminal/command prompt.
- **Action:** Run `python [downloaded_filename].py`.
- **Observation:** Chrome browser opens, loads the local HTML file, types "SAVE15", clicks Apply, and closes.
- **Action:** Show the "TEST PASSED" message in the terminal.

**Narration:**
> "Finally, let's verify functionality. I'll download the script and run it locally against the `checkout.html` file.
> [Watch script run].
> The test passed successfully.
> This demonstrates an end-to-end workflow: from raw documents to a functioning automated test script, all generated autonomously.
> Thank you for watching."
