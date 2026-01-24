import express, { urlencoded } from "express"
import cors from "cors"

const app = express();


app.use(cors())
app.use(express.json({limit:"16kb"}))
app.use(urlencoded());
app.use(express.static("public"))




export default app;