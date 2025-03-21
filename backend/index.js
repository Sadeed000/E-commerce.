const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()
const fileupload = require('express-fileupload');   

app.use(fileupload({useTempFiles: true}))
// const corsOptions = {
//      origin:"*",
//     // origin: 'https://mern-client2.vercel.app', // specify your client's origin
//     credentials: true, // allow credentials (cookies, etc.)
//   };

// app.use(cors({
//     origin: '*',
//     credentials: true
//   }));
//   app.use(cors());



app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true
}));

app.use(express.json())




// app.use(cors({
//   origin: "*",
//   credentials: true
// }));

// app.use(express.json());

// const corsOptions ={
//    origin:'http://localhost:3000', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }

  // app.use(cors(corsOptions));
  

// app.use(cors({
//     origin : `http://localhost:4000`,
//     credentials : true
// }))  

app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});
app.use(express.json())
app.use(cookieParser())

app.use("/api",router)

const PORT = 8000 || process.env.PORT


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})
