import Express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = Express();

const PORT = process.env.PORT || 8080;

app.get("/:ens", async (req, res) => {
    return res.json({
        score: 800
    })
});

app.listen(PORT, () => {
    console.log("connected")
});