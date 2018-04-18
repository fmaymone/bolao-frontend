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
import KnockoutMatch from './KnockoutMatch';
import GroupMatch from './GroupMatch';




class Match extends Component {

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
      return (<GroupMatch game={game} handleChangedResult={this.props.handleChangedResult}/>)
    } else {
      return (<KnockoutMatch game={game}  chooseDrawWinnerHandler={this.props.chooseDrawWinnerHandler} handleChangedResult={this.props.handleChangedResult}/>)
    }
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