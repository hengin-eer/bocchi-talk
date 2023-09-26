import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
	if (!config.apiKey) {
		res.status(500).json({
			error: {
				message: "OpenAI API key is not defined",
			},
		});
		return;
	}

	const requestContents = `
	# Proofread the following sentences.

	Before: hallo, wolld!
	After: Hello, world!

	Before: this is an pens.
	After: This is a pen.

	Before: Im "hengineer"!
	After: I'm "hengineer"!

	Before: Thank you.
	After: Thank you.

	Before: ${req.body.message}
	After: `

	const message = [{
		role: "user",
		content: requestContents,		
	}];

	try {
		const completion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: message,
			temperature: 0.7,
			max_tokens: 200,
		});

		res.status(200).json({ result: completion.data.choices[0].message });
	} catch (error) {
		if (error.response) {
			console.error(error.response.status, error.response.data);
			res.status(error.response.status).json(error.response.data);
		} else {
			console.error(`Error with OpenAI API request: ${error.message}`);
			res.status(500).json({
				error: {
					message: "An error occurred during your request.",
				},
			});
		}
	}
}