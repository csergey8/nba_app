import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Layout from './hoc/Layout/Layout';
import NewsArticles from './components/Articles/News/Post/index';
import VideoArticle from './components/Articles/Videos/Video/index';
import NewsMain from './components/Articles/News/Main/index';
import VideosMain from './components/Articles/Videos/VideosMain/VideosMain';
import Signin from './components/Signin/Signin';


const Routes = (props) => {
  console.log(props.user);
    return (
    <Layout user={props.user}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/articles/:id" exact component={NewsArticles} />
        <Route path="/videos/:id" exact component={VideoArticle} />
        <Route path="/news" exact component={NewsMain} />
        <Route path="/videos" exact component={VideosMain} />
        <Route path="/sign-in" exact component={Signin} />
      </Switch>
    </Layout>
    )
}

export default Routes;
