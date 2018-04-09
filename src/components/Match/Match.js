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
import {updateMatch} from '../../store/actions/bolaoActions'

const path = "/bets/";

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      away_team: "0",
      home_team: "0",
      away_result: "0",
      home_result: "0",
      id:"0"
    };
  }

  componentWillMount(){
    const { watchList, firebaseApp, auth, game } = this.props
    
    //let ref = firebaseApp.database().ref('/users/' + auth.uid + '/matches/' + game.name - 1)
    // if(ref){
    //   ref.on('value', snapshot => {
    //     this.setState({ away_score: snapshot.val().away_score });
    //     this.setState({ home_score: snapshot.val().home_score });
    //   });
    // }
  //  this.listenForMatch(ref);
  }

  handleSave = async ( ) =>{
    // const {  firebaseApp, auth, game } = this.props
    // let  ref =  await firebaseApp.database().ref('/users/' + auth.uid + '/matches/' + game.name - 1)
    // await ref.set({
    //   away_score: this.state.away_score,
    //   home_score: this.state.home_score,
    //   away_team: this.props.game.away_team,
    //   home_team: this.props.game.home_team,
      

    // })
 
  }

   listenForMatch = async (matchRef) => {
   
    await matchRef.on('value', (dataSnapshot) => {

      if(dataSnapshot.val()){
        this.setState({ away_score: dataSnapshot.val().find(k => k == (this.props.game.name -1).away_score) });
        this.setState({ home_score: dataSnapshot.val().find(k => k == (this.props.game.name -1).home_score) });
        this.setState({ away_team: dataSnapshot.val().find(k => k == (this.props.game.name -1).away_team) });
        this.setState({ home_team: dataSnapshot.val().find(k => k == (this.props.game.name -1).home_team) });
        
      }
      
      
    });
    }

  awayScoreChangedHandler = (event) =>{

    console.log(event.target.value);

    let gameToBeUpdated = this.props.game;
    gameToBeUpdated.away_result = event.target.value;
    this.props.updateMatch(gameToBeUpdated);
    
    // this.props.updateMatch(this.props.game);

    // this.setState({away_result: event.target.value})
    //this.handleSave()
    //this.props.updateClassification();
  }
  homeScoreChangedHandler = (event) =>{
    
    let gameToBeUpdated = this.props.game;
    gameToBeUpdated.home_result = event.target.value;
    this.props.updateMatch(gameToBeUpdated);
    // this.props.game.home_result = event.targe.value;
    // this.props.updateMatch(this.props.game);
    //this.setState({home_result: event.target.value})
    //this.handleSave()
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
          <TextField value={this.props.game.home_result} onChange={this.homeScoreChangedHandler.bind(this)}/>
        </Col>
        <Col sm={2}>
        <center>X</center>
        
        </Col>
        <Col sm={1}>
          <TextField value={this.props.game.away_result} onChange={this.awayScoreChangedHandler.bind( this)}/>
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