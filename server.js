import express  from "express";
import "dotenv/config"
const app = express();
import userRouter from './Router/UserRouter.js'
app.use(express.json())
const port = process.env.port || 4000


//endpoint

app.use('/api/user',userRouter)


app.listen(port, ()=>{ console.log(`server is Running ${port}`);})