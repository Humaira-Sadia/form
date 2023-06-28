const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');

require('./db/connect')  //connecting with database 
const Register = require("./models/register");   // connecting with mongoose
const { json } = require('express');


const port = process.env.PORT || 3000

// const static_path = path.join(__dirname, "../public"); to integrate html with node js
// app.use(express.static(static_path))

const temp_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", temp_path);
hbs.registerPartials(partial_path);

app.get("/", (req,res)=>{
    res.render("index") // to render handle page instead of index.html page line no 8-9
});

app.get("/login", (req,res)=>{
    res.render("login") 
});

app.get("/register", (req,res)=>{
    res.render("register") 
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/register", async(req,res)=>{
    try{
        const password = req.body.password;
        const cPassword = req.body.confirmPassword;

        if(password === cPassword){
            const registerUser = new Register({  //getting data
                name : req.body.name,
                email : req.body.email,
                password : password
            })

            const registered = await registerUser.save();  //saving data in the database.
            res.status(201).render("index");
        }
        else{
            res.send("Password are not matching");
        }

    }
    catch(error){
        res.status(400).send(error);
    }
});


// app.listen(3000)

app.listen(port, ()=>{ // to host on other servers rather than localhost.
    console.log(`Server is running on ${port}`);
})