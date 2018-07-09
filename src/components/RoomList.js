import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      addRoom: ''
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

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({
      name: this.state.addRoom
    });
    this.setState({addRoom: ''})
  }

  handleChange(e) {
    this.setState({addRoom: e.target.value});
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
          <form onSubmit={(e) => this.createRoom(e)}>
            <input type="text" placeholder="New Room Name" onChange={(e) => this.handleChange(e)}></input>
            <input type="submit" value="Add New Room">
            </input>
          </form>
        </section>
      </section>
    );
  }
}

export default RoomList;
