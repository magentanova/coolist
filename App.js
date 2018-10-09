
import firebase from 'firebase';
import { createSwitchNavigator } from 'react-navigation';

import ListPage from './app/components/pages/ListPage';
import LoadingPage from './app/components/pages/LoadingPage';
import SignUpPage from './app/components/pages/SignUpPage';
import LogInPage from './app/components/pages/LogInPage';

// initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyDMSrsl67Hos3FbpJyxk5FcVx2q35w2AWE",
  authDomain: "coolist-8713d.firebaseapp.com",
  databaseURL: "https://coolist-8713d.firebaseio.com",
  projectId: "coolist-8713d",
  storageBucket: "coolist-8713d.appspot.com",
  messagingSenderId: "913149485154"
};

firebase.initializeApp(firebaseConfig);

// set up routing
const App = createSwitchNavigator(
  {
    ListPage,
    LoadingPage,
    LogInPage,
    SignUpPage
  },
  {
    initialRouteName: "LoadingPage"
  }
);

export default App;
