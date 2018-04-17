import React, { Component } from "react";
import Paper from "material-ui/Paper";
//import Flag from "react-flags";
import { connect } from "react-redux";
import Team from "./Team";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { injectIntl, intlShape } from "react-intl";
import PropTypes from "prop-types";

import muiThemeable from "material-ui/styles/muiThemeable";
import { Activity } from "rmw-shell";
import { ResponsiveMenu } from "material-ui-responsive-menu";
import { setDialogIsOpen } from "rmw-shell/lib/store/dialogs/actions";
import BetForm from "../../components/Forms/BetForm";
import { withRouter } from "react-router-dom";
import firebase from "firebase";
import FontIcon from "material-ui/FontIcon";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import { withFirebase } from "firekit-provider";
import FireForm from "fireform";
import { change, submit } from "redux-form";
import isGranted from "rmw-shell/lib/utils/auth";
import TestForm from "../../components/Forms/TestForm";

import { Container, Row, Col } from "react-grid-system";
import TextField from 'material-ui/TextField';
import { updateMatch } from '../../store/actions/bolaoActions';
import {OTHERS} from '../../store/actions/types';

const path = "/bets/";

class Match extends Component {
  constructor() {
    super();


    // This binding is necessary to make `this` work in the callback
 
    this.state = {
      winner: 0,
      isDraw: false
    }
  }

  chooseDrawWinnerHandler = async (id) =>{

    console.log(id);
    // this.setState({winner: id});
    // this.setState({isDraw: true});
    if (this.props) {
      let gameToBeUpdated = { ...this.props.game };
      gameToBeUpdated.winner = id;
      await this.props.updateMatch(gameToBeUpdated);
    }

  }
  awayScoreChangedHandler = async (event) => {


    if (this.props) {
      let gameToBeUpdated = { ...this.props.game };
      gameToBeUpdated.away_result = event.target.value;
      await this.props.updateMatch(gameToBeUpdated);
      // this.setState({away_score: event.target.value})

    }

  }

  updateKnockoutMatch = async (game) =>{
   
    if (this.props) {
      let gameToBeUpdated = { ...this.props.game };
      if(game.home_result > game.away_result){
        gameToBeUpdated.winner = game.home_team;
      }else{
        gameToBeUpdated.winner = game.away_team;
      }
      await this.props.updateMatch(gameToBeUpdated);
      await this.updateNextStageMatches(game);
    }
  }

  updateNextStageMatches = async (game) => {
    
    let isHome = true;
    let matchTarget = this.props.worldCupData.knockout_crossings.OTHERS.find(k=>k.id==game.name);
    let actualValue = this.props.matches.find(k=>k.key==game.name);
    if(matchTarget.classified == 'winner'){

      if(matchTarget.type == 'home'){
        actualValue.val.home_team = game.winner;
      }else{
        actualValue.val.away_team = game.winner;
      }

    
    }else{
      if(matchTarget.type == 'home'){
        actualValue.val.home_team = game.winner;
      }else{
        actualValue.val.away_team = game.winner;
      }

    }
    await this.props.updateMatch(actualValue);
    

  }

  homeScoreChangedHandler = async (event) => {

    if (this.props) {
      let gameToBeUpdated = { ...this.props.game };
      gameToBeUpdated.home_result = event.target.value;
      await this.props.updateMatch(gameToBeUpdated);
      //this.setState({home_score: event.target.value})
    }

  }

  renderGroupsMatch = () => {
    return (
      <div key={this.props.game.name}>
        <Row align="center">

          <Col sm={4}>
            <Team id={this.props.game.home_team} isHomeTeam="true" />
          </Col>
          <Col sm={1}>
            <center><TextField type='number' value={this.props.game.home_result} onChange={this.homeScoreChangedHandler.bind(this)} /></center>
          </Col>
          <Col sm={2}>
            <center>X</center>
          </Col>
          <Col sm={1}>
            <center><TextField type='number' value={this.props.game.away_result} onChange={this.awayScoreChangedHandler.bind(this)} /></center>
          </Col>
          <Col sm={4}>
            <Team id={this.props.game.away_team} isHomeTeam="false" />
          </Col>
        </Row>
      </div>
    )
  }

  renderKnockoutMatch = () => {
    const game  = this.props.game;


    //if the game is a draw, the user needs to choose the winner
    if (game.home_result == game.away_result) {
      return this.renderDrawMatch();
    } else {
      this.updateKnockoutMatch(game);
      return (
        <div key={game.name}>
          <Row align="center">

            <Col sm={4}>
              <Team id={game.home_team} isHomeTeam="true" />
            </Col>
            <Col sm={1}>
              <center><TextField type='number' value={game.home_result} onChange={this.homeScoreChangedHandler.bind(this)} /></center>
            </Col>
            <Col sm={2}>
              <center>X</center>
            </Col>
            <Col sm={1}>
              <center><TextField type='number' value={game.away_result} onChange={this.awayScoreChangedHandler.bind(this)} /></center>
            </Col>
            <Col sm={4}>
              <Team id={game.away_team} isHomeTeam="false" />
            </Col>
          </Row>
        </div>

      )

    }

  }

  renderDrawMatch = () => {
    console.log(this.state.winner);
    return (
      <div key={this.props.game.name}>
        <Row align="center" style={{ borderStyle: 'groove'  }} >
          <Col sm={4} onClick={this.chooseDrawWinnerHandler.bind(this,this.props.game.home_team)}>
            <Team id={this.props.game.home_team} isHomeTeam="true" isWinner={this.props.game.winner}/>
          </Col>
          <Col sm={1}>
            <center><TextField type='number' value={this.props.game.home_result} onChange={this.homeScoreChangedHandler.bind(this)} /></center>
          </Col>
          <Col sm={2}>
            <center>X</center>
          </Col>
          <Col sm={1}>
            <center><TextField type='number' value={this.props.game.away_result} onChange={this.awayScoreChangedHandler.bind(this)} /></center>
          </Col>
          <Col sm={4} onClick={this.chooseDrawWinnerHandler.bind(this,this.props.game.away_team)}>
            <Team id={this.props.game.away_team} isHomeTeam="false" isWinner={this.props.game.winner} />
          </Col>
        </Row>
      </div>
    )
  }


  render() {
    const {
      history,
      intl,
      setDialogIsOpen,
      dialogs,
      game,
      submit,
      muiTheme,
      isGranted,
      firebaseApp,
      auth
    } = this.props;

    if (game.type === 'group') {
      return this.renderGroupsMatch();
    } else {
      return this.renderKnockoutMatch();
    }
  }
}

const mapStateToProps = state => {
  const { intl, dialogs, auth, worldCupData,lists } = state;

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
const styles = {
  match: {
    overflow: "hidden",
    display: "flex",

    flexDirection: "row",
    justifyContent: 'center'
  }
};