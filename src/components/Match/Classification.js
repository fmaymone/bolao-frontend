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
      classification: null,
      alo:null
    };
  }

  componentDidMount() {
    this.addMatchesToClassification().bind(this);
  }
  addMatchesToClassification = () => {
    const matches = this.props.matches;

    for (let match of matches) {
      this.addPointsToTeams(match).bind(this);
      console.log('ooooooooooooooooooooooooooooooo');
      console.log(this.state);
      console.log('ooooooooooooooooooooooooooooooo');
    }
  }
  addPointsToTeams = (match) => {
   //let classification = this.state.classification.slice()
   let homeTeam = { id: match.home_team, handycap:{plays:1,wins:1,losts:0,draws:0,gp:match.home_score,gc:match.away_score} }
   this.setState({classification:{homeTeam}});
   this.setState({alo:'Olar'});

    switch (this.computeResult(match)) {



      case WIN_HOME:
        let homeTeam = {};
        let awayTeam = {};
        //if the team is not on state homeTeam will
        //be the new one
        if (!this.isTeamOnState(match.home_team)) {
          homeTeam = { id: match.home_team, handycap:{plays:1,wins:1,losts:0,draws:0,gp:match.home_score,gc:match.away_score} }
          //let classification = this.state.classification.slice()
          this.setState({classification:{homeTeam}});
          this.setState({alo:'Olar'});
          
          
        }

        break
      case WIN_AWAY:

        break
      case DRAW:

        break

    }

  }
  computeResult(match){

    if(match.home_score > match.away_score){
      return WIN_HOME;
    }
    if(match.home_score < match.away_score){
      return WIN_AWAY;
    }
    
      return DRAW;
    
  }
  getTeamFromState(id) {
    return this.state.classification.find(id);

  }

  isTeamOnState(id) {
    if(this.state.classification){
      var json = this.state.classification;
      id in json ? true : false
    }
    return false;
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
