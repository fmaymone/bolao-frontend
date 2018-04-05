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

  componentWillMount(){
    const { watchList, firebaseApp, auth, game } = this.props
    
    let ref = firebaseApp.database().ref('/users/' + auth.uid + '/bets/' + game.name)
    // if(ref){
    //   ref.on('value', snapshot => {
    //     this.setState({ away_score: snapshot.val().away_score });
    //     this.setState({ home_score: snapshot.val().home_score });
    //   });
    // }
    this.listenForMatch(ref);
  }

  handleSave = async ( ) =>{
    const {  firebaseApp, auth, game } = this.props
    let  ref =  await firebaseApp.database().ref('/users/' + auth.uid + '/bets/' + game.name)
    await ref.set({
      away_score: this.state.away_score,
      home_score: this.state.home_score,
      away_team: this.props.game.away_team,
      home_team: this.props.game.home_team,

    })
 
  }

   listenForMatch = async (matchRef) => {
   
    await matchRef.on('value', (dataSnapshot) => {

      if(dataSnapshot.val()){
        this.setState({ away_score: dataSnapshot.val().away_score });
        this.setState({ home_score: dataSnapshot.val().home_score });
        this.setState({ home_team: dataSnapshot.val().home_team });
        this.setState({ away_team: dataSnapshot.val().away_team });
      }
      
      
    });
    }

  awayScoreChangedHandler = (event) =>{
    this.setState({away_score: event.target.value})
    this.handleSave()
    //this.props.updateClassification();
  }
  homeScoreChangedHandler = (event) =>{
    this.setState({home_score: event.target.value})
    this.handleSave()
    //this.props.updateClassification();
    
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
      <Container style={styles.match}>
      <Row align="center">
        <Col sm={4}>
          <Team id={this.props.game.home_team} isHomeTeam="true" />
        </Col>
        <Col sm={1}>
          <TextField value={this.state.home_score} onChange={this.homeScoreChangedHandler}/>
        </Col>
        <Col sm={2}>
        <center>X</center>
        
        </Col>
        <Col sm={1}>
          <TextField value={this.state.away_score} onChange={this.awayScoreChangedHandler}/>
        </Col>
        <Col sm={4}>
          <Team id={this.props.game.away_team} isHomeTeam="false" />
        </Col>
      </Row>
      
      </Container>
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
  submit
  
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