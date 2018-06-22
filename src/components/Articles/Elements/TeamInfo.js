import React from 'react'
import style from '../Articles.css';

const TeamInfo = (props) => {
  const renderStats = () => {
    console.log(props.team)
    if(props.team.stats) {
      return (
        <strong>
          W{props.team.stats[0].wins}-L{props.team.stats[0].defeats}
        </strong>
      );
    } else {
      return null
    }
   
  }
  return (
    <div className={style.articleTeamHeader}>
        <div 
        className={style.left}
        style={{
            background: `url(/images/teams/${props.team.logo})`
        }}
        >

        </div>
        <div className={style.right}>
            <div>
                <span>{props.team.name} {props.team.city}</span>
            </div>
            <div>
                {renderStats()}
            </div>
        </div>
      
    </div>
  )
}

export default TeamInfo;
