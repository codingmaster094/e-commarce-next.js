import express from "express"
const app = express()
import  env from "dotenv"
import fileUpload from "express-fileupload"
import cors from "cors"
import "./connection/confing.js"
import router from "./route/index.js"
import path from 'path'
import bodyParser from "body-parser"

const prot = process.env.Port || 2023
app.use('/', express.static('public'))
env.config()
app.use(fileUpload())
app.use(express.json())
app.use(bodyParser(express.urlencoded({ extended: true })))
app.use(bodyParser())

app.use(express.static('../Frontend/build'))
app.get("*", (req, res) => {
res.sendFile(path.resolve('../Frontend/build', 'index.html'))
})

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE"],
    })
);

app.use("/api" , router)

app.listen(prot, () => {
    console.log(`server Running on ${prot}`);
})