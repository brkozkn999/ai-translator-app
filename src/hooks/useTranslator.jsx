import { useEffect, useState } from "react";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

const useTranslate = (sourceText, selectedLanguage) => {
    const [targetText, setTargetText] = useState("");

    useEffect(() => {
        const handleTranslate = async (sourceText) => {
            try {
                const AiChatSession = model.startChat({
                    generationConfig,
                    safetySettings,
                    history: [],
                });

                const response = await AiChatSession.sendMessage(
                    `You will be provided with a sentence. This sentence: ${sourceText}. Your tasks are to: 
                    - Detect what language the sentence is in
                    - Translate the sentence into ${selectedLanguage}
                    Do not return anything other than the translated sentence.`
                );

                if (response && response.response && response.response.candidates && response.response.candidates.length > 0) {
                    const data = response.response.candidates[0].content.parts[0].text;
                    setTargetText(data);
                } else {
                    console.error("Invalid response structure:", response);
                }
            } catch (error) {
                console.error("Error translating text:", error);
            }
        };

        if (sourceText && sourceText.trim()) {
            const timeoutId = setTimeout(() => {
                handleTranslate(sourceText);
            }, 500);

            return () => clearTimeout(timeoutId);
        }
    }, [sourceText, selectedLanguage]);

    return targetText;
};

export default useTranslate;
