import React, { Component } from 'react';
// import axios from 'axios';
// import { URL } from '../../../../config';
import { firebaseDB, firebaseTeams, firebaseLooper, firebaseVideos } from '../../../../firebase';
import HeaderVideo from './HeaderVideo';
import VideosRelated from './VideosRealted/VideosRelated';

import style from '../../Articles.css';

class VideoArticle extends Component {
  state = {
    video: [],
    team: [],
    teams: [],
    related: []
  }

  componentWillMount() {
    firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
      .then((snapshot) => {
        let video = snapshot.val();

        firebaseTeams.orderByChild('teamId').equalTo(video.team).once('value')
          .then((snapshot) => {
            const team = firebaseLooper(snapshot)
            this.setState({
              video,
              team
            });
            this.getRelated();
          })
      })

    // axios.get(`${URL}/videos?id=${this.props.match.params.id}`)
    //   .then( response => {
    //     let video = response.data[0];

    //     axios.get(`${URL}/teams?id=${video.team}`)
    //       .then( response => {
    //         this.setState({
    //           video,
    //           team: response.data[0] 
    //         })
    //         this.getRelated();
    //       })
    //   })
  }

  getRelated = () => {
    firebaseTeams.once('value')
      .then((snapshot) => {
        const teams = firebaseLooper(snapshot);

        firebaseVideos.orderByChild('team').equalTo(this.state.video.team).limitToFirst(3).once('value')
          .then((snapshot) => {
            const related = firebaseLooper(snapshot);
            this.setState({
              teams,
              related
            })
          })

      });

    // axios.get(`${URL}/teams`)
    //   .then( response => {
    //     let teams = response.data;

    //     axios.get(`${URL}/videos?q=${this.state.team.city}&_limit=3}`)
    //       .then(response => {
    //         console.log(response);
    //         this.setState({
    //           teams,
    //           related: response.data
    //         })
    //       })
    //   })
  }


  render() {
    const video = this.state.video;
    const team = this.state.team;
    console.log(this.state);
    return (
      <div>
        <HeaderVideo teamData={team[0]} />
        <div className={style.video_wrapper}>
          <h1>{video.title}</h1>
          <iframe
          title="videoplayer"
          width="100%"
          height="300px"
          src={`https://www.youtube.com/embed/${video.url}`}
          >
          </iframe>
        </div>
        <VideosRelated
        data={this.state.related}
        teams={this.state.teams}
        />
      </div>
    )
  }
}

export default VideoArticle;
