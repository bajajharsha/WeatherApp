const express = require("express");
const res = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({ extended: "true" }));

// make get request to external server
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    const query = req.body.cityName;
    const apiKey = "8e83e2a4ba25ba48542ce2de6a0a5d14#";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units" + unit;
    https.get(url, function (response) {
        // console.log(response.statusCode)    // status code = indicates whether request has been successfully completed
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);   // converting data into js object (bc its coming in hexadec)
            // const object = {
            //     name: "Harsha",
            //     age: 21
            // }
            // console.log(JSON.stringify(object));
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl = " https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The tempertature in " + query + " is " + temp + " deg celcius</h1>")
            res.write("<h2>Today is a " + weatherDescription + "</h2>")
            res.write("<img src = " + imgUrl + ">")
            res.send()
        })
    })
})

// // res.send("server is up and running")




app.listen(3000, function () {
    console.log("server");
})