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


app.listen(port,()=>{
console.log("server is running on port 7000");
})
