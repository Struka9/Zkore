import axios from "axios";
import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();

const HTTP_ENDPOINT = "https://beta.credprotocol.com/api/score/address";
const ADDRESS_REGEX = /^(0x[a-fA-F0-9]{40}|[a-zA-Z0-9-]+\.eth)$/;
const router = Router();

router.get("/:address", async (req, res) => {
    const { address } = req.params;
    if (!ADDRESS_REGEX.test(address)) {
        return res.status(406).json({
            error: "invalid address or ENS"
        });
    }

    const response = await axios.get(`${HTTP_ENDPOINT}/${address}`, {
        headers: {
            'Authorization': `Token ${process.env.auth_token}`
        }
    });

    if (response.status >= 500 && response.status < 600) {
        return res.status(500);
    }

    if (response.status != 200) {
        return res.status(500); // We don't want to leak errors
    }

    const { account, creation_date_utc, value, value_rating: rating } = response.data;

    return res.json({ account, creation_date_utc, value, rating });
});

export default router;