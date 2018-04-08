import React, { Component } from 'react';
import { Activity } from 'rmw-shell'
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import {matchesFetch, matchesInitialCreate} from '../../store/actions/bolaoActions'
import FlatButton from "material-ui/FlatButton";
import data from '../../world-cup'


class Test extends Component {
    componentDidMount() {
        //this.props.matchesFetch(this.props.auth.uid);
    }
    
    handlerInitialState = ( matches) =>{
        const newMatches = {
            
            
                groups:data.groups,
                knockout:data.knockout
            
        }
        this.props.matchesInitialCreate(newMatches);
    }
    handlerLoadState = (user) =>{
        
        this.props.matchesFetch(user);
    }
 
    render() {
        return (
            <Activity
            ><h1>Testing</h1>
        <FlatButton
          label={"Test"}
          primary={true}
          onClick={this.handlerInitialState.bind(this, this.props.playerDataReducer.matches)}
        />
             <FlatButton
          label={"Load"}
          primary={true}
          onClick={this.handlerLoadState.bind(this )}
        />               
            </Activity>
        
        )
    }
}

const mapStateToProps = state => {
    const { intl, dialogs, auth, playerDataReducer } = state;
    
    return {
        intl,
        dialogs,
        auth,
        playerDataReducer: playerDataReducer,
    };
};

export default connect(mapStateToProps,{matchesFetch, matchesInitialCreate}

)(injectIntl(withRouter(withFirebase(muiThemeable()(Test)))));

