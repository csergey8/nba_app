import React, { Component } from 'react';
import NewsSlider from '../widgets/NewsSlider/NewsSlider';
import NewsList from '../widgets/NewsList/NewsList';
import VideosList from '../widgets/VideosList/VideosList';

class Home extends Component {
  render() {
    return (
      <div>
        <NewsSlider
          type="featured"
          start={0}
          amount={5}
          settings={{
            dots: false
          }}
        />
        <NewsList
        type="card"
        loadmode={true}
        start={0}
        amount={3} />
        <VideosList
        type="card"
        title={true}
        loadmore={true}
        start={0}
        amount={3}
        />
      </div>
        
    )
  }
}

export default Home;
