import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: {
    username: "",
    content: "",
    sentAt: "firebase.database.ServerValue.TIMESTAMP",
    roomId: ""
}
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  render() {
    return (
      <div className="messagelist-container">
        <ol>
          {
            this.state.messages.filter(message => message.roomId === this.props.activeRoom.Id).map((message, index) => <li key={index}>{message.username}: {message.content} - {message.sentAt}</li>)
          }
        </ol>
      </div>
    );
  }
}

export default MessageList;
