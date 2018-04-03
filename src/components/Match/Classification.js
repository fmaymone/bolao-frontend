import React, { Component } from "react";
import { injectIntl, intlShape } from "react-intl";
import isGranted from "rmw-shell/lib/utils/auth";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import muiThemeable from "material-ui/styles/muiThemeable";

const WIN_HOME = 1;
const WIN_AWAY = 2;
const DRAW = 0;



class Classification extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classification: {}
    };
  }

  componentDidMount() {
    this.addMatchesToClassification();
  }
  addMatchesToClassification = () => {
    const matches = this.props.matches;

    for (let match of matches) {
      this.addPointsToTeams(match);
    }
  }
  addPointsToTeams(match){

    

    let homeTeam ={};
    let awayTeam ={};
    //if the team is not on state homeTeam will
    //be the new one
    if(!this.isTeamOnState(match.home_team)){
      homeTeam = { }
    }else{
      //slice from the state
      homeTeam = { }
    }
    if(!this.isTeamOnState(match.away_team)){
      awayTeam = { }
    }else{
      //slice from the state
      awayTeam = { }
    }
    switch (this.computeResult(match)) {

      

      case WIN_HOME:
        
      
      break
      case WIN_AWAY:
      
      break
      case DRAW:
      
      break
    
    }

  }
  computeResult(match) {
    if (match.home_score > match.away_score) {
      return WIN_HOME;
    }
    if (match.home_score < match.away_score) {
      return WIN_AWAY;
    }

    return DRAW;

  }
  isTeamOnState(id) {
    var json = this.state.classification;
    id in json ? true : false
    
  }
  render() {


    return <h1>Olar</h1>;
  }
}
const mapStateToProps = state => {
  const { intl, dialogs, auth, worldCupData } = state;

  return {
    intl,
    dialogs,
    auth,
    isGranted: grant => isGranted(state, grant),
    worldCupData: worldCupData
  };
};
export default connect(mapStateToProps)(
  injectIntl(withRouter(withFirebase(muiThemeable()(Classification))))
);
