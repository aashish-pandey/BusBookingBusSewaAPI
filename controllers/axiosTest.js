const axios = require('axios');
const logger = require('../logger/logger')


const axiosTest = async function(req, res){
    try{

        const result = await axios.get('https://backend.merobus.xyz/');
        res.status(200).json({data: result.data});

    }catch(error){
        logger.error(error);
        res.status(500).json({error:error})
    }
}

module.exports = axiosTest