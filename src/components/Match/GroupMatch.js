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


class GroupMatch extends Component {

  renderMatch = () => {

    return (
      <div key={this.props.game.name}>
        <Row align="center"  >
          <Col sm={4} >
            <Team id={this.props.game.home_team} isHomeTeam="true"  />
          </Col>
          <Col sm={1}>
            <center><TextField id={`${this.props.game.home_team}_home`} type='number' value={this.props.game.home_result} onChange={(e,game,type)=>this.props.handleChangedResult(e, this.props.game, 'home')} /></center>
          </Col>
          <Col sm={2}>
            <center>X</center>
          </Col>
          <Col sm={1}>
            <center><TextField id={`${this.props.game.home_team}_away`} type='number' value={this.props.game.away_result} onChange={(e,game,type)=>this.props.handleChangedResult(e, this.props.game, 'away')} /></center>
          </Col>
          <Col sm={4} >
            <Team id={this.props.game.away_team} isHomeTeam="false"  />
          </Col>
        </Row>
      </div>
    )
  }


  render() {
    const { game } = this.props;

    if (game.type === 'group') {
      return this.renderMatch();
    } else {
      <div />
    }
  }
}

export default GroupMatch;