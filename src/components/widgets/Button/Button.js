import React from 'react';
import { Link } from 'react-router-dom';

import style from './Button.css';

const Button = (props) => {
    let template = null;

    switch(props.type){
        case('loadmore'):
            template = (
                <div 
                className={style.blue_btn}
                onClick={props.loadmore}>
                    {props.cta}
                </div>
            );
            break;
        case('linkTo'):
            template = (
                <Link
                className={style.blue_btn} 
                to={props.linkTo} >
                    {props.cta}
                </Link>
            );
            break;
        default:
            template = null;
    }
        return template;


  return (
    <div>
      button
    </div>
  )
}

export default Button;
