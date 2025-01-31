const express=require("express");
const fs=require("fs");
const status=require("express-status-monitor");
const zlib=require("zlib");

const app =express();
const port=7000;
app.use(status());


app.get("/",(req,res)=>{
fs.readFile("./plain.txt",(err,data)=>{
res.end(data);
})
})

app.get("/chunks",(req,res)=>{
const stream=fs.createReadStream("./plain.txt","utf-8");
stream.on("data",(chunk)=>{
res.write(chunk);
})
stream.on("end",()=>{res.end();})
})

const makeZip=async(filePath,destinationPath)=>{
const stream=fs.createReadStream(`${filePath}`,"utf-8");
stream.pipe(zlib.createGzip().pipe(fs.createWriteStream(`${destinationPath}`)));
}

//calling the function to create zip file:
makeZip('./plain.txt',"./plainsamplezip.zip");

app.listen(port,()=>{
console.log("server is running on port 7000");
})
