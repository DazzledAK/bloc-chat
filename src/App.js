import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBmEDSMsc5carCpW8PO2-ySHa9gnzI4R6I",
    authDomain: "bloc-chat-243e9.firebaseapp.com",
    databaseURL: "https://bloc-chat-243e9.firebaseio.com",
    projectId: "bloc-chat-243e9",
    storageBucket: "bloc-chat-243e9.appspot.com",
    messagingSenderId: "208471275049"
  };
  firebase.initializeApp(config);

class App extends Component {
  render(
    roomList = (
          <RoomList
            firebase={firebase} />
      )
   )
{
    return (
      <div className="App">
        <div className="room-list-container">{roomList}</div>
      </div>
    );
  }
}

export default App;
