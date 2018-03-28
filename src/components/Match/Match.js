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
import { betCreate } from "../../store/actions";
import { Container, Row, Col } from "react-grid-system";
import TextField from 'material-ui/TextField';

const path = "/bets/";

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      away_team: "0",
      home_team: "0",
      away_score: "0",
      home_score: "0"
    };
  }

  awayScoreChangedHandler = (event) =>{
    this.setState({away_score: event.target.value})
  }
  homeScoreChangedHandler = (event) =>{
    this.setState({home_score: event.target.value})
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
      <Row>
        <Col sm={3}>
          <Team id={this.props.game.home_team} isHomeTeam="true" />
        </Col>
        <Col sm={1}>
          <TextField value={this.state.home_score} onChange={this.homeScoreChangedHandler}/>
        </Col>
        <Col sm={4}>
        <div className="col-sm-3 center-xs start-md" ><center>X</center></div>
        
        </Col>
        <Col sm={1}>
          <TextField value={this.state.away_score} onChange={this.awayScoreChangedHandler}/>
        </Col>
        <Col sm={3}>
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
  betCreate
})(injectIntl(withRouter(withFirebase(muiThemeable()(Match)))));

Match.propTypes = {
  // name: PropTypes.string,
  // code: PropTypes.string,
  // home: PropTypes.boolean
};
