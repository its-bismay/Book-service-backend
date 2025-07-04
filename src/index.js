import express from "express"
import  "dotenv/config.js";
import cors from "cors"
import authRoute from './Routes/authRoute.js'
import bookRoute from './Routes/bookRoute.js'
import { connectDB } from "./lib/db.js";

const app = express();

const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

app.get("/", (req,res) => {
    res.send("server is running")
})
app.use('/api/auth', authRoute);
app.use('/api/books', bookRoute);

app.listen(3000, () => {
    console.log(`server is running on port ${port}`);
    connectDB()

})
