const express = require('express');
const router = express.Router();
var request = require('request');

class HebDate{

    constructor(date) {
        this.date = date;
        this.day = '';
        this.month = '';
        this.year = '';
    }

    convertDate() {
        var date_list = [String(this.date).split('-')];
        this.day = date_list[0][0];
        this.month = date_list[0][1];
        this.year = date_list[0][2];

    }
}

router.get('/:gregDates', (req, res , next) => {
    var model = new HebDate(req.params.gregDates);
    model.convertDate();
    request("https://www.hebcal.com/converter?cfg=json&gy=" + model.year.toString() + "&gm=" + model.month.toString() +
        "&gd="+model.day.toString() + "&g2h=1" ,function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        // var str = JSON.parse(response.body);
        // res.send('hebrew: '+str["hebrew"]);
            var str = JSON.parse(response.body);
            res.send(JSON.stringify("{ "+"hebrew: " + str["hebrew"]+" }"));
    });

});
module.exports = router;
