/**
 * Basic LLM behavior: ask a question, get a response.
 *
 * Implementations:
 * Local ollama
 * Anthropic
 * OpenAI
 * Gemini
 * Generic REST API
 */
export type LLM = {
	ask: (prompt: string) => Promise<string>;
};
