import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const callLLM = async ({ provider, model, apiKey, prompt }) => {
    if (!apiKey) {
        throw new Error('API Key is missing for ' + provider);
    }

    if (provider === 'openai') {
        const openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true // Required for client-side demo
        });

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: model,
        });

        return {
            text: completion.choices[0].message.content,
            usage: {
                input: completion.usage?.prompt_tokens || 0,
                output: completion.usage?.completion_tokens || 0
            }
        };
    }

    if (provider === 'gemini') {
        const genAI = new GoogleGenerativeAI(apiKey);
        const modelInstance = genAI.getGenerativeModel({ model: model });

        const result = await modelInstance.generateContent(prompt);
        const response = await result.response;
        const usageMetadata = result.response.usageMetadata;

        return {
            text: response.text(),
            usage: {
                input: usageMetadata?.promptTokenCount || 0,
                output: usageMetadata?.candidatesTokenCount || 0
            }
        };
    }

    throw new Error('Unknown provider');
};
