const express = require('express');
const {json, urlencoded} = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');





const getTripInfo = require('./controllers/getTripInfo');
const axiosTest = require('./controllers/axiosTest');
const getBusSeatsInfo = require('./controllers/getBusSeatsInfo');
const makeTicket = require('./controllers/makeTicket');
const cancelHoldTicket = require('./controllers/cancelHoldTicket');




const app = express();
dotenv.config();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors())




app.get('/', (req, res)=>{
    console.log("hitted")
    res.send('<h1>Welcome to the hitting server mate</h1>');
})

app.post('/', (req, res)=>{
    console.log("hitted")
    res.send('<h1>Welcome to the hitting server mate</h1>');
})
app.post('/gettripInfo', getTripInfo);
app.post('/getBusSeatsInfo', getBusSeatsInfo);
app.post('/makeTicket', makeTicket);
app.post('/cancelHoldTicket', cancelHoldTicket)







app.get('/test', axiosTest);




const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("yes aashish", port)
})