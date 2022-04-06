const app = require("./app");

const { path } = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");


//handling uncaught exception

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Loging off Sorry for inconvinence due to uncaught exception`);
    process.exit(1);

})


//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }
// dotenv.config({path: "backend/config/config.env"});

// Connecting to database
connectDatabase();

cloudinary.config({
    
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
});


const server = app.listen(process.env.port,()=>{
    console.log(`server is working properly on http://localhost:${process.env.PORT}`)
})

//unhandled promise rejection

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Loging off Sorry for inconvinence`);

    server.close(()=>{
        process.exit(1);
    });
});