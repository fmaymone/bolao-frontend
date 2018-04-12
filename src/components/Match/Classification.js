import React, { Component } from "react";
import { injectIntl, intlShape } from "react-intl";
import isGranted from "rmw-shell/lib/utils/auth";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import muiThemeable from "material-ui/styles/muiThemeable";
import { Container, Row, Col } from "react-grid-system";
import Team from './Team'


class Classification extends Component {

  renderTeam = (team) => {
    <Team id = {team.id} />
  }

  render() {
    const classification = this.props.classification;
    
    return (<div>

      {classification.map(team => (
        <div key={team.id}>
          <Team id={team.id} />
        </div>
      ))}

    </div>
    
    
    )

      
    
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
