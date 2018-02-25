import React, { Component } from "react";
import Team from "../../components/Team";
import Match from "../../components/Match";
import { Activity } from "rmw-shell";
import { injectIntl, intlShape } from "react-intl";
import { withFirebase } from "firekit-provider";
import muiThemeable from "material-ui/styles/muiThemeable";
import { connect } from "react-redux";




class Bets extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //   findTeamById = (id) = {

  //     console.log(id);
  //   }

  findTeamById(id) {
    const  wcData  = this.props.worldCupData;

    return wcData.teams.find(item => item.id === id);
  }
  renderMatches(listMatches) {
    if (listMatches === undefined) {
      return <div />;
    }
    return listMatches.listMatches.matches.map((match, index) => {
      const home = this.findTeamById(match.home_team);
      const away = this.findTeamById(match.away_team);

      return (
        <div key={index}>
          <Match name={match.name} home={home} away={away} />
        </div>
      );
    });
  }
  render() {
    const { muiTheme, intl, providers, worldCupData } = this.props;
    const group = "a";
    const listMatches = worldCupData.groups.find(item => item.id === "a");
    const homeTeam = worldCupData.teams.find(item => item.id === 14);
    const awayTeam = worldCupData.teams.find(item => item.id === 15);

    return (
      <Activity title={intl.formatMessage({ id: "bets" })}>
        {this.renderMatches({ listMatches })}
      </Activity>
    );
  }
}
const mapStateToProps = state => {
  return {
    worldCupData: state.worldCupData
  };
};
export default connect(mapStateToProps)(
  injectIntl(muiThemeable()(withFirebase(Bets)))
);
