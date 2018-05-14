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
import { OTHERS } from '../../store/actions/types';
import Conditional from '../UI/Conditional';


class Match extends Component {

  chooseDrawWinnerHandler = async (id) => {

    if (this.props) {
      let gameToBeUpdated = { ...this.props.game };
      gameToBeUpdated.winner = id;
      //if the game needed to be updated is home, the loser is the away
      if(gameToBeUpdated.home_team == id){
        gameToBeUpdated.loser = gameToBeUpdated.away_team;
      }else{
        gameToBeUpdated.loser = gameToBeUpdated.home_team;
      }
      await this.props.updateMatch(gameToBeUpdated, this.props.pool);
      await this.props.chooseDrawWinnerHandler(gameToBeUpdated);
    }

  }

 renderKnockoutMatch = () => {
    const game = this.props.game;
    //if the game is a draw, the user needs to choose the winner
    if (game.home_result == game.away_result) {
      return this.renderDrawMatch();
    } else {
      return (
        <div key={game.name}>
          <Row align="center">
            <Col sm={4}>
              <Team id={game.home_team} isHomeTeam="true" />
            </Col>
            <Col sm={1}>
              <center><TextField type='number' value={this.props.game.home_result} onChange={(e,game,type)=>this.props.handleChangedResult(e, this.props.game, 'home')} /></center>
            </Col>
            <Col sm={2}>
              <center>X</center>
            </Col>
            <Col sm={1}>
              <center><TextField type='number' value={this.props.game.away_result} onChange={(e,game,type)=>this.props.handleChangedResult(e, this.props.game, 'away')} /></center>
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

    return (
      <div key={this.props.game.name} style={{ borderStyle: 'groove', borderRadius:10 }}>
        <Row align="center" >
          <Col sm={4} onClick={this.chooseDrawWinnerHandler.bind(this, this.props.game.home_team)}>
            <Team id={this.props.game.home_team} isHomeTeam="true" isWinner={this.props.game.winner} />
          </Col>
          <Col sm={1}>
            <center><TextField type='number' value={this.props.game.home_result} onChange={(e,game,type)=>this.props.handleChangedResult(e, this.props.game, 'home')} /></center>
          </Col>
          <Col sm={2}>
            <center>X</center>
          </Col>
          <Col sm={1}>
            <center><TextField type='number' value={this.props.game.away_result} onChange={(e,game,type)=>this.props.handleChangedResult(e, this.props.game, 'away')} /></center>
          </Col>
          <Col sm={4} onClick={this.chooseDrawWinnerHandler.bind(this, this.props.game.away_team)}>
            <Team id={this.props.game.away_team} isHomeTeam="false" isWinner={this.props.game.winner} />
          </Col>
        </Row>
      </div>
    )
  }


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
const styles = {
  match: {
    overflow: "hidden",
    display: "flex",

    flexDirection: "row",
    justifyContent: 'center'
  }
};