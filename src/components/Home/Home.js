import React, { Component } from 'react';
import NewsSlider from '../widgets/NewsSlider/NewsSlider';
import NewsList from '../widgets/NewsList/NewsList';

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
        start={3}
        amount={3} />
      </div>
    )
  }
}

export default Home;
