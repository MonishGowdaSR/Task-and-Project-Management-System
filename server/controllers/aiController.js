const axios = require("axios");

const generateTaskDescription =
  async (req, res) => {

    try {

      const { title } = req.body;

      if (!title) {

        return res.status(400).json({
          message:
            "Task title is required",
        });
      }

      const response =
        await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model:
              "mistralai/mistral-7b-instruct",

            messages: [
              {
                role: "user",

                content: `
                  Generate a professional
                  task description for:

                  "${title}"

                  Keep it concise,
                  practical,
                  and professional.
                `,
              },
            ],
          },
          {
            headers: {
              Authorization:
                `Bearer ${process.env.OPENROUTER_API_KEY}`,

              "Content-Type":
                "application/json",
            },
          }
        );

      const description =
        response.data.choices[0]
          .message.content;

      res.status(200).json({
        description,
      });

    } catch (error) {

      console.log(error.response?.data || error);

      res.status(500).json({
        message:
          "AI generation failed",
      });
    }
  };

module.exports = {
  generateTaskDescription,
};