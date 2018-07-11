import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
  constructor(props) {
    super(props)

    this.state = {
      activeRoom: "",
      user: ""
    };
  }

  setActiveRoom(room) {
    this.setState({activeRoom: room});
  }

  setUser(user) {
    this.setState({user: user})
  }

  render() {
    return (
      <div className="App">
        <User
          firebase={firebase}
          user = {this.state.user}
          setUser = {(user) => this.setUser(user)}
        />
        <RoomList
          firebase={firebase}
          setActiveRoom = {this.setActiveRoom.bind(this)}
          activeRoom = {this.state.activeRoom}
        />
        <MessageList
          firebase={firebase}
          activeRoom = {this.state.activeRoom}
          user = {this.props.user}
        />
      </div>
    );
  }
}

export default App;
