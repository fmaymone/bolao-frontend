import React, { Component } from "react";
import { Activity } from "rmw-shell";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import usersData from "../Pools/users";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
    };
  }

  render() {
    const { pools, auth, pool } = this.props;
    console.log(usersData);
    return <Activity>Hello</Activity>;
  }
}

const mapStateToProps = (state) => {
  const { intl, dialogs, auth, playerDataReducer, lists, history } = state;

  return {
    intl,
    dialogs,
    auth,
    playerDataReducer: playerDataReducer,
    pools: lists.pools,
  };
};
export default connect(mapStateToProps)(
  injectIntl(muiThemeable()(withRouter(withFirebase(Test))))
);
