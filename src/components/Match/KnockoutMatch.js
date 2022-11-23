import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Team, { getTeamDetails } from "./Team";
import { injectIntl } from "react-intl";
import muiThemeable from "material-ui/styles/muiThemeable";
import { setDialogIsOpen } from "rmw-shell/lib/store/dialogs/actions";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { change, submit } from "redux-form";
import isGranted from "rmw-shell/lib/utils/auth";
import Badge from "material-ui/Badge";
import Chip from "material-ui/Chip";

import TextField from "material-ui/TextField";
import { updateMatch } from "../../store/actions/bolaoActions";
import { isMobile } from "../../device";
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

  chip: {
    margin: 4,
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
};
class Match extends Component {
  getDesktopContent = (type) => {
    if (!isMobile()) {
      if (type === "home") {
        return (
          <div>
            <div>
              <Chip style={styles.chip}>{`Jogo: ${this.props.game.name}`}</Chip>
            </div>
            <div>
              <Badge badgeContent={this.props.title.home} primary={true} />
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div>
              <Badge badgeContent={this.props.title.away} primary={true} />
            </div>
          </div>
        );
      }
    } else {
      return <div />;
    }
  };
  chooseDrawWinnerHandler = async (id) => {
    if (!this.props.finishedTimeToBet) {
      if (this.props) {
        let gameToBeUpdated = { ...this.props.game };
        gameToBeUpdated.winner = id;
        //if the game needed to be updated is home, the loser is the away
        if (gameToBeUpdated.home_team == id) {
          gameToBeUpdated.loser = gameToBeUpdated.away_team;
        } else {
          gameToBeUpdated.loser = gameToBeUpdated.home_team;
        }
        await this.props.updateMatch(
          gameToBeUpdated,
          this.props.pool,
          this.props.user
        );
        await this.props.chooseDrawWinnerHandler(gameToBeUpdated);
      }
    }
  };

  renderKnockoutMatch = () => {
    const game = this.props.game;
    //if the game is a draw, the user needs to choose the winner
    if (game.home_result == game.away_result) {
      return this.renderDrawMatch();
    } else {
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
        </Fragment>
      );
    }
  };

  renderDrawMatch = () => {
    return (
      <Fragment>
        <tr
          style={{
            borderStyle: "groove",
            borderRadius: 10,
            border: "1px solid #e1e0de",
          }}
        >
          <Fragment
            onClick={this.chooseDrawWinnerHandler.bind(
              this,
              this.props.game.home_team
            )}
          >
            {getTeamDetails(
              this.props.worldCupData,
              this.props.game.home_team,
              true,
              this.props.game.winner
            )}
          </Fragment>
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
          <Fragment
            onClick={this.chooseDrawWinnerHandler.bind(
              this,
              this.props.game.away_team
            )}
          >
            {getTeamDetails(
              this.props.worldCupData,
              this.props.game.away_team,
              false,
              this.props.game.winner
            )}
          </Fragment>
        </tr>
      </Fragment>
    );
  };

  render() {
    return this.renderKnockoutMatch();
  }
}

const mapStateToProps = (state) => {
  const { intl, dialogs, auth, worldCupData, lists } = state;

  return {
    intl,
    dialogs,
    auth,
    worldCupData,
    matches: lists.listMatches,
    isGranted: (grant) => isGranted(state, grant),
  };
};

export default connect(mapStateToProps, {
  setDialogIsOpen,
  change,
  submit,
  updateMatch,
})(injectIntl(withRouter(withFirebase(muiThemeable()(Match)))));

Match.propTypes = {
  // name: PropTypes.string,
  // code: PropTypes.string,
  // home: PropTypes.boolean
};
