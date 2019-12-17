const express = require('express');
const path = require('path');

const app = express();


app.use(express.static(path.join(__dirname, 'client/build')));

const routerServices =require('./api/service-api');
const routerCampaign =require('./api/campaign-api');

app.use('/services', routerServices);
app.use('/campaigns', routerCampaign);

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);