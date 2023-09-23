import Express from "express";
import dotenv from "dotenv";

import scoreRoute from "./routes/score.js";

dotenv.config();

const app = Express();

const PORT = process.env.PORT || 8080;

app.use("/score", scoreRoute);

app.listen(PORT, () => {
    console.log("connected")
});