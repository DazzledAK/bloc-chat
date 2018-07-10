import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: {
    username: "",
    content: "",
    sentAt: "",
    roomId: ""
}
  };
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
      <div className="message-list-container">
        <ol className="message-list">
          {
            this.state.messages.map((message, index) => {
              if (this.props.activeRoom && (message.roomId === this.props.activeRoom.key)) {
              return <li className="message" key={index}>{message.username}: {message.content} - {message.sentAt}</li>;
            } else {
                return null
              }
            })
          }
        </ol>
      </div>
    );
  }
}

export default MessageList;
