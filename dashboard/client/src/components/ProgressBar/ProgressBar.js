import React from 'react';
import s from './ProgressBar.module.css'

const percent = (total,percent) => ((percent * 100) / total)

const ProgressBar = (props)=>
  <div>
    <div>
      <div>{props.startBar}</div>
      <div>{props.endBar}</div>
    </div>
    <div className={s.Bar}>
      <div className={s.BarFilled} style={{width:`${percent(props.totalAmount,props.currentAmount)}%`}}></div>
    </div>
  </div>


export default ProgressBar
