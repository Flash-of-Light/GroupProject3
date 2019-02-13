import React, { Component } from 'react';

class User extends Component {
  state = {
    currentUserName: '',
    currentUserEmail: ''
  };

  componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    this.setState({
      currentUserEmail: idToken.idToken.claims.email,
      currentUserName: idToken.idToken.claims.name
    });
  }

  render() {
    const { currentUserName } = this.state;

    return (
      <div>
        <h1>Welcome {currentUserName}</h1>
      </div>
    );
  }
}

export default User;