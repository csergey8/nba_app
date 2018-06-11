import React, { Component } from 'react';
import SliderTemplates from './SliderTemplates';
import axios from 'axios';

class NewsSlider extends Component {

  state = {
      news: []
  }

  componentWillMount() {
    axios.get(`http://localhost:3004/articles?_start=${this.props.start}&_end=${this.props.amount}`)
        .then( response => {
            this.setState({
                news: response.data
            })
        })
  }


  render() {
    return (
      <SliderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings} />
    )
  }
}

export default NewsSlider;
