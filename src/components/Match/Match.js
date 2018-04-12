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
  constructor(props) {
    super(props);
   
  }

  componentWillMount() {

  }

  awayScoreChangedHandler = async  (event) => {

    
    if(this.props){
      let gameToBeUpdated = {...this.props.game };
      gameToBeUpdated.away_result = event.target.value;
      await this.props.updateMatch(gameToBeUpdated);
     
    }

  }
  homeScoreChangedHandler = async (event) => {

    if(this.props){
      let gameToBeUpdated = {...this.props.game};
      gameToBeUpdated.home_result = event.target.value;
      await this.props.updateMatch(gameToBeUpdated);
     
    }

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
    return (
      
        <Row align="center">
          <Col sm={4}>
            <Team id={this.props.game.home_team} isHomeTeam="true" />
          </Col>
          <Col sm={1}>
            <center><TextField type='number'  value={this.props.game.home_result} onChange={this.homeScoreChangedHandler.bind(this)} /></center>
          </Col>
          <Col sm={2}>
            <center>X</center>
          </Col>
          <Col sm={1}>
            <center><TextField type='number'  value={this.props.game.away_result} onChange={this.awayScoreChangedHandler.bind(this)} /></center>
          </Col>
          <Col sm={4}>
            <Team id={this.props.game.away_team} isHomeTeam="false" />
          </Col>
        </Row>

      
    );
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