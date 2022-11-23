import React, { Component, Fragment } from "react";
import Team, { getTeamDetails } from "./Team";
import TextField from "material-ui/TextField";
import Toggle from "material-ui/Toggle";
import { injectIntl } from "react-intl";
import muiThemeable from "material-ui/styles/muiThemeable";
import { withRouter } from "react-router";
import { connect } from "react-redux";

const styles = {
  container: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "aquamarine1",
  },
  team_home: {
    justifyContent: "flex-start",
    display: "flex",
    flexFlow: "row nowrap",
    backgroundColor: "aquamarine1",
  },
  inputs: {
    justifyContent: "center",
    display: "flex",
    flexFlow: "row nowrap",
    backgroundColor: "brown3",
  },
  team_away: {
    justifyContent: "flex-end",
    display: "flex",
    flexFlow: "row nowrap",
    backgroundColor: "chartreuse1",
  },
  toggle: {
    marginBottom: 16,
  },
};
class GroupMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleToggle(value) {
    this.props.handleChangedResult(null, this.props.game, "finished", value);
  }
  renderMatch = (isAdmin) => {
    let renderAdmin = "";

    if (isAdmin) {
      renderAdmin = (
        <div style={{ flex: 1 }}>
          <div
            style={{
              justifyContent: "flex-end",
              display: "flex",
              flexFlow: "row nowrap",
            }}
          >
            <Toggle
              toggled={this.props.game.finished}
              style={styles.toggle}
              onToggle={() => {
                this.handleToggle(!this.props.game.finished);
              }}
            />
          </div>
        </div>
      );
    }
    return (
      <Fragment>
        <tr>
          {getTeamDetails(
            this.props.worldCupData,
            this.props.game.home_team,
            true,
            false
          )}
          <td className="match-score">
            <TextField
              id={`${this.props.game.home_team}_home`}
              type="number"
              value={this.props.game.home_result}
              onChange={(e) =>
                this.props.handleChangedResult(e, this.props.game, "home")
              }
              disabled={this.props.finishedTimeToBet}
              style={{ width: 30 }}
            />
          </td>
          <td>x</td>
          <td className="match-score">
            <TextField
              id={`${this.props.game.home_team}_away`}
              type="number"
              value={this.props.game.away_result}
              onChange={(e) =>
                this.props.handleChangedResult(e, this.props.game, "away")
              }
              disabled={this.props.finishedTimeToBet}
              style={{ width: 30 }}
            />
          </td>
          {getTeamDetails(
            this.props.worldCupData,
            this.props.game.away_team,
            false,
            false
          )}
        </tr>
        <tr>{renderAdmin}</tr>
      </Fragment>
    );
  };

  render() {
    const { game, isAdmin } = this.props;

    if (game.type === "group") {
      return this.renderMatch(isAdmin);
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = (state) => {
  const { worldCupData } = state;

  return {
    worldCupData: worldCupData,
  };
};

export default connect(mapStateToProps)(
  injectIntl(muiThemeable()(withRouter(GroupMatch)))
);
