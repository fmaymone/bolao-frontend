import React, { Component } from 'react';
import { Activity } from 'rmw-shell'
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import {matchesFetch, matchesInitialCreate} from '../../store/actions/bolaoActions'



class Test extends Component {
    componentWillMount() {
        this.props.matchesFetch();
    }
 
 
    render() {
        return (
            <Activity
            ><h1>Testing</h1>
            <div>{this.props.matchesInitialCreate(this.props.auth.uid, this.props.playerDataReducer.matches)}</div>
            <div>{this.props.matchesFetch(this.props.auth.uid)}</div>
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

