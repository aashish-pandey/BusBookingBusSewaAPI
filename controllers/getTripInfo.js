const axios = require('axios');
const logger = require('../logger/logger')

const getTripInfo = async function(req, res){
    try{
        console.log(req.body)
        const postData = {
            ...req.body,
            shift: 'day'
        }


        const authHeader = 'Basic ' + Buffer.from(`${process.env.BUSSEWA_API_USERNAME}:${process.env.BUSSEWA_API_PASSWORD}`).toString('base64');
        // res.send(`${process.env.BUSSEWA_API_ENDPOINT}webresources/booking/trips`)
        let response = await axios.post(`${process.env.BUSSEWA_API_ENDPOINT}webresources/booking/trips`,postData, {
            headers: {
                Authorization: authHeader,
                'Content-Type': 'application/json',
            }
        })
        response = response.data;
        if(response.status == 1){
            response = response.trips;
            let filteredResult = []
            response.forEach(dt=>{
                console.log(dt)
                let newData = {
                    id: dt.id, 
                    operator: dt.operator,
                    busType: dt.busType,
                    origin: postData.from, 
                    destination: postData.to,
                    departureTime: dt.departureTime,
                    journeyHour: dt.journeyHour,
                    ticketPrice: dt.ticketPrice,
                    availableSeats: 0,
                    totalSeats: 0,
                }

                let avSeats = 0;
                let ttSeats = 0;
                
                dt.seatLayout.forEach(data=>{
                    if(data.bookingStatus == 'na'){
                        return;
                    }

                    ttSeats += 1;

                    if(data.bookingStatus == 'No')avSeats += 1;
                })

                newData.availableSeats = avSeats;
                newData.totalSeats = ttSeats;

                filteredResult.push(newData)
            })
            console.log("if")
            res.status(200).json(filteredResult)

        }else{
            console.log("else")
            console.log(response)
            res.status(500).json({error: "something went horribly wrong in the bussewa api fetching"})
        }


    }catch (error){
        logger.error(error)
        res.status(500).json({error: 'Something went wrong while getting trip data in mero bus server'})
    }
}

module.exports = getTripInfo