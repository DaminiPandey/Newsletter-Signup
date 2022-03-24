const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https=require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})
app.post("/", function(req,res){
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    console.log(firstName,lastName,email);
    const data={
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }     
            }
        ]
    };
    app.post("/failure",function(req,res){
        res.redirect("/");
    })
    const jsonData=JSON.stringify(data);
    const url="https://us6.api.mailchimp.com/3.0/lists/(List-Id)";
    const options = {
        method:"POST",
        auth:"(mailChimp-API-key)"
    }
    
const request = https.request(url, options, function(response) {
    if(response.statusCode===200){
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname+ "/failure.html")
    }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.listen(3000,function(){
    console.log("App is running on port 3000");
});


