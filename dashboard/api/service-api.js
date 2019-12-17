const express = require('express');
const router = express.Router();
const services = require('./service-db');

const uniqBy = (arr, predicate) => {
  const cb = typeof predicate === 'function' ? predicate : (o) => o[predicate];
  
  return [...arr.reduce((map, item) => {
    const key = (item === null || item === undefined) ? 
      item : cb(item);
    
    map.has(key) || map.set(key, item);
    
    return map;
  }, new Map()).values()];
};

router.get('/', (req, res) => {
  response = [];


  if(typeof req.query.campaignid != 'undefined'){
    if(req.query.campaignid === 'all'){
      response = [...services]
    }
    else{
      services.filter(function(item){
        if(item.CampaignId.toString() == req.query.campaignid){
          response.push(item);
        }
      })
    }
  }

  if(typeof req.query.date != 'undefined'){

    const dateFiltered = [...response].filter(function(item){
      if(item.ReleaseDate.toString() == req.query.date){
        return item
      }
    })
    response = dateFiltered;
  }

  response = uniqBy(response,'Id');

  if(Object.keys(req.query).length === 0){
    return res.send(services);
  }

  res.json(response);

});


router.get('/:campaignid', (req, res) => {
  const campaign = req.params.campaignid;
  let filteredCampaigns = [];

  if(campaign === 'all'){
    return res.json(services)
  }
  else{
    for (let service of services) {
      if (service.CampaignId === campaign) {
        filteredCampaigns = [...filteredCampaigns,service]
      }
      
    }
    return res.json(filteredCampaigns);
  }
});

//make it available to be used in index.js
module.exports = router;

