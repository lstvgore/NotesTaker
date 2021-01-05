const express = require("express");
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

app.delete(`/api/notes/:id`, function(req, res){
    console.log('GET HERE');
    console.log(req.body);
    fs.readFile(path.join(__dirname,"db","db.json"),"utf8", function(error,data){
        if (error) throw error;
        const allNotes = JSON.parse(data);
        const delNote = req.params.id;
        const result = allNotes.filter(note => note.id != delNote);
        
        console.log(allNotes);
        console.log(result);
        
        fs.writeFile(path.join(__dirname,"db","db.json"), JSON.stringify(result),function(error){
            if (error) res.json ({ err: "problem deleting "});
            // res.json(result);
            // res.json({message: "success delete"});
            console.log('write to file success')
        });
        res.redirect('/');
    })
})

app.listen(PORT, function(){
    console.log("server start running")
});










