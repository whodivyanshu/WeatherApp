const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
})

app.post("/", function(req,res){
    // console.log(req.body.cityName);
    const query = req.body.cityName;
        const apiKey = "2d32724f40de70e5a16f4164596cb191";
    
        const url = "https://api.openweathermap.org/data/2.5/weather?appid="+ apiKey + "&q=" + query +"&units=Metric";
        https.get(url,function(response){
                console.log(response.statusCode);
                response.on("data", function(data){
                        const weatherData = JSON.parse(data);
                        const temperature = weatherData.main.temp;
                        const weatherIcon = weatherData.weather[0].icon;
                        const weatherDis = weatherData.weather[0].description;
                        const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png;"
                        res.write("<h1>the temperature of " + query + " is  " + temperature +"</h1>");
            res.write("<p>the description of "+ query + " is  " + weatherDis + "</p>");

            res.write("<img src =" + imageURL + " alt=`image error`>");
            res.send();

        })
    } )



})

app.listen(3000, function(req,res){
    console.log("server started at port 3000");
})
