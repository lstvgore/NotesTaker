const express = require("express");
const { dirname } = require("path");
const path = require("path");
const fs = require("fs");


const app = express();
const PORT = process.env.PORT||3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))

app.get("/", function(req, res){
    console.log("request made")
    res.sendFile(path.join(__dirname,"index.html"))
})

app.get("/notes", function(req, res){
    console.log("resquest /notes")
    res.sendFile(path.join(__dirname,"public","notes.html"))
})

app.get('/api/notes', function(req, res){
   fs.readFile(path.join(__dirname,"db","db.json"),"utf8", function(error,data){
       if(error){return console.log(error)}
       else{
           res.send(data)
       }
   })
})

app.listen(PORT, function(){
    console.log("server start running")
});
