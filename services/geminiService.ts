// SERVICE DISABLED FOR STATIC DEPLOYMENT
// The user requested a static app without API costs.
// These functions are stubbed out.

export const generateTutorResponse = async (userMessage: string, context: string) => {
    return "AI Tutor is currently offline for this training session.";
};

export const generateSpeech = async (text: string): Promise<AudioBuffer | null> => {
    console.warn("TTS Service disabled in static mode.");
    return null;
};
