import React from 'react'
import style from '../Articles.css';

const TeamInfo = (props) => {
  console.log(props);
  const renderStats = () => {
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