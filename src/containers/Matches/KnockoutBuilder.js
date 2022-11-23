import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import MatchList from "../../components/Match/MatchList";
import FlatButton from "material-ui/FlatButton";
import FinalResult from "../Pools/FinalResult";

import {
  changeStage,
  updateMatch,
  updateFinalResult,
} from "../../store/actions/bolaoActions";
import { KNOCKOUT_STAGE } from "../../store/actions/types";

const groups = ["round_16", "round_8", "round_4", "3x4", "finals"];

class KnockoutBuilder extends Component {
  handleChangedResult = async (e, game, type) => {
    if (!this.props.finishedTimeToBet) {
      let gameToBeUpdated = { ...game };
      type === "home"
        ? (gameToBeUpdated.home_result = e.target.value)
        : (gameToBeUpdated.away_result = e.target.value);
      if (gameToBeUpdated.home_result > gameToBeUpdated.away_result) {
        gameToBeUpdated.winner = gameToBeUpdated.home_team;
        gameToBeUpdated.loser = gameToBeUpdated.away_team;
      }
      if (gameToBeUpdated.home_result < gameToBeUpdated.away_result) {
        gameToBeUpdated.winner = gameToBeUpdated.away_team;
        gameToBeUpdated.loser = gameToBeUpdated.home_team;
      }
      await this.props.updateMatch(
        gameToBeUpdated,
        this.props.pool,
        this.props.user
      );
      await this.updateNextMatches(gameToBeUpdated);
      await this.props.updateMatches();
      //need to check the fucking match it it isnt semi-final (matches 61,62) or
      // the matches of the final and 3rd place (63)
    }
  };
  updateSemiFinals = async (game) => {
    //the game 60 updates the winner goes to final (64) as home
    //the loser go to 34d place as home
    let finalMatch = this.props.referenceMatches.find((k) => k.key == "64");
    let losersMatch = this.props.referenceMatches.find((k) => k.key == "63");
    if (game.name == 61) {
      finalMatch.home_team = game.winner;
      losersMatch.home_team = game.loser;
    } else {
      finalMatch.away_team = game.winner;
      losersMatch.away_team = game.loser;
    }
    if (game.winner !== undefined && game.loser !== undefined) {
      await this.props.updateMatch(
        finalMatch,
        this.props.pool,
        this.props.user
      );
      await this.props.updateMatch(
        losersMatch,
        this.props.pool,
        this.props.user
      );
    }
  };
  updateFinals = async (game) => {
    let finalResult = this.props.referenceMatches.find(
      (k) => k.key === "result"
    );

    if (game.name == 64) {
      finalResult.first = game.winner;
      finalResult.second = game.loser;
      //final
    } else {
      finalResult.third = game.winner;
      finalResult.fourth = game.loser;
    }
    if (game.winner !== undefined && game.loser !== undefined) {
      await this.props.updateFinalResult(
        finalResult,
        this.props.pool,
        this.props.user
      );
    }
  };

  updateNextMatches = async (game) => {
    if (!this.props.finishedTimeToBet) {
      if (game.name <= 60) {
        let gameToBeUpdated;
        let gameTarget = this.props.worldCupData.knockout_crossings.OTHERS.find(
          (k) => k.id == game.name
        );

        if (gameTarget.classified === "winner") {
          gameToBeUpdated = this.props.referenceMatches.find(
            (k) => k.key == gameTarget.target
          );
          if (gameTarget.type === "home") {
            gameToBeUpdated.home_team = game.winner;
          } else {
            gameToBeUpdated.away_team = game.winner;
          }
        }
        await this.props.updateMatch(
          gameToBeUpdated,
          this.props.pool,
          this.props.user
        );
      } else {
        if (game.name == "61" || game.name == "62") {
          await this.updateSemiFinals(game);
        }
        if (game.name == "63" || game.name == "64") {
          await this.updateFinals(game);
        }
      }
    }
  };

  chooseDrawWinnerHandler = async (gameToBeUpdated) => {
    if (!this.props.finishedTimeToBet) {
      await this.updateNextMatches(gameToBeUpdated);
      await this.props.updateMatches();
    }
  };

  updateAllNextMatches = async () => {
    const { matches } = this.props;

    matches.map(async (match) => {
      await this.updateNextMatches(match);
    });
    await this.props.updateMatches();
  };

  nextGroup = () => {
    const { changeStage, playerDataReducer } = this.props;

    let newGroupValue = {
      currentGroup: "round_16",
      currentPhase: KNOCKOUT_STAGE,
    };
    let tempGroup;
    if (playerDataReducer.currentGroup === "finals") {
      tempGroup = "round_16";
    } else {
      tempGroup = groups[groups.indexOf(playerDataReducer.currentGroup) + 1];
    }
    newGroupValue.currentGroup = tempGroup;
    changeStage(newGroupValue);
    this.updateAllNextMatches();
  };

  prevGroup = () => {
    const { changeStage, playerDataReducer } = this.props;

    let newGroupValue = { currentGroup: "a", currentPhase: KNOCKOUT_STAGE };
    let tempGroup;
    if (playerDataReducer.currentGroup === "round_16") {
      tempGroup = "finals";
    } else {
      tempGroup = groups[groups.indexOf(playerDataReducer.currentGroup) - 1];
    }
    newGroupValue.currentGroup = tempGroup;
    changeStage(newGroupValue);
    this.updateAllNextMatches();
  };

  groupsControls() {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{}}>
          <FlatButton
            label={"< Anterior"}
            primary={true}
            onClick={this.prevGroup.bind(this)}
          />
        </div>
        <div style={{}}>
          <FlatButton
            label={"Proximo >"}
            primary={true}
            onClick={this.nextGroup.bind(this)}
          />
        </div>
      </div>
    );
  }

  render() {
    const currentGroup = this.props.playerDataReducer.currentGroup;

    const { intl } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{}}>
          <h1>{intl.formatMessage({ id: currentGroup })}</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MatchList
            matches={this.props.matches}
            chooseDrawWinnerHandler={this.chooseDrawWinnerHandler}
            stage={this.props.playerDataReducer}
            title={intl.formatMessage({ id: currentGroup })}
            handleChangedResult={this.handleChangedResult}
            finishedTimeToBet={this.props.finishedTimeToBet}
            pool={this.props.pool}
            user={this.props.user}
          />
        </div>
        <div style={{}}> {this.groupsControls()}</div>
        <div style={{}}>
          <FinalResult finalResult={this.props.finalResult} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    intl,
    dialogs,

    playerDataReducer,
    worldCupData,
    lists,
  } = state;

  return {
    intl,
    dialogs,

    playerDataReducer: playerDataReducer,
    worldCupData,
  };
};

export default connect(mapStateToProps, {
  changeStage,
  updateMatch,
  updateFinalResult,
})(injectIntl(withRouter(withFirebase(muiThemeable()(KnockoutBuilder)))));
