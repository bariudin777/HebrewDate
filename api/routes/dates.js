const express = require('express');
const router = express.Router();
const axios = require('axios');

class HebrewDateConverter{

    constructor(date) {
        this.date = date;
        this.day = '';
        this.month = '';
        this.year = '';
    }

    convertDate() {
        const date_list = [String(this.date).split('-')];
        this.day = date_list[0][0];
        this.month = date_list[0][1];
        this.year = date_list[0][2];

    }

}

router.get('/api/:gregDate', (req, res , next) => {
    const model = new HebrewDateConverter(req.params.gregDate);
    model.convertDate();
    const url = `https://www.hebcal.com/converter?cfg=json&gy=${model.year.toString()}&gm=${model.month.toString()}&gd=${model.day.toString()}&g2h=1`;
    axios.get(url).then(
        (response) => {
        res.send("{ "+"hebrew: " + response.data.hebrew +" }");
    },
        (error) => {
            console.log('error:', error);
    });
});
module.exports = router;
