const axios = require('axios');
const logger = require('../logger/logger');


const cancelHoldTicket = async function(req, res){
    try{

       const postData = {
        ...req.body
       }

       const authHeader = 'Basic ' + Buffer.from(`${process.env.BUSSEWA_API_USERNAME}:${process.env.BUSSEWA_API_PASSWORD}`).toString('base64'); 

       let response = await axios.post(`${process.env.BUSSEWA_API_ENDPOINT}webresources/booking/cancel`,postData, {
        headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
        }


    })


    logger.log("CANCEL API HITTED RESPONSE", response);

    res.status(200).json({msg: "ALL okay while releasing the seat"});


    }catch(error){
        logger.error(error);
        res.status(500).json({error: "something went wrong in the server while cancelling the hold ticket"})
    }
}

module.exports = cancelHoldTicket;