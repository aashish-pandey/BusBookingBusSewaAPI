const axios = require('axios');
const logger = require('../logger/logger');

const getBusSeatsInfo = async function(req, res){
    try{

        const {busId} = req.body;
        console.log(busId)
        const authHeader = 'Basic ' + Buffer.from(`${process.env.BUSSEWA_API_USERNAME}:${process.env.BUSSEWA_API_PASSWORD}`).toString('base64');
       
        let response = await axios.get(`${process.env.BUSSEWA_API_ENDPOINT}webresources/booking/refresh/${busId}`, {
            headers: {
                Authorization: authHeader,
                'Content-Type': 'application/json',
            }});
        response = response.data;
        console.log(response);

        res.status(200).json({data: response});

    }catch(error){
        logger.error(error);
        res.status(500).json({error: 'Something went wrong in the server while getting bus info by id'});
    }
}

module.exports = getBusSeatsInfo;