import React, { Component } from "react";
import Team from "./Team";
import TextField from "material-ui/TextField";
import Toggle from "material-ui/Toggle";

const styles = {
  container: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "aquamarine1"
  },
  team_home: {
    justifyContent: "flex-start",
    display: "flex",
    flexFlow: "row nowrap",
    backgroundColor: "aquamarine1"
  },
  inputs: {
    justifyContent: "center",
    display: "flex",
    flexFlow: "row nowrap",
    backgroundColor: "brown3"
  },
  team_away: {
    justifyContent: "flex-end",
    display: "flex",
    flexFlow: "row nowrap",
    backgroundColor: "chartreuse1"
  },
  toggle: {
    marginBottom: 16
  }
};
class GroupMatch extends Component {

  handleToggle(value) {
    this.props.handleChangedResult(null, this.props.game, 'finished', value)
  }
  renderMatch = isAdmin => {
    let renderAdmin = "";

    if (isAdmin) {
      renderAdmin = (
        <div style={{ flex: 1 }}>
          <div
            style={{
              justifyContent: "flex-end",
              display: "flex",
              flexFlow: "row nowrap"
            }}
          >
            <Toggle
              toggled={this.props.game.finished}
              style={styles.toggle}
              onToggle={() => { this.handleToggle(!this.props.game.finished) }}
            />
          </div>
        </div>
      );
    }
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-around",
          alignItems: "center",
          margin: 10
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              justifyContent: "flex-start",
              display: "flex",
              flexFlow: "row nowrap"
            }}
          >
            <Team
              id={this.props.game.home_team}
              isHomeTeam="true"
              style={styles.team_home}
            />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              justifyContent: "space-around",
              display: "flex",
              flexFlow: "row nowrap",
              alignItems: "center"
            }}
          >
            <div style={{ width: 3 }}>
              <TextField
                id={`${this.props.game.home_team}_home`}
                type="number"
                value={this.props.game.home_result}
                onChange={(e, game, type) =>
                  this.props.handleChangedResult(e, this.props.game, "home")
                }
                style={{ width: 30 }}
              />
            </div>
            <div>x</div>
            <div style={{ width: 3 }}>
              <TextField
                id={`${this.props.game.home_team}_away`}
                type="number"
                value={this.props.game.away_result}
                onChange={(e, game, type) =>
                  this.props.handleChangedResult(e, this.props.game, "away")
                }
                style={{ width: 30 }}
              />
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              justifyContent: "flex-end",
              display: "flex",
              flexFlow: "row nowrap"
            }}
          >
            <Team id={this.props.game.away_team} isHomeTeam="false" />
          </div>
        </div>
        {renderAdmin}
      </div>
    );
  };

  render() {
    const { game, isAdmin } = this.props;

    console.log(isAdmin);

    if (game.type === "group") {
      return this.renderMatch(isAdmin);
    } else {
      return <div />;
    }
  }
}

export default GroupMatch;
