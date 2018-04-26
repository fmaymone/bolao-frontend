import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import muiThemeable from "material-ui/styles/muiThemeable";
import { injectIntl } from "react-intl";
import { Activity } from "rmw-shell";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import FontIcon from "material-ui/FontIcon";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { withRouter } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import { withFirebase } from "firekit-provider";
import isGranted from "rmw-shell/lib/utils/auth";
import Scrollbar from "rmw-shell/lib/components/Scrollbar/Scrollbar";
import { addUserToPool, fetchUserData } from '../../store/actions/bolaoActions'
import User from '../../components/User/User'

class UserBuilder extends Component {
  componentDidMount() {
    const { watchList, firebaseApp , auth} = this.props;

    let ref = firebaseApp.database().ref(`pools/${auth.uid}/users`);
    watchList(ref, "usersOfPool"); 
  }

  renderUser = () =>{
    const user = this.props.users.find(k=>k.key == this.props.id)
    return (<h1>{user.val.displayName}</h1>)
  }
  render() {
    const { intl, users, muiTheme, history, isGranted } = this.props;

    if(this.props.id != undefined){

      return( this.renderUser() );
    }else{
      return (<div></div>)
    }

   
  
  }
}

UserBuilder.propTypes = {
  users: PropTypes.array,
  history: PropTypes.object,
  isGranted: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { auth, browser, lists } = state;

  return {
    usersOfPool: lists.usersOfPool,
    auth,
    browser,
    isGranted: grant => isGranted(state, grant)
  };
};

export default connect(mapStateToProps, {addUserToPool, fetchUserData})(
  injectIntl(muiThemeable()(withRouter(withFirebase(UserBuilder))))
);
