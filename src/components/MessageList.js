import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      addMessage: "",
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

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });
    this.setState({
      username: "",
      content: "",
      sentAt: "",
      roomId: ""
    });
  }

  handleChange(e) {
    this.setState({
      username: "Guest",
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key
    });
  }

  render() {
    return (
      <div className="message-list-container">
        <ol className="message-list">
          {
            this.state.messages.map((message, index) => {
              if (this.props.activeRoom && (message.roomId === this.props.activeRoom.key)) {
              return <li className="message" key={index}>{message.username}: {message.content}  {message.sentAt}</li>;
            } else {
                return null
              }
            })
          }
        </ol>
        <div id="create-message-container">
          <form onSubmit={(e) => this.createMessage(e)}>
            <input type="text" placeholder="Write your message here..." value={this.state.content} onChange={(e) => this.handleChange(e)}></input>
            <input type="submit" value="Send">
            </input>
          </form>
        </div>
      </div>
    );
  }
}

export default MessageList;
