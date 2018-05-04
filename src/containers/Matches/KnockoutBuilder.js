import React, { Component } from "react";
import TestList from "../../components/Match/TestList";
import BetForm from "../../components/Forms/BetForm";
import { Activity } from "rmw-shell";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import MatchList from "../../components/Match/MatchList";
import ClassificationBuilder from "./ClassificationBuilder";
import FlatButton from "material-ui/FlatButton";
import {
  
  changeStage,
  updateMatch,
  updateFinalResult

} from "../../store/actions/bolaoActions";
import { Container, Row, Col } from "react-grid-system";
import { GROUPS_STAGE, KNOCKOUT_STAGE, OTHERS } from "../../store/actions/types";

const groups = [
  "round_16",
  "round_8",
  "round_4",
  "round2_loser",
  "round2_winner"
];

class KnockoutBuilder extends Component {



  handleChangedResult = async (e, game, type) => {
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
    await this.props.updateMatch(gameToBeUpdated, this.props.pool);
    await this.updateNextMatches(gameToBeUpdated);
    //need to check the fucking match it it isnt semi-final (matches 61,62) or
    // the matches of the final and 3rd place (63)
  };
  updateSemiFinals = async game => {
    //the game 60 updates the winner goes to final (64) as home
    //the loser go to 34d place as home
    let finalMatch = this.props.referenceMatches.find(k => k.key == '64');
    let losersMatch = this.props.referenceMatches.find(k => k.key == '63');
    if(game.name == 61){
      
      finalMatch.val.home_team = game.winner;
      losersMatch.val.home_team = game.loser;

    }else{
      finalMatch.val.away_team = game.winner;
      losersMatch.val.away_team = game.loser;
    }
    await this.props.updateMatch(finalMatch, this.props.pool);
    await this.props.updateMatch(losersMatch, this.props.pool);

  }
  updateFinals = async game => {

    let finalResult = this.props.referenceMatches.find(k => k.key == 'result');
    
    if(game.name == 64){
      
      finalResult.val.first = game.winner;
      finalResult.val.second = game.loser;
    //final
    }else{
      finalResult.val.third = game.winner;
      finalResult.val.fourth = game.loser;
    }
    await this.props.updateFinalResult(finalResult.val, this.props.pool);
  }

  updateNextMatches = async game => {
    if(game.name <= 60){
      let gameToBeUpdated;
      let gameTarget = this.props.worldCupData.knockout_crossings.OTHERS.find(
        k => k.id == game.name
      );
  
      if(gameTarget.classified === 'winner'){
          gameToBeUpdated = this.props.referenceMatches.find(
          k => (k.key == gameTarget.target)
        );
        if (gameTarget.type === "home") {
          gameToBeUpdated.val.home_team = game.winner;
        } else {
          gameToBeUpdated.val.away_team = game.winner;
        }
      }
      await this.props.updateMatch(gameToBeUpdated, this.props.pool);
     
    }else{
      if(game.name == '61' || game.name == '62'){
        await this.updateSemiFinals(game)
      }
      if(game.name == '63' || game.name == '64'){
        await this.updateFinals(game)
      }
    }

  
    
  }
  
  chooseDrawWinnerHandler = async (gameToBeUpdated) => {

      await this.updateNextMatches(gameToBeUpdated);

  }
    


  nextGroup = () => {
    const { changeStage, playerDataReducer } = this.props;

    let newGroupValue = {
      currentGroup: "round_16",
      currentPhase: KNOCKOUT_STAGE
    };
    let tempGroup;
    if (playerDataReducer.currentGroup === "round2_winner") {
      tempGroup = "round_16";
    } else {
      tempGroup = groups[groups.indexOf(playerDataReducer.currentGroup) + 1];
    }
    newGroupValue.currentGroup = tempGroup;
    changeStage(newGroupValue);
  };

  prevGroup = () => {
    const { changeStage, playerDataReducer } = this.props;

    let newGroupValue = { currentGroup: "a", currentPhase: KNOCKOUT_STAGE };
    let tempGroup;
    if (playerDataReducer.currentGroup === "round_16") {
      tempGroup = "round2_winner";
    } else {
      tempGroup = groups[groups.indexOf(playerDataReducer.currentGroup) - 1];
    }
    newGroupValue.currentGroup = tempGroup;
    changeStage(newGroupValue);
  };

  groupsControls() {
    return (
      <div>
        <FlatButton
          label={"< Anterior"}
          primary={true}
          onClick={this.prevGroup.bind(this)}
        />
        <FlatButton
          label={"Proximo >"}
          primary={true}
          onClick={this.nextGroup.bind(this)}
        />
      </div>
    );
  }

  render() {
    const currentGroup = this.props.playerDataReducer.currentGroup;
    const { intl } = this.props;
    return (
      <div>
        <Row>
          <Col md={12}>
            <MatchList
              matches={this.props.matches}
              chooseDrawWinnerHandler={this.chooseDrawWinnerHandler}
              stage={this.props.playerDataReducer}
              title={intl.formatMessage({ id: currentGroup })}
              handleChangedResult={this.handleChangedResult}
              pool = {this.props.pool}
            />
          </Col>
        </Row>
        <Row>
          <Col md={8} offset={{ md: 2 }}>
            <div>{this.groupsControls()}</div>
          </Col>
        </Row>
        {/* <Row>
                    <Col  md={8} offset={{ md: 2 }}><ClassificationBuilder classification={this.props.matches} stage={this.props.playerDataReducer} /></Col>
                </Row>  */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    intl,
    dialogs,
    auth,
    playerDataReducer,
    worldCupData,
    lists
  } = state;

  return {
    intl,
    dialogs,
    auth,
    playerDataReducer: playerDataReducer,
    worldCupData,
    referenceMatches: lists.listMatches
  };
};

export default connect(mapStateToProps, {
  
  changeStage,
  updateMatch,
  updateFinalResult
})(injectIntl(withRouter(withFirebase(muiThemeable()(KnockoutBuilder)))));
