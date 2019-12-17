import React from 'react';
import s from './Select.module.css'

const SelectOption = (content)=>
  <option {...content}>{content.children}</option>

const Select = (props)=>
  <div className={s.Select}>
    <svg className={s.Icon} stroke="currentColor" fill="currentColor" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>
    <select className={s.Select_input} onChange={props.onChange} {...props}>
      {props.children}
    </select>
  </div>



Select.option = SelectOption;

export default Select
