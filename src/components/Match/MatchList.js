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
    matches,
    stage
    } = this.props;
  
    return (
      <Container>
        <h1>{this.props.title} </h1>
        {matches.map(match => (
          <div key={match.name}>
            <Match game={match}  pool = {this.props.pool} chooseDrawWinnerHandler={this.props.chooseDrawWinnerHandler} 
            handleChangedResult={this.props.handleChangedResult}/>
          </div>
        ))}
      </Container>

    );
  } 
}

export default MatchList;


