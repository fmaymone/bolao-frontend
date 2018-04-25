import React from "react";
import PropTypes from "prop-types";
import Avatar from "material-ui/Avatar";
import {  ListItem } from "material-ui/List";
import FontIcon from "material-ui/FontIcon";

const User = ({ props }) => (
    
    <div key={props.user.uid}>
          <ListItem
            leftAvatar={
              <Avatar
                src={props.user.val.photoURL}
                alt="bussines"
                icon={<FontIcon className="material-icons">business</FontIcon>}
              />
            }
            key={props.user.uid}
            primaryText={props.user.val.displayName}
            id={props.user.uid}
            //secondaryText={user.val.full_name}
           // onClick={ () => this.handleAddUserToPool(user.val.uid)}
               //this.props.addUserToPool(this.props.pool, user.val.userId);
            
          />
          
    </div>
  
);

export default User;

