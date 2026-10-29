# API Demo - Multi-provider LLM Showcase

A simple, single-page web application to test OpenAI, Google Gemini, and Purdue GenAI Studio models.

## Features

- **Single Prompt Mode**: Enter a prompt and get a response from the selected model
- **Batch Processing**: Drag and drop multiple text files to process them with a base prompt
- **Multiple Providers**: Support for OpenAI, Google Gemini, and Purdue GenAI Studio
- **Cost Tracking**: Estimates token usage and cost for each request
- **API Key Persistence**: Keys are saved in localStorage for convenience

## Usage

1. Open `index.html` in your browser (or visit the [GitHub Pages site](https://cunmayday.github.io/apidemo/))
2. Select a provider (OpenAI, Gemini, or Purdue GenAI Studio)
3. Select a model
4. Enter your API key
5. Type a prompt and submit!

## Supported Models

### OpenAI
- GPT-6 Astra
- GPT-5.6 Sol
- GPT-5.6 Terra
- GPT-5.6 Luna

### Google Gemini
- Gemini 4 Argon (paid tier)
- Gemini 3.1 Pro (Preview)
- Gemini 3.8 Flash
- Gemini 3.6 Flash
- Gemini 3.5 Flash-Lite
- Gemini 3.1 Flash-Lite
- Gemini 3 Flash (Preview)
- Gemini 2.5 Pro (existing users)
- Gemini 2.5 Flash (existing users)
- Gemini 2.5 Flash-Lite (existing users)

Verified against Google's [model catalog](https://ai.google.dev/gemini-api/docs/models), [deprecation schedule](https://ai.google.dev/gemini-api/docs/deprecations), and [pricing](https://ai.google.dev/gemini-api/docs/pricing) on October 28, 2026. Gemini 3.8 Flash is the default. The list covers general text generation; Live, image, video, speech, and embedding models require different workflows. Gemini 2.5 access is limited to users who previously used those models; availability also depends on your API project and tier.

Cost estimates use standard paid text rates, including thinking tokens. Published price increases apply automatically for Argon on December 1, 2026, and for 3.8/3.6 Flash on January 1, 2027. Free-tier requests may cost less.

### Purdue GenAI Studio

- Models available to your Purdue API key are loaded from the GenAI Studio models endpoint.
- GPT-OSS 120B is shown as a documented fallback until the account-specific model list loads.

## No Build Required

This is a single HTML file with no dependencies. Just open it in a browser or host it anywhere!
