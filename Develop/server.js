const express = require("express");
const { dirname } = require("path");
const path = require("path");
const fs = require("fs");

let note =[{ id: 1, body: 'text here'},{id: 2, body: 'this is a second text'}]


const app = express();
const newLocal = 3000;
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

app.post('/api/notes', function(req, res){
  let SaveNotes = [];
  const NewNotes = req.body;
  console.log(req)
  fs.readFile(path.join(__dirname,"db","db.json"),"utf8", function(error,data){
    if(error){return console.log(error)}
    else{
        SaveNotes = JSON.parse(data)
        NewNotes.id = parseInt(Math.random()*10000)
        SaveNotes.push(NewNotes)
        console.log(SaveNotes)
        fs.writeFile(path.join(__dirname,"db","db.json"), JSON.stringify(SaveNotes), function(error){
            if(error){return res.status(500)}
            else{
                res.status(200)
            }
        })
    }
})
  console.log(SaveNotes)
  console.log(req.body)
  res.redirect('/');
});

app.listen(PORT, function(){
    console.log("server start running")
});










