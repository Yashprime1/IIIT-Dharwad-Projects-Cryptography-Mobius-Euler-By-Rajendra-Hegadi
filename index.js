const express = require('express');
const bodyParser = require('body-parser');
var urlencodedParser = (bodyParser.urlencoded({ extended: false }))
const PORT = process.env.PORT || '8080';
const app = new express();


app.set('port',PORT);
app.use(express.static('assets'));

app.set('view engine', 'ejs');

app.listen(PORT)

var Algorithmia = require("algorithmia");


app.get('/', function (req, res) {
    res.render('index');
});


app.post('/', urlencodedParser, function (req, res) {
    console.log(req.body);
    if (req.body["input_function"] == "" || req.body["input_number"] == "") {
        res.render('result', {
            reply: "Do not leaves any field empty",
            color: 2
        })
    } else {
        var function_number = parseInt(req.body['input_function'])
        var input_value = parseInt(req.body['input_number'])
        if (input_value <= 0 && function_number === 1) {
            res.render('result', {
                reply: "For Euler Totient You can't enter values which are negative or equal to 0",
                color: 3
            })
        }
        else if (input_value <= 0 && function_number === 0) {
            res.render('result', {
                reply: "For Mobius function the values should be positve integer ",
                color: 3
            })
        }
        else {
            var input = [function_number, input_value];
            Algorithmia.client("")
                .algo("")
                .pipe(input)
                .then(function (response) {
                    console.log(response.get());
                    res.render('result', {
                        reply: response.get(),
                        color: 1
                    })
                });

        }
    }
});



app.use((req, res, next) => {
    res.render('404')
});