import React, { Component } from 'react'
import axios from 'axios';
import { URL } from '../../../../config';
import HeaderArticle from './HeaderArticle';


import style from '../../Articles.css';

class NewsArticles extends Component {

  state = {
    article: [],
    team: []
  }

  
  componentWillMount() {
    axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
      .then( response => {
        this.setState({
          article: response.data[0]
        })
        axios.get(`${URL}/teams?id=${response.data[0].team}`)
          .then( response => {
            this.setState({
              team: response.data[0]
            })
          })
      })
  }

  render() {
    const article = this.state.article;
    const team = this.state.team;
    return (
      <div className={style.article_wapper}>
        <HeaderArticle
        teamData={team}
        date={article.date}
        author={article.author}
        />
        <div className={style.articleBody}>
          <h1>{article.title}</h1>
          <div 
          className={style.artilceImg}
          style={{
            background: `url('/images/articles/${article.image}')`
          }}
          >
          </div>
          <div className={style.articleText}>
            {article.body}
          </div>
        </div>
      </div>
    )
  }
}

export default NewsArticles;


      
        