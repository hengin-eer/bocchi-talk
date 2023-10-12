import { Configuration, OpenAIApi } from "openai";

// 発行したAPI Keyを使って設定を定義
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler( req, res ) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  // GPTに送るメッセージを取得
  const message = req.body.message;

  try {
    // 設定を諸々のせてAPIとやり取り
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: message,
      temperature: 0.9,
      max_tokens: 200, // GPTから返ってくるメッセージの最大文字数
    });
    // GPTの返答を取得
    res.status(200).json({ result: completion.data.choices[0].message });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      if (error.response.status === 429) {
        console.error(
          `OpenAI API rate limit exceeded: ${error.response.data.error.message}`
        );
        res.status(429).json({
          error: {
            status: 429,
            message: "OpenAI API rate limit exceeded.",
          },
        });
        return;
      }
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json({
        error: {
          status: error.response.status,
          message: error.response.data.error.message,
        },
      });
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