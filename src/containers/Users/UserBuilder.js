import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import muiThemeable from "material-ui/styles/muiThemeable";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import isGranted from "rmw-shell/lib/utils/auth";
import { addUserToPool, fetchUserData } from "../../store/actions/bolaoActions";

class UserBuilder extends Component {
  componentDidMount() {
    const { watchList, firebaseApp, auth } = this.props;

    let ref = firebaseApp.database().ref(`pools/${auth.uid}/users`);
    watchList(ref, "usersOfPool");
  }

  renderUser = () => {
    const user = this.props.users.find((k) => k.key === this.props.id);
    return <h1>{user.val.displayName}</h1>;
  };
  render() {
    if (this.props.id !== undefined) {
      return this.renderUser();
    } else {
      return <div></div>;
    }
  }
}

UserBuilder.propTypes = {
  users: PropTypes.array,
  history: PropTypes.object,
  isGranted: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { auth, browser, lists } = state;

  return {
    usersOfPool: lists.usersOfPool,
    auth,
    browser,
    isGranted: (grant) => isGranted(state, grant),
  };
};

export default connect(mapStateToProps, { addUserToPool, fetchUserData })(
  injectIntl(muiThemeable()(withRouter(withFirebase(UserBuilder))))
);
