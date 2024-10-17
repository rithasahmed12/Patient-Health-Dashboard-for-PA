import  express  from "express";
import dotenv from 'dotenv'
dotenv.config();
import connectDB from "./config/db"; 
import cors from 'cors';

import authRouter from "./routes/auth.routes";
import patientRouter from "./routes/patient.routes";
import priorAuthRouter from "./routes/prior-auth.routes";

const port = process.env.PORT || 5000;


connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use('/api/auth',authRouter)  
app.use('/api/patients',patientRouter);
app.use('/api/prior-authorizations',priorAuthRouter);  


app.get('/',(req,res)=> res.send('Server is ready'))


app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})