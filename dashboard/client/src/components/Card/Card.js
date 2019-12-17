import React from 'react';
import s from './Card.module.css'

const CardTitle = (title)=>
  <p className={s.title}>{title.children}</p>

const CardFooter =  (content)=>
  <div className={s.footer}>{content.children}</div>

const CardContent =  (content)=>
  <div className={s.content}>{content.children}</div>

const Card = (content)=>
  <div className={s.Card}>
    {content.children}
  </div>

Card.Title = CardTitle;
Card.Footer = CardFooter;
Card.Content = CardContent;


export default Card
