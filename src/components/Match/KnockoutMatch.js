import React, { Component } from "react";
import { connect } from "react-redux";
import Team from "./Team";
import { injectIntl } from "react-intl";
import muiThemeable from "material-ui/styles/muiThemeable";
import { setDialogIsOpen } from "rmw-shell/lib/store/dialogs/actions";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { change, submit } from "redux-form";
import isGranted from "rmw-shell/lib/utils/auth";
import Badge from "material-ui/Badge";
import Chip from "material-ui/Chip";
import { blue300, indigo900 } from "material-ui/styles/colors";

import TextField from "material-ui/TextField";
import { updateMatch } from "../../store/actions/bolaoActions";
import { isMobile } from "../../device";
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

  chip: {
    margin: 4
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap"
  }
};
class Match extends Component {
  getDesktopContent = type => {
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
  chooseDrawWinnerHandler = async id => {
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
  };

  renderKnockoutMatch = () => {
    const game = this.props.game;
    //if the game is a draw, the user needs to choose the winner
    if (game.home_result == game.away_result) {
      return this.renderDrawMatch();
    } else {
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
                flexFlow: "row nowrap",
                alignItems: "center"
              }}
            >
              {this.getDesktopContent('home')}
              <div>
                <Team
                  id={game.home_team}
                  isHomeTeam="true"
                  style={styles.team_home}
                />
              </div>
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
                  id={`${this.props.game.home_team}_away`}
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
                flexFlow: "row nowrap",
                alignItems: "center"
              }}
            >
              <div>
                {" "}
                <Team id={game.away_team} isHomeTeam="false" />
              </div>
              {this.getDesktopContent('away')}
            </div>
          </div>
        </div>
      );
    }
  };

  renderDrawMatch = () => {
    return (
      <div
        key={this.props.game.name}
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-around",
          alignItems: "center",
          margin: 10,
          borderStyle: "groove",
          borderRadius: 10
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              justifyContent: "flex-start",
              display: "flex",
              flexFlow: "row nowrap",
              alignItems: "center"
            }}
          >
            {this.getDesktopContent('home')}
            <div
              onClick={this.chooseDrawWinnerHandler.bind(
                this,
                this.props.game.home_team
              )}
            >
              <Team
                id={this.props.game.home_team}
                isHomeTeam="true"
                isWinner={this.props.game.winner}
                style={styles.team_home}
              />
            </div>
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
                id={`${this.props.game.home_team}_away`}
                type="number"
                disabled={true}
                value={this.props.game.home_result}
                onChange={(e, game, type) =>
                  this.props.handleChangedResult(e, this.props.game, "home")
                }
                //
                style={{ width: 30 }}
              />
            </div>
            <div>x</div>
            <div style={{ width: 3 }}>
              <TextField
                id={`${this.props.game.home_team}_away`}
                type="number"
                value={this.props.game.away_result}
                disabled={true}
                onChange={(e, game, type) =>
                  this.props.handleChangedResult(e, this.props.game, "away")
                }
                //
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
              flexFlow: "row nowrap",
              alignItems: "center"
            }}
          >
            <div
              onClick={this.chooseDrawWinnerHandler.bind(
                this,
                this.props.game.away_team
              )}
            >
              <Team
                id={this.props.game.away_team}
                isHomeTeam="false"
                isWinner={this.props.game.winner}
                onClick={this.chooseDrawWinnerHandler.bind(
                  this,
                  this.props.game.away_team
                )}
              />
            </div>
            {this.getDesktopContent('away')}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.renderKnockoutMatch();
  }
}

const mapStateToProps = state => {
  const { intl, dialogs, auth, worldCupData, lists } = state;

  return {
    intl,
    dialogs,
    auth,
    worldCupData,
    matches: lists.listMatches,
    isGranted: grant => isGranted(state, grant)
  };
};

export default connect(mapStateToProps, {
  setDialogIsOpen,
  change,
  submit,
  updateMatch
})(injectIntl(withRouter(withFirebase(muiThemeable()(Match)))));

Match.propTypes = {
  // name: PropTypes.string,
  // code: PropTypes.string,
  // home: PropTypes.boolean
};
