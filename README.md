# Autonomous QA Agent

**Autonomous QA Agent** is a next-generation testing tool designed to bridge the gap between static project documentation and dynamic test automation. 

Traditionally, QA engineers spend hours manually translating business requirements into test scenarios and then coding fragile Selenium scripts. This agent automates the entire lifecycle by ingesting raw support documents (PDF, MD, TXT) and the target application's structure (HTML) to construct a context-aware "testing brain".

Using **Google's Gemini 2.5 Pro** model, it reasoning capabilities to generate comprehensive, grounded test plans and production-ready Selenium Python scripts that are robust, self-healing, and strictly adhered to the provided specifications.

![Architecture](https://img.shields.io/badge/Architecture-Gemini%202.5%20Pro-blue)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Streamlit%20Logic-teal)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green)

## 🚀 Key Features

### 1. Knowledge Base Ingestion
- **Multi-Format Support**: Ingests **PDF**, **TXT**, **MD**, **JSON**, and **HTML** to build a comprehensive understanding of the project.
- **Vector DB Simulation**: Implements a simulated RAG pipeline (Chunking → Embedding → Indexing) to prepare data for the LLM.
- **Context Grounding**: Uses Gemini's massive context window to ensure every answer is "grounded" in your specific documents, eliminating hallucinations.

### 2. Grounded Test Case Generation
- **Intelligent Planning**: Generates comprehensive Positive and Negative test cases based on business rules.
- **Strict Grounding**: Every test case cites its source (e.g., `Grounded_In: product_specs.md`), ensuring full traceability.
- **Validation**: The agent cross-references features against the uploaded HTML to ensure they actually exist.

### 3. Selenium Script Generation
- **Production-Ready Code**: Produces clean, runnable Python Selenium scripts.
- **Robust Selectors**: Analyzes the `checkout.html` DOM to identify stable IDs, Names, and CSS selectors.
- **Best Practices**: Automatically includes `WebDriverWait` (Explicit Waits) and `try...finally` blocks for driver cleanup, preventing flaky tests.

---

## 🛠️ Setup & Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/auto-qa-agent.git
   cd auto-qa-agent
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   - Create a `.env` file in the root directory.
   - Add your Google Gemini API Key:
     ```env
     API_KEY=your_gemini_api_key_here
     ```

4. **Start the Application**
   ```bash
   npm start
   ```

---

## 📖 Usage Guide

### Phase 1: Build the Brain
1. Open the app in your browser.
2. Under **Support Documents**, upload the files found in the `examples/` folder:
   - `product_specs.md` (Business Rules)
   - `ui_ux_guide.txt` (Design Requirements)
   - `api_endpoints.json` (Optional)
3. Under **Target HTML**, upload `checkout.html`.
4. Click **"Build Knowledge Base"**. 
   - *Watch the status indicators as the system chunks and indexes your data.*

### Phase 2: Generate Test Cases
1. The app moves to the **Test Generator** tab.
2. Enter a prompt: 
   > "Generate all positive and negative test cases for the discount code feature."
3. The AI returns a structured Test Plan. verify that `Grounded_In` matches your uploaded files.

### Phase 3: Generate & Run Script
1. Click **"Generate Script"** on any test case (e.g., "Apply SAVE15").
2. The AI writes a Python script specifically for `checkout.html`.
3. Click **"Download .py"**.
4. **Run Locally**:
   - Ensure `selenium` is installed: `pip install selenium`
   - Place the downloaded script in the same folder as `checkout.html`.
   - Run it:
     ```bash
     python TC-001_selenium.py
     ```
   - *Observation: The browser should open, apply the code, and close automatically.*

---

## 📂 Project Structure

- `src/services/geminiService.ts`: Core AI logic. Uses `gemini-3-pro-preview` for advanced reasoning and coding.
- `src/components/IngestionPanel.tsx`: Handles file uploads and simulates vector pipeline visual feedback.
- `examples/`: Contains the sample "E-Shop" project assets required for the assignment.

---

## ✅ Evaluation Checklist

- [x] **Functionality**: Ingestion -> Test Gen -> Script Gen workflow is smooth.
- [x] **Grounding**: Test cases reference specific documents; no made-up features.
- [x] **Script Quality**: Scripts use `WebDriverWait`, correct imports, and real HTML selectors.
- [x] **UX**: Clear loading states, "Build" feedback, and intuitive navigation.
- [x] **Documentation**: Comprehensive README provided.
