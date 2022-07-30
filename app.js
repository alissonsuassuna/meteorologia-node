const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.post('/', function(req, res) {
    console.log(req.body.cityName)

    const query = req.body.cityName;
    const apiKey = '05afbe524ff797c61bca371af584eef9'
    const units = 'metric'
    
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + units;
    
    https.get(url, function(response) {
        console.log(response.statusCode)
    
        response.on('data', function(data){
            
            const tempoData = JSON.parse(data)
    
            const temperatura = tempoData.main.temp
            const descricao = tempoData.weather[0].description
            const icon = tempoData.weather[0].icon
    
            const imgURL = 'https://openweathermap.org/img/wn/' + icon + '.png'
    
            res.write('<h1>A temperatura em ' + query + ' é: ' + temperatura + 'Celcius.</h1>')
            res.write('<p>O tempo está assim: ' + descricao + 'Celcius.</p>')
    
            res.write('<img src=' + imgURL + ' />')
    
            res.send()
    
        })
    })

})


   


app.listen(3000, () => {
    console.log('O servidor está rodando na porta 3000!');
})