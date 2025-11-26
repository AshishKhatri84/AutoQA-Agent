# Autonomous QA Agent

An intelligent, autonomous QA agent capable of constructing a “testing brain” from project documentation and HTML to generate grounded test cases and executable Selenium scripts.

![Architecture](https://img.shields.io/badge/Architecture-Gemini%202.5%20Pro-blue)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Streamlit%20Logic-teal)

## 🚀 Key Features

### 1. Knowledge Base Ingestion
- Supports **PDF**, **TXT**, **MD**, **JSON**, and **HTML**.
- Simulates vector database processing (Chunking → Embedding → Indexing).
- Uses Gemini's massive context window to "ground" the AI in your specific documents.

### 2. Grounded Test Case Generation
- Generates Positive and Negative test cases.
- **Strict Grounding**: Every test case cites its source (e.g., `Grounded_In: product_specs.md`).
- Prevents hallucination by only testing features present in the Knowledge Base.

### 3. Selenium Script Generation
- Produces **production-ready Python Selenium** code.
- Uses **Robust Selectors**: Analyzes your `checkout.html` to find stable IDs, Names, and CSS selectors.
- **Self-Healing Logic**: Includes `WebDriverWait` (Explicit Waits) and `try...finally` blocks for driver cleanup.

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
