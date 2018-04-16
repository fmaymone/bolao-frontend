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
import { updateMatch } from '../../store/actions/bolaoActions'

const path = "/bets/";

class Match extends Component {
  constructor() {
    super();


    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      winner: 0,
      isDraw: false
    }
  }
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  chooseDrawWinnerHandler = async (id) =>{

    console.log(id);
    this.setState({winner: id});
    this.setState({isDraw: true});

  }
  awayScoreChangedHandler = async (event) => {


    if (this.props) {
      let gameToBeUpdated = { ...this.props.game };
      gameToBeUpdated.away_result = event.target.value;
      await this.props.updateMatch(gameToBeUpdated);
      // this.setState({away_score: event.target.value})

    }

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
    const { game } = this.props;


    //if the game is a draw, the user needs to choose the winner
    if (game.home_result == game.away_result) {
      return this.renderDrawMatch();
    } else {
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

  }

  renderDrawMatch = () => {
    console.log(this.state.winner);
    return (
      <div key={this.props.game.name}>
        <Row align="center" style={{ borderStyle: 'groove'  }} >
          <Col sm={4} onClick={this.chooseDrawWinnerHandler.bind(this,this.props.game.home_team)}>
            <Team id={this.props.game.home_team} isHomeTeam="true" isWinner={this.state.winner}/>
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
            <Team id={this.props.game.away_team} isHomeTeam="false" isWinner={this.state.winner} />
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
  const { intl, dialogs, auth } = state;

  return {
    intl,
    dialogs,
    auth,
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