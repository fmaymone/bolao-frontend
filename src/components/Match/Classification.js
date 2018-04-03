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

  
  resultOfMatch = (match) =>{

    if(match.home_score > match.away_score){
      return WIN_HOME;
    }
    if(match.home_score < match.away_score){
      return WIN_AWAY;
    }
    if(match.home_score > match.away_score){
      return DRAW;
    }
  }
  renderTeams = () => {
    const matches = this.props.matches;
    let teams = [];
    for(let match of matches){
      
      let home = teams.find(k => k.id ==match.home_team);
      let away = teams.find(k => k.id ==match.away_team);
      
      if(home === undefined){
        teams.push({id:match.home_team, handycap:{plays:1}})       
      }else{
        
      }
      if(away === undefined){
        teams.push({id:match.away_team, handycap:{plays:1}}) 
      }else{
        
      }

     

    }
    console.log(teams);
    


    return (<h1>Olar</h1>)
  }


  render() {
    return this.renderTeams();
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
