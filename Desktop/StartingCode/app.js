require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const md5 = require('md5');
const app = express();
mongoose.set("useUnifiedTopology", true);

const port =3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs')




mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true},()=>{
    console.log('database connected');
});
const userSchema = new mongoose.Schema( {
  email: String,
  password: String,
});


// userSchema.plugin(encrypt, {
//   secret: process.env.SECRET,
//   encryptedFields: ["password"],
// });



const user = new mongoose.model("user", userSchema);


app.get('/',(req,res) =>{

    res.render('home');
})
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});


app.post("/register",(req,res)=>{

const newUser = new user({

email:req.body.username,
password:md5(req.body.password)
});

newUser.save(function(err){
    if(err){
        console.log(err);
    }else{
        res.render('secrets');
    }
});
});

app.post('/login',(req,res)=>{

const username = req.body.username;
const password = md5(req.body.password);

user.find({email:'username'},function(err,foundUser){
    if(err){
        console.log(err);
    }else{
        if(foundUser){
            if(foundUser.password === password){
               // res.write("secrets");
            }
            res.render("secrets");
        }
    }
});

});









//git remote add origin https://github.com/RajRanveer/SecurityandAuthentication.git
//git push -u origin master

app.listen(port,()=>{
    console.log(`Server is up and running at http://localhost:${port}`);
})
