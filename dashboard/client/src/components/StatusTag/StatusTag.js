import React from 'react';
import s from './StatusTag.module.css'

const statusColor = (status) =>{
  if(status==='Live') return 'green'
  else if(status==='Saved') return 'yellow'
  else if(status==='Rejected') return 'red'
}

const StatusTag = (props)=>
  <div className={s.container}>
    <div className={`${s['tagCircle-is'+ statusColor(props.status)]} ${s.tagCircle}`}></div>
    <p>{props.status}</p>
  </div>


StatusTag.defaultProps = {
  status: 'Live'
};

export default StatusTag
