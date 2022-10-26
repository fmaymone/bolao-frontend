import React, { Component } from "react";
import Match from "./Match";

class MatchList extends Component {


  render() {


    const {
      matches,
      stage
    } = this.props;

    return (

      <div>
        {matches.map(match => (
          <div key={match.name}>
            <Match game={match} user={this.props.user} pool={this.props.pool} chooseDrawWinnerHandler={this.props.chooseDrawWinnerHandler}
              isAdmin={this.props.isAdmin} handleChangedResult={this.props.handleChangedResult} finishedTimeToBet={this.props.finishedTimeToBet} />
          </div>
        ))}
      </div>


    );
  }
}

export default MatchList;


