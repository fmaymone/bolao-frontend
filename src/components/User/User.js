import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import { ListItem } from "material-ui/List";
import FontIcon from "material-ui/FontIcon";

class User extends Component {
  render() {
    const { user } = this.props;
    if (user) {
      return (
        <div key={user.uid}>
          <ListItem
            leftAvatar={
              <Avatar
                src={user.photoURL}
                alt="bussines"
                icon={<FontIcon className="material-icons">business</FontIcon>}
              />
            }
            key={user.uid}
            primaryText={user.displayName}
            id={user.uid}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default User;
