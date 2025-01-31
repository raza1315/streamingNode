const express=require("express");
const fs=require("fs");
const status=require("express-status-monitor");

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



app.listen(port,()=>{
console.log("server is running on port 7000");
})
