import React, { useState, useEffect } from "react";
import './styles/rules.css';
import './styles/reset.css';
import {Card,Select,SwitchDate,ProgressBar,StatusTag} from './components'
import {DashboardLayout} from './layouts'

const formatCurrency = (amount)=> '$'+ amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
const kFormatter = (num) => Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)

const App = ()=> {

  const [filterServiceId, setFilterServiceId] = useState('all');
  const [filterServiceDate, setFilterServiceDate] = useState('16/12/2019')
  const [services, setServices] = useState([]);
  const [campaings, setCampaings] = useState([]);

  async function fetchCampaigns() {
    const res = await fetch('/campaigns');
    res.json()
      .then(res => setCampaings(res))
      .catch(err => console.log('error'));
  }

  
  
  useEffect(() => {
    const fetchServices = async () =>{
      const paramsString = new URLSearchParams({campaignid:filterServiceId,date:filterServiceDate}).toString()
      const res = await fetch('/services?' + paramsString);
      res.json()
        .then(res => setServices(res))
        .catch(err => console.log('error'));
    }

    fetchCampaigns();
    fetchServices();
  },[filterServiceId,filterServiceDate]);
  
  return (
    <DashboardLayout>
      <DashboardLayout.header>
        <div className='gallery-1 gallery-2@md'>
          <div className='flex justify-center justify-start@md'>
            <Select onChange={(e)=> setFilterServiceId(e.target.value)}>
              <Select.option value='all'>All campaings</Select.option>
              {
                campaings.map((item)=>
                  <Select.option key={item.Id} value={item.Id}>{item.Name}</Select.option>
                )
              }
            </Select>
          </div>
          <div className='flex justify-center justify-end@md'>
            <SwitchDate onChange={(day)=>setFilterServiceDate(day)}/>
          </div>
        </div>
      </DashboardLayout.header>
      <DashboardLayout.main>
        <div className='gallery-1 gallery-2@md gallery-3@lg'>
          {
            services.map((item)=>
              <Card key={item.Id}>
                <Card.Title>{item.Title}</Card.Title>
                <Card.Content>
                  <div className='columns mb-1 items-center'>
                    <p className='fw-1'>{formatCurrency(item.TotalSuscriptions)} / month</p>
                    <div className='right'>
                      <StatusTag status={item.Status}/>
                    </div>
                  </div>
                  <ProgressBar currentAmount={item.TotalSuscriptions} totalAmount={item.TotalVacancies}/>
                </Card.Content>
                <Card.Footer>
                  { item.Status === 'Rejected' ?
                    <p className='center c-red-0'>Card is on hold</p>
                    :
                    <div className='columns'>
                      <p className='flex items-center justify-start'><svg stroke="currentColor" fill="currentColor" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M608 64H32C14.33 64 0 78.33 0 96v320c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V96c0-17.67-14.33-32-32-32zM48 400v-64c35.35 0 64 28.65 64 64H48zm0-224v-64h64c0 35.35-28.65 64-64 64zm272 176c-44.19 0-80-42.99-80-96 0-53.02 35.82-96 80-96s80 42.98 80 96c0 53.03-35.83 96-80 96zm272 48h-64c0-35.35 28.65-64 64-64v64zm0-224c-35.35 0-64-28.65-64-64h64v64z"></path></svg> <span className='ml-2'>{formatCurrency(item.TotalEarned)}</span></p>
                      <p className='pl-2 pl-0@md flex items-center justify-center'><svg stroke="currentColor" fill="currentColor" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg> <span className='ml-2'>{item.TotalSuscriptions}</span></p>
                      <p className='flex items-end justify-end'><svg stroke="currentColor" fill="currentColor" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"></path></svg> <span className='ml-2'>{kFormatter(item.TotalViews)}</span></p>
                    </div>
                  }
                </Card.Footer>
              </Card>
            )
          }
        </div>
      </DashboardLayout.main>
    </DashboardLayout>
  );
}

export default App;
