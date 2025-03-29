import ollama from "ollama";

export class OllamaLLM {
	private model: string;

	constructor(model: string = "deepseek-coder:1.3b") {
		this.model = model;
	}

	async ask(prompt: string): Promise<string> {
		const response = await ollama.chat({
			model: this.model,
			messages: [{ role: "user", content: prompt }],
		});
		return response.message.content;
	}
}
