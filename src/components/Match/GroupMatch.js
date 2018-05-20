import React, { Component } from "react";
import { connect } from "react-redux";
import Team from "./Team";
import { Row, Col } from "react-grid-system";
import TextField from "material-ui/TextField";

const styles = {
  container: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "aquamarine1"
  },
  team_home: {
    justifyContent: "flex-start",
    display: "flex",
    flexFlow: "row nowrap",
    backgroundColor: "aquamarine1"
  },
  inputs: {
    justifyContent: "center",
    display: "flex",
    flexFlow: "row nowrap",
    backgroundColor: "brown3"
  },
  team_away: {
    justifyContent: "flex-end",
    display: "flex",
    flexFlow: "row nowrap",
    backgroundColor: "chartreuse1"
  }
};
class GroupMatch extends Component {
  renderMatch = () => {
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-around",
          alignItems: "center",
          margin: 10
        }}
      >
        <div style={{  flex: 1 }}>
          <div
            style={{
              justifyContent: "flex-start",
              display: "flex",
              flexFlow: "row nowrap"
            }}
          >
            <Team
              id={this.props.game.home_team}
              isHomeTeam="true"
              style={styles.team_home}
            />
          </div>
        </div>
        <div style={{  flex: 1 }}>
          <div
            style={{
              justifyContent: "space-around",
              display: "flex",
              flexFlow: "row nowrap",
              alignItems: 'center'
            }}
          >
            <div  style={{width: 3}}>
              
              <TextField
                id={`${this.props.game.home_team}_home`}
                type="number"
                disabled={this.props.finishedTimeToBet}
                value={this.props.game.home_result}
                onChange={(e, game, type) =>
                  this.props.handleChangedResult(e, this.props.game, "home")
                }
                underlineShow = {false}
                
              />
            </div>
            <div>x</div>
            <div  style={{width: 3}}>
              
              <TextField
                id={`${this.props.game.home_team}_away`}
                type="number"
                disabled={this.props.finishedTimeToBet}
                value={this.props.game.away_result}
                onChange={(e, game, type) =>
                  this.props.handleChangedResult(e, this.props.game, "away")
                }
                underlineShow = {false}
              />
              
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              justifyContent: "flex-end",
              display: "flex",
              flexFlow: "row nowrap",
              
            }}
          >
            <Team id={this.props.game.away_team} isHomeTeam="false" />
          </div>
        </div>
      </div>
      // <div key={this.props.game.name} style={styles.container}>
      //   <div style={styles.team_home}>
      //     <Team
      //       id={this.props.game.home_team}
      //       isHomeTeam="true"
      //       style={styles.team_home}
      //     />
      //   </div>
      //   <div style={styles.inputs}>
      //     <div>
      //       <TextField
      //         id={`${this.props.game.home_team}_home`}
      //         type="number"
      //         disabled={this.props.finishedTimeToBet}
      //         value={this.props.game.home_result}
      //         onChange={(e, game, type) =>
      //           this.props.handleChangedResult(e, this.props.game, "home")
      //         }
      //       />
      //     </div>
      //     <div>X</div>
      //     <div>
      //       <TextField
      //         id={`${this.props.game.home_team}_away`}
      //         type="number"
      //         disabled={this.props.finishedTimeToBet}
      //         value={this.props.game.away_result}
      //         onChange={(e, game, type) =>
      //           this.props.handleChangedResult(e, this.props.game, "away")
      //         }
      //       />
      //     </div>
      //   </div>
      //   <div style={styles.team_away}>
      //     <Team id={this.props.game.away_team} isHomeTeam="false" />
      //   </div>
      // </div>
    );
  };

  render() {
    const { game } = this.props;

    if (game.type === "group") {
      return this.renderMatch();
    } else {
      return <div />;
    }
  }
}

export default GroupMatch;
