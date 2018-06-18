import * as firebase from 'firebase';


  // Initialize Firebase
const config = {
    apiKey: "AIzaSyCc5b_tOpRypMRHDcaVRgs4bJLY8PF3Lxk",
    authDomain: "nba-app-5b502.firebaseapp.com",
    databaseURL: "https://nba-app-5b502.firebaseio.com",
    projectId: "nba-app-5b502",
    storageBucket: "nba-app-5b502.appspot.com",
    messagingSenderId: "609006672057"
  };


firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
  const data = [];
        snapshot.forEach((childSnapshot) => {
          data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
          })
        });
        return data;
}

export {
  firebase,
  firebaseDB,
  firebaseArticles,
  firebaseTeams,
  firebaseVideos,
  firebaseLooper
}