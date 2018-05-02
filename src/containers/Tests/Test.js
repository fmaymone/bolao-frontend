import React, { Component } from 'react';
import { Activity } from 'rmw-shell'
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import {matchesFetch, matchesInitialCreate } from '../../store/actions/bolaoActions'
import FlatButton from "material-ui/FlatButton";
import data from '../../world-cup';
import Pool from '../../components/Pool/Pool';
import PoolList from '../../components/Pool/PoolList';

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
            ><PoolList pools={this.props.pools} history={this.props.history} />
            
                    
            </Activity>
        
        )
    }
}

const mapStateToProps = state => {
    const { intl, dialogs, auth, playerDataReducer, lists, history } = state;
    
    return {
        intl,
        dialogs,
        auth,
        playerDataReducer: playerDataReducer,
        pools: lists.pools,
        
    };
};
export default connect(
    mapStateToProps
  )(injectIntl(muiThemeable()(withRouter(withFirebase(Test)))))




