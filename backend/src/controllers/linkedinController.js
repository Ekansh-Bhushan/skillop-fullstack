const axios = require("axios");

exports.linkedinAuth = async (req, res) => {
    try {
        const key =
            "AQUikpshZQZTlkz4IQmXPXFf53AAvWgMY0J1fe3EQGWdZmycjtQdLlCHtix7WcAr-qDPkuXYHQ8wuFaaO3Lzi3BAcVDfjKmbMQa8GJV3UW7yLIKzDucjLwRG_V0NZD8v-0arkuxaOvDIulo_SuYuyWHgQUUY2N7x2wGVwAHnw5OJwcjodE6GCXY_baLM2f0WlfWHbrK8xyvg-PysfMN1DkDWrDuK031BZnyQo5df8F9TgkOM91iqNYOyqSPYdBwfHi6Ck9bRyrDQtkx6TIFfyZAEvN9DO3ryI3LClpasu8vyyWSoERt4WJrCotoFzBjt-7L9UZi01jJEPkUrQQvo1YQ2NXUl4w";
        if (!key) {
            return res.status(401).send({
                result: false,
                message: "Unauthorized",
            });
        }

        const response = await axios.get(
            "https://api.linkedin.com/v2/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${key}`,
                },
            }
        );

        return res.status(200).send({
            result: response.data,
            message: "LinkedIn auth retrieved successfully",
        });
    } catch (error) {
        return res.status(500).send({
            result: false,
            error: error.message,
            message: "Internal server error",
        });
    }
};
