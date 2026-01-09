export const MODEL_PRICING = {
  // OpenAI Pricing (per 1M tokens) - Jan 2026
  'gpt-4o': { input: 2.50, output: 10.00 },
  'gpt-4o-mini': { input: 0.15, output: 0.60 },
  'gpt-4-turbo': { input: 10.00, output: 30.00 }, // Preserving older pricing for reference
  'gpt-4.1': { input: 1.25, output: 10.00 },
  'gpt-5': { input: 1.25, output: 10.00 },
  'gpt-5-mini': { input: 0.25, output: 2.00 },
  'gpt-5.2': { input: 1.75, output: 14.00 },
  
  // Gemini Pricing (per 1M tokens) - Jan 2026
  'gemini-1.5-pro': { input: 1.25, output: 5.00 }, // < 128k context assumed for simple demo
  'gemini-2.5-flash': { input: 0.30, output: 2.50 },
  'gemini-2.5-pro': { input: 1.25, output: 10.00 },
  'gemini-3-flash-preview': { input: 0.50, output: 3.00 },
  'gemini-3-pro-preview': { input: 2.00, output: 12.00 },
};

export const calculateCost = (modelId, inputTokens, outputTokens) => {
  const rates = MODEL_PRICING[modelId];
  if (!rates) return null;

  const inputCost = (inputTokens / 1_000_000) * rates.input;
  const outputCost = (outputTokens / 1_000_000) * rates.output;

  return inputCost + outputCost;
};

export const formatCost = (cost) => {
  if (cost === null || cost === undefined) return 'N/A';
  if (cost === 0) return '$0.00';
  // Show more precision for very small amounts
  return cost < 0.01 ? `$${cost.toFixed(6)}` : `$${cost.toFixed(4)}`;
};
