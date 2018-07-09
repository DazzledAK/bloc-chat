import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  createRoom(rooms) {
    this.roomsRef.push({
      name: rooms
    });
  }

  render() {
    return (
      <section className="roomlist">
        {
          this.state.rooms.map( (room, index) =>
            <div className="rooms" key={index}>{room.name}</div>
          )
        }
        <section id="create-room-container">
          <form onSubmit={(rooms) => this.createRoom(rooms)}>
            <input type="text" placeholder="New Room Name"></input>
            <input type="submit" value="Submit">
            </input>
          </form>
        </section>
      </section>
    );
  }
}

export default RoomList;
