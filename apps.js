const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/file.html");
});

app.post("/", function(req, res){
  const query = req.body.Pincode;
  const url ="https://api.postalpincode.in/pincode/"+query;

  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const PincodeData = JSON.parse(data);

      const District = PincodeData[0].PostOffice[0].District;
      const Region = PincodeData[0].PostOffice[0].Region;
      const State = PincodeData[0].PostOffice[0].State;
      res.write("<h1> The place lies in district "+District+" </h1>");
      res.write("<h2> Region "+ Region +" </h2>");
      res.write("<h2> State "+ State +" </h2>");
      res.write(" <footer>  Developed By Shubham. Special Thanks to Bhavya Chaudhary  </footer>");
      res.send();
    });
  });
});
app.listen(3000, function(){
  console.log("System started on port 3000.");
});
