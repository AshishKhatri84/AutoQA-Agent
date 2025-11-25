# Autonomous QA Agent

An intelligent, autonomous QA agent capable of constructing a “testing brain” from project documentation and HTML.

## Features

- **Knowledge Base Ingestion**: Upload support documents (Markdown, JSON, Text) and target HTML.
- **Grounding**: Utilizes Gemini 3 Pro's massive context window to ground all test generation strictly in uploaded documents (Recall is superior to traditional RAG for project-sized contexts).
- **Test Case Generation**: AI generates comprehensive test plans with positive/negative scenarios.
- **Selenium Script Generation**: AI generates fully runnable Python Selenium scripts using actual HTML selectors.

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file with your API key: `API_KEY=your_gemini_api_key`
4. Run the app: `npm start`

## Usage Flow

1. **Ingestion**: Upload the files located in `examples/` (or your own project files).
   - `checkout.html` (Target Web Project)
   - `product_specs.md` (Rules)
   - `ui_ux_guide.txt` (Design Guidelines)
2. **Build Knowledge Base**: Click the button to process files. The system will simulate vector ingestion and prepare the context.
3. **Generate Test Cases**: Enter a prompt like "Generate tests for discount codes" and view the plan.
4. **Generate Script**: Click the "Play" button on a test case.
5. **Run Script**:
   - Copy the generated Python code.
   - Save it as `test_script.py` in the same folder as your `checkout.html`.
   - Run: `python test_script.py`
   - *Note: Ensure you have `selenium` installed (`pip install selenium`) and a compatible WebDriver (like ChromeDriver).*

## Included Examples

- **checkout.html**: A sample e-commerce checkout page.
- **product_specs.md**: Business logic for discounts and shipping.
- **ui_ux_guide.txt**: Visual and validation requirements.
- **api_endpoints.json**: Backend API definitions.