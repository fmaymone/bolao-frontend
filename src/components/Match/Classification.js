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

  state = {
    test: 'initial value',
    teams: [],
    matchesState:[]
  }
  componentDidMount() {
   
  }
 
  fillTeams = () => {

    const matches = this.state.matchesState;
    let teams = [];
    const handycapInitialValues = { plays: 0, wins: 0, losts: 0, draws: 0, gp: 0, gc: 0 };
    for (let match of matches) {
      let home = teams.find(k => k.id == match.home_team);
      let away = teams.find(k => k.id == match.away_team);
      if (home === undefined) {
        teams.push({ id: match.home_team, handycap: { plays: 0, wins: 0, losts: 0, draws: 0, gp: 0, gc: 0 } })
      }
      if (away === undefined) {
        teams.push({ id: match.away_team, handycap: { plays: 0, wins: 0, losts: 0, draws: 0, gp: 0, gc: 0 } })
      }
    }
    for (let match of matches) {
      match.away_score = 1;
      match.home_score = 1;
      let home = teams.find(k => k.id == match.home_team);
      let away = teams.find(k => k.id == match.away_team);
      
      home.handycap.plays += 1;
      away.handycap.plays += 1;
      
      home.handycap.gp += match.home_score;
      home.handycap.gc += match.away_score;
      away.handycap.gp += match.away_score;
      away.handycap.gc += match.home_score;

      const result = this.resultOfMatch(match);
      
      if (result === WIN_HOME) {
        home.handycap.wins += 1;
        away.handycap.losts += 1;
      }
      if (result === WIN_AWAY) {
        away.handycap.wins += 1;
        home.handycap.losts += 1;
      }
      if (result === DRAW) {
        away.handycap.draws += 1;
        home.handycap.draws += 1;
      }


     
    }
    
    this.setState({ teams: teams });
  }

  processResults = () => {
    const matches = this.props.matches;
    for (let match of matches) {
      this.processMatch(match);
    }
  }

  processMatch = (match) => {
    if (this.state.teams) {
      let home = this.state.teams.find(k => k.id == match.home_team);
      let away = this.state.teams.find(k => k.id == match.away_team);
      const result = this.resultOfMatch(match);

      if (result === WIN_HOME) {

      }
      if (result === WIN_AWAY) {

      }
      if (result === DRAW) {

      }
    }



  }
  resultOfMatch = (match) => {

    if (match.home_score > match.away_score) {
      return WIN_HOME;
    }
    if (match.home_score < match.away_score) {
      return WIN_AWAY;
    }
    if (match.home_score === match.away_score) {
      return DRAW;
    }
  }
  renderTeams = () => {
    const matches = this.props.matches;
    let teams = [];
    for (let match of matches) {

      let home = teams.find(k => k.id == match.home_team);
      let away = teams.find(k => k.id == match.away_team);

      if (home === undefined) {
        teams.push({ id: match.home_team, handycap: { plays: 1 } })

      } else {

      }
      if (away === undefined) {
        teams.push({ id: match.away_team, handycap: { plays: 1 } })
      } else {

      }



    }
    



    return (<h1>Olar</h1>)
  }


  render() {
    return (this.renderTeams())
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
export default connect(mapStateToProps, {

})(injectIntl(withRouter(withFirebase(muiThemeable()(Classification)))));
