import React, { Component } from 'react';
import NewsSlider from '../widgets/NewsSlider/NewsSlider';

class Home extends Component {
  render() {
    return (
      <div>
        <NewsSlider
          type="featured"
          start={0}
          amount={5}
          settings={{
            dots: true
          }}
        />
      </div>
    )
  }
}

export default Home;
