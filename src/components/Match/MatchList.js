import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import muiThemeable from "material-ui/styles/muiThemeable";
import { injectIntl } from "react-intl";
import { Activity } from "rmw-shell";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";
import TextField from "material-ui/TextField";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { withRouter } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import { withFirebase } from "firekit-provider";
import isGranted from "rmw-shell/lib/utils/auth";
import Scrollbar from "rmw-shell/lib/components/Scrollbar/Scrollbar";
import FlatButton from "material-ui/FlatButton";
import FireForm from "fireform";
import BetForm from "../../components/Forms/BetForm";
import firebase from "firebase";
import { change, submit } from "redux-form";
import Match from "./Match";
import { Container, Row, Col } from "react-grid-system";
import Classification from './Classification'
import {changeStage}  from '../../store/actions/bolaoActions'

class MatchList extends Component {



render() {
  const {
    history,
    intl,
    setDialogIsOpen,
    dialogs,
    match,
    submit,
    muiTheme,
    isGranted,
    firebaseApp,
    matches,
    playerDataReducer
    } = this.props;
  const uid = this.props.auth.uid;

  if (uid) {
    return (
      <Container fluid style={styles.matchesContainer}>
        <h1>Grupo {playerDataReducer.currentGroup.toUpperCase()} </h1>

        
        {matches.map(match => (
          <div key={match.name}>
            <Match game={match.val} />
          </div>
        ))}

       
      </Container>

    );
  } else {
    return "Oi";
  }
}
}
const mapStateToProps = state => {
  const { auth, browser, lists, worldCupData, playerDataReducer } = state;

  return {
    auth,
    browser,
    isGranted: grant => isGranted(state, grant),
    worldCupData: worldCupData,
    playerDataReducer: playerDataReducer
  };
};

export default connect(mapStateToProps)(
  injectIntl(muiThemeable()(withRouter(withFirebase(MatchList))))
);

const styles = {
  matchesContainer: {
    overflow: "hidden",
    display: "flex",
    left: 20,
    flexDirection: "column"
  }
};
