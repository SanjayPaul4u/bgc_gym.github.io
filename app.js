const express =require ("express");
const app = express();
const path = require("path");
const mongoose =require("mongoose");
const bodyparser = require("body-parser");

//mongoose 
mongoose.connect('mongodb://localhost/sanjay', {useNewUrlParser: true, useUnifiedTopology: true});

const port =5000;
// const port = process.env.PORT || 5000;

//define mongoose scema
const contactSchema = new mongoose.Schema({
         name:String,
         email:String,
         phone:String,
         address:String,
         query:String
});

const contact = mongoose.model('kitten', contactSchema)

//express specific stuf
app.use("/static", express.static("static"));
app.use(express.urlencoded());

//pug specific stuf
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//end point 
app.get("/",(req, res)=>{
    const params ={}
    res.status(200).render("home.pug", params);
})
app.get("/about",(req, res)=>{
    const params ={}
    res.status(200).render("about.pug", params);
})
app.get("/service",(req, res)=>{
    const params ={}
    res.status(200).render("service.pug", params);
})
app.get("/reviews",(req, res)=>{
    const params ={}
    res.status(200).render("review.pug", params);
})
app.get("/contact",(req, res)=>{
    const params ={}
    res.status(200).render("contact.pug", params);
});
//------
app.post("/contact", (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
            res.send("This item has been saved to the database")
    }).catch(()=>{
            res.status(400).send("Item was not saved to the database")
    });
    
    //res.status(200).render("contact.pug");
})

//start the server
app.listen(port,()=>{
    console.log(`The server successfully run at port ${port} `);
  });