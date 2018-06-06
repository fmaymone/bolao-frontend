import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import {  ListItem } from "material-ui/List";
import FontIcon from "material-ui/FontIcon";

class User extends Component {
 
  render() { 
    const {user} = this.props;
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
              //secondaryText={user.val.full_name}
             // onClick={ () => this.handleAddUserToPool(user.val.uid)}
                 //this.props.addUserToPool(this.props.pool, user.val.userId);
              
            />
            
      </div>
     )
  }
}
 
export default User;


