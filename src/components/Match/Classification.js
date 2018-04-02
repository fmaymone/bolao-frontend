import React, { Component } from "react";
import { injectIntl, intlShape } from "react-intl";
import isGranted from "rmw-shell/lib/utils/auth";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import muiThemeable from "material-ui/styles/muiThemeable";

class Classification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: {}
    };
  }

  componentDidMount () {
    const { watchList, firebaseApp, auth } = this.props;
    let ref = firebaseApp.database().ref("/users/" + auth.uid + "/bets/") 
    watchList(ref)
  }


  calculateClassification = () => {
    this.props.matches.map(match => this.addMatchToState(match));
  };

  addMatchToState = async match => {
    const { firebaseApp, auth } = this.props;
    let ref = await firebaseApp
      .database()
      .ref("/users/" + auth.uid + "/bets/" + match.name);
    ref.on("value", dataSnapshot => {
      if (dataSnapshot.val()) {
        const matchTemp = dataSnapshot.val();
        this.setState({
          matches: { id: matchTemp.name, match: { matchTemp } }
        });
      }
    });
  };

  isTeamAlreadyCalculated(id) {
    let keys = Object.keys(this.state.matches);
    if (id in keys) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const matches = this.props.matches;

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
