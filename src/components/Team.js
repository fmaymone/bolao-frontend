import React, { Component } from "react";
import Paper from "material-ui/Paper";
//import Flag from "react-flags";
import Flag from "react-world-flags";
import PropTypes from 'prop-types';
const style = {
  margin: 20,
  textAlign: "center",
  display: "inline-block"
};

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const isHomeTeam = this.props.home;

    return (
      <div>
        
          {isHomeTeam ? (
            <div style={styles.teamContainer}>
              <div style={styles.teamFlag}>
                <Flag code={this.props.team.iso2} height="16" />
              </div>
              <div style={styles.teamName}>{this.props.team.name}</div>
              
            </div>
          ) : (
            <div style={styles.teamContainer}>
              <div style={styles.teamName}>{this.props.team.name}</div>
              <div style={styles.teamFlag}>
                <Flag code={this.props.team.iso2} height="16" />
              </div>
            </div>
          )}
        
      </div>
    );
  }
}

const styles = {
  teamContainer: {
    margin: 5,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
   // display: "inline-block"
   //backgroundColor: "yellow"
  },
  teamName: {
    margin: 5,
    //backgroundColor: "#FF0000"
  },
  teamFlag: {
    alignItems: "center",
    //backgroundColor: "blue",
    textAlign: "center",
    
  }
};


export default Team;

Team.propTypes = {
    name: PropTypes.string,
    code: PropTypes.string,
    home: PropTypes.boolean
  };
