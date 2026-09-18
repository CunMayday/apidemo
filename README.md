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
- GPT-4o Mini
- GPT-5.2 (Pro Code)
- GPT-5 Mini
- GPT-5
- GPT-4.1
- GPT-4 Turbo
- GPT-4o

### Google Gemini
- Gemini 3 Pro
- Gemini 3 Flash
- Gemini 2.5 Pro
- Gemini 2.5 Flash
- Gemini 1.5 Pro

### Purdue GenAI Studio

- Models available to your Purdue API key are loaded from the GenAI Studio models endpoint.
- GPT-OSS 120B is shown as a documented fallback until the account-specific model list loads.

## No Build Required

This is a single HTML file with no dependencies. Just open it in a browser or host it anywhere!
