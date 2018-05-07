import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import { Container, Row, Col } from "react-grid-system";
import Users from "../Users/Users";
import User from "../Users/User";
import { List, ListItem } from "material-ui/List";
import {
  addUserToPool,
  fetchUserData,
  removeUserOfPool,
  addUserPools,
  removeUserPools
} from "../../store/actions/bolaoActions";
import BounceLoader from "react-spinners";
import Loader from "../../components/UI/Loader";

const style = {
  container: {
    position: "relative"
  },
  refresh: {
    display: "inline-block",
    position: "relative"
  }
};

class UsersOfPool extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = async (user, mode) => {
    const uid = this.props.match.params.uid;
    if (mode === "add") {
      await this.addUserToPool(user, uid);
    } else {
      await this.removeUserOfPool(user, uid);
    }
  };

  addUserToPool = async (user, pool) => {
    await this.props.addUserToPool(user, pool);
    await this.props.addUserPools(user, pool);
  };
  removeUserOfPool = async (user, pool) => {
    await this.props.removeUserOfPool(user, pool);
    await this.props.removeUserPools(user, pool);
  };

  renderList = users => {
    if (users === undefined) {
      return <div />;
    }
    let objects = [];
    let keys = Object.keys(users);
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
     return <User userKey={element} handleClick={this.handleClick} mode='delete'/>;
     
    }

    
  };

  render() {
    if (this.props.pool === undefined) {
      return <Loader />;
    } else {
      return (
        <List
          id="test"
          style={{ height: "100%" }}
          ref={field => {
            this.list = field;
          }}
        >
          {this.renderList(this.props.pool.val.users)}
        </List>
      );
    }
  }
}

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, {
  addUserToPool,
  fetchUserData,
  removeUserOfPool,
  addUserPools,
  removeUserPools
})(injectIntl(withRouter(withFirebase(muiThemeable()(UsersOfPool)))));
