import React, { Component } from "react";

class MatchesOfTheDay extends Component {
 
  render() {
    const { outcomeMatches, users, poolData } = this.props;
    const now = new Date();
    console.log(users);
    return <div>Hello World</div>;
  }
}

export default MatchesOfTheDay;
