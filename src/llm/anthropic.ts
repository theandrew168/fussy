import Anthropic from "@anthropic-ai/sdk";

export class AnthropicLLM {
	private client: Anthropic;
	private model: string;

	constructor(apiKey: string, model: string = "claude-3-7-sonnet-latest") {
		this.client = new Anthropic({ apiKey });
		this.model = model;
	}

	async ask(prompt: string): Promise<string> {
		const response = await this.client.messages.create({
			max_tokens: 1024,
			messages: [{ role: "user", content: prompt }],
			model: this.model,
		});
		const textBlocks = response.content.filter((contentBlock) => contentBlock.type === "text");
		return textBlocks.map((textBlock) => textBlock.text).join("\n");
	}
}
