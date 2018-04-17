import React, { Component } from 'react';
import { Activity } from 'rmw-shell'
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import {matchesFetch, matchesInitialCreate } from '../../store/actions/bolaoActions'
import FlatButton from "material-ui/FlatButton";
import data from '../../world-cup'

class Test extends Component {
    componentDidMount() {
        //this.props.matchesFetch(this.props.auth.uid);
    }

        
    handlerInitialState = ( ) =>{
                
        this.props.matchesInitialCreate(data);
    }
    handlerLoadState = () =>{
        
        this.props.matchesFetch();
    }
    handlerGetMatchesFromGroup = (group) =>{

        this.props.getMatchesFromGroup('a');
    }
    render() {
       
        return (
            <Activity
            ><h1>Testing</h1>
        <FlatButton
          label={"Load Data to Firebase"}
          primary={true}
          onClick={this.handlerInitialState.bind(this)}
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

export default connect(mapStateToProps,{matchesFetch, matchesInitialCreate }

)(injectIntl(withRouter(withFirebase(muiThemeable()(Test)))));

