import React from 'react'
import { Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Layout from './hoc/Layout/Layout';
import NewsArticles from './components/Articles/News/Post/index';
import VideoArticle from './components/Articles/Videos/Video/index';
import NewsMain from './components/Articles/News/Main/index';
import VideosMain from './components/Articles/Videos/VideosMain/VideosMain';
import Signin from './components/Signin/Signin';
import Dashboard from './components/Dashboard/Dashboard';
import PrivatRoutes from './components/AuthRoutes/privatRoutes';
import PublicRoutes from './components/AuthRoutes/publicRoutes';


const Routes = (props) => {
    return (
    <Layout user={props.user}>
      <Switch>
        <PublicRoutes {...props} restricted={false} path="/" exact component={Home} />
        <PublicRoutes {...props} restricted={false} path="/articles/:id" exact component={NewsArticles} />
        <PublicRoutes {...props} restricted={false} path="/videos/:id" exact component={VideoArticle} />
        <PublicRoutes {...props} restricted={false} path="/news" exact component={NewsMain} />
        <PublicRoutes {...props} restricted={false} path="/videos" exact component={VideosMain} />
        <PublicRoutes {...props} restricted={true} path="/sign-in" exact component={Signin} />
        <PrivatRoutes {...props} path="/dashboard" exact component={Dashboard} />
      </Switch>
    </Layout>
    )
}

export default Routes;
