import React, { Component } from 'react';
import style from './VideosList.css';
import { firebaseTeams, firebaseVideos, firebaseLooper, firebaseArticles } from '../../../firebase';
// import axios from 'axios';
// import { URL } from '../../../config';

import Button from '../Button/Button';
import VideosTemplate from './VideosTemplate';

class VideosList extends Component {
  state = {
    teams: [],
    videos: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount
  }

  renderTitle() {
    return this.props.title ? <h3><strong>NBA Videos</strong></h3> : null
  }

  componentWillMount() {
    this.request(this.state.start, this.state.end);
    console.log(this.state.videos);
  }

  request = (start, end) => {
    if(this.state.teams.length < 1) {
      firebaseTeams.once('value')
        .then((snapshot) => {
          const teams = firebaseLooper(snapshot);
          this.setState({
            teams
          })
        })
      // axios.get(`${URL}/teams`)
      //   .then( response => {
      //     this.setState({
      //       teams: [...this.state.teams, ...response.data]
      //     })
      //   })
    }
    firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
      .then((snapshot) => {
        const videos = firebaseLooper(snapshot);
        this.setState({
          videos: [...this.state.videos, ...videos],
          start,
          end
        })
      })
      .catch((err) => {
        console.log(err);
      })
    // axios.get(`${URL}/articles?_start=${start}&_end=${end}`)
    //   .then( response => {
    //     console.log(response.data);
    //     this.setState({
    //       videos: [...this.state.videos, ...response.data],
    //       start,
    //       end
    //     })
    //   })
  }

  loadMore() {
    let end = this.state.end + this.state.amount
    this.request(this.state.end + 1, end);
  }

  renderButton = () => {
    return this.props.loadmore ? 
    <Button type="loadmore" loadmore={() => this.loadMore()} cta="Load More Videos"></Button> :  
    <Button type="linkTo" cta="More Videos" linkTo="/videos/" />
    
  }

  renderVideos = () => {
    let template = null;
      switch(this.props.type){
        case('card'):
          
          template = <VideosTemplate data={this.state.videos} teams={this.state.teams} />
        break;

      default:
        return template
      }
    return template;
  }

  render() {
    return (
      <div className={style.videoList_wrapper}>
          {this.renderTitle()}
          {this.renderVideos()}
          {this.renderButton()}
      </div>
    )
  }
}

export default VideosList;
