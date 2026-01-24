import app from "./app.js";
import dotenv from "dotenv";
import { connectdb } from "./db/index.js";
dotenv.config();
connectdb();
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("server started at", PORT);
});
//# sourceMappingURL=index.js.map