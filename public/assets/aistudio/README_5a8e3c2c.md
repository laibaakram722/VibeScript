# Vibe Script ✨

Vibe Script helps short-form content creators turn rough video ideas into ready-to-publish captions with platform-specific formatting.

## Features

- **Zero-prompting:** Enter a rough idea; the app builds the model prompt for you.
- **Platform presets:** Instagram Reels, TikTok, and YouTube Shorts.
- **Tone presets:** Engaging, funny, inspirational, educational, storytime, and bold.
- **Copy-ready output:** Hook, short caption, call to action, and stacked hashtags.
- **Demo mode:** The interface works without an API key using a sample caption template.
- **Download:** Save the generated caption as a `.txt` file.

## Tech stack

- Python + Streamlit
- Google GenAI Python SDK
- Configured model: `gemma-4-26b-a4b-it`
- Model license stated in project brief: Apache 2.0
- Project license: MIT (add a `LICENSE` file before distributing)

> Model availability and exact model ID depend on your Google AI account and API. If the configured model is not available, replace `MODEL_NAME` in `app.py` with a model ID enabled for your account.

## Run locally

1. Clone your repository and enter the project directory:

   ```bash
   git clone https://github.com/YOUR-USERNAME/vibe-script.git
   cd vibe-script
   ```

2. Create and activate a virtual environment (recommended):

   ```bash
   python -m venv .venv
   ```

   Windows PowerShell:
   ```powershell
   .venv\Scripts\Activate.ps1
   ```

   macOS/Linux:
   ```bash
   source .venv/bin/activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Copy `.env.example` to `.env` and add your Google AI Studio API key:

   ```ini
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. Start the app:

   ```bash
   streamlit run app.py
   ```

The app should open in your browser. Keep `.env` private and never commit your API key.

## License

Intended project license: MIT. Include the full MIT license text in a `LICENSE` file before publishing.
