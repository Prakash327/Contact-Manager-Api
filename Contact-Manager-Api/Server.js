const express= require ('express');
const errorHandler = require('./middleware/errorhandler');
const app = express();
const env = require('dotenv').config()
const connectDB = require('./config/db')
connectDB();
app.use(express.json())
app.use("/api/contacts",require("./routes/contacts"));
app.use("/api/users",require("./routes/user"))
app.use(errorHandler)

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Your server is listining at port ${port}`)
})
// const start = async()=>{
//     try {
//         await connectDB(process.env.MONGO_URI)
//         app.listen(port,
//          console.log(`The server is listening at ${port}....`))
        
        

//     } catch (error) {
//         console.log(error)
        
//     }
// }
 
// start()