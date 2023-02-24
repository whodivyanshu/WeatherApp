const express = require("express");

const https = require("https");

const app = express();

app.get("/", function(req,res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=2d32724f40de70e5a16f4164596cb191&units=metric"

    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            // console.log(weatherData);
            const temperature  = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon +  "@2x.png";
            res.write("The temperature of London is " + temperature + "degree Celcius.");
            res.write('<img src="' + imageURL + '" alt="img failed">');
                        res.end();
        })


    })
})


app.listen(3000, function(){
    console.log("server started at port 3000");
})