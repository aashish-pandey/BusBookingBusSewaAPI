const axios = require('axios');
const logger =  require('../logger/logger');

const makeTicket = async function(req, res){
    try{

        const postData = {
            ...req.body
        }

        const authHeader = 'Basic ' + Buffer.from(`${process.env.BUSSEWA_API_USERNAME}:${process.env.BUSSEWA_API_PASSWORD}`).toString('base64');
    
        let response = await axios.post(`${process.env.BUSSEWA_API_ENDPOINT}webresources/booking/book`,postData, {
            headers: {
                Authorization: authHeader,
                'Content-Type': 'application/json',
            }
        })

        response = response.data;
        console.log(response);
        res.status(200).json(response);


    }catch(error){
        logger.error(error);
        res.status(500).json({error: "Something went wrong while making ticket"})
    }
}

module.exports = makeTicket