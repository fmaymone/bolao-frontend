import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import { ListItem } from "material-ui/List";
import FontIcon from "material-ui/FontIcon";

class User extends Component {
  render() {
    const { user } = this.props;
    if (user) {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Avatar
            src={user.photoURL}
            alt=""
            icon={<FontIcon className="material-icons" />}
            referrerPolicy="no-referrer"
            size={32}
            style={{ margin: "0 auto" }}
          />
          <span
            style={{ marginTop: "4px", fontSize: "12px", textAlign: "center" }}
          >
            {user.displayName}
          </span>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default User;
