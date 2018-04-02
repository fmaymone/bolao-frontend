import React, { Component } from 'react';

class Classification extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            first: {team: 0, points:0 },
            second:{team: 0, points:0 },
            third: {team: 0, points:0 },
            fourth: {team: 0, points:0 }
         }
    }
    componentWillMount(){

        this.initializeTeams()
    }
    
    initializeTeams(){
        //first match. So we get the away and home and set the teams
        this.setState({first: 
            {team: this.props.matches[0].home_team,
                points:0
        
        }})
        this.setState({first: 
            {team: this.props.matches[0].away_team,
                points:0
        
        }})

    }

    calculatePointsMatch(){}
    render() { 
    
    //matches = this.props.matches;
        
    return (  <h1>Olar</h1>)
    }
}
 
export default Classification;