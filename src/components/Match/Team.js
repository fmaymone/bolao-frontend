import React, { Component } from "react";
import Paper from "material-ui/Paper";
//import Flag from "react-flags";
import Flag from "react-world-flags";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import muiThemeable from 'material-ui/styles/muiThemeable'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'

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
  renderHomeTeam = (team) => {

    return (<div >
      
      <Flag code={team.iso2} height="16" />
      {team.name}
    </div>)
  }

  renderAwayTeam = (team) => {

    return (<div >
      {team.name}
      <Flag code={team.iso2} height="16" />
    </div>)
  }
  render() {
    const isHomeTeam = this.props.home;
    const teamEntity = this.props.worldCupData.teams[0]
    if (teamEntity) {
      if (isHomeTeam) {
        return this.renderHomeTeam(teamEntity)
      } else {
        return this.renderAwayTeam(teamEntity)
      }
    } else {
      return ('Olar')
    }
  }
}

const styles = {

};
const mapStateToProps = (state) => {
  const { auth, browser, lists, worldCupData } = state

  return {
    worldCupData: worldCupData
  }
}

export default connect(
  mapStateToProps
)(injectIntl(muiThemeable()(withRouter((Team)))))

Team.propTypes = {
  name: PropTypes.string,
  code: PropTypes.string,
  home: PropTypes.boolean
};
