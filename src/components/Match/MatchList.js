import React, { Component, Fragment } from "react";
import Match from "./Match";

class MatchList extends Component {
  render() {
    const { matches, stage } = this.props;

    return (
      <table style={{ borderCollapse: "collapse", borderSpacing: "4px" }}>
        <tbody>
          {matches.map((match) => (
            <Fragment key={match.name}>
              <Match
                game={match}
                user={this.props.user}
                pool={this.props.pool}
                chooseDrawWinnerHandler={this.props.chooseDrawWinnerHandler}
                isAdmin={this.props.isAdmin}
                handleChangedResult={this.props.handleChangedResult}
                finishedTimeToBet={this.props.finishedTimeToBet}
              />
            </Fragment>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MatchList;
