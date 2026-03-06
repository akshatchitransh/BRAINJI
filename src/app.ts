import express, { urlencoded } from "express"
import cors from "cors"
 import authRoutes from "./routes/auth.route.js"

const app = express();



app.use(cors({
  origin: "*"
}))
app.use(express.json())
app.use(urlencoded());
app.use(express.static("public"))
app.use("/api/auth",authRoutes)





export default app;