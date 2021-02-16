const express = require('express');
const router = express.Router();
const axios = require('axios');
const { response } = require('express');



function parseDate(date) {
    tokens = [String(date).split('/')];
    const day = tokens[0][0];
    const month = tokens[0][1];
    const year = tokens[0][2];
    const res = { day: day, month: month, year: year };
    return res
}

//date route
router.get('/api', (req, res, next) => {
    const date_token = parseDate(req.query.gregDate);
    const url = `https://www.hebcal.com/converter?cfg=json&gy=${date_token['year']}&gm=${date_token['month']}&gd=${date_token['day']}&g2h=1`;
    axios.get(url).
    then((response) => {
        res.json({
            hebrew:response.data.hebrew
        })
    }).
    catch((error) => {
        console.log('error:', error);
    });
});


/*
I added default routes just in case
*/

router.get('/', (req, res, next) => {
    res.status(400).json({
        message: "Please Enter correct url: https://dateconverterbariudin.herokuapp.com/api/{here you enter the date} "
    });
});
module.exports = router;
