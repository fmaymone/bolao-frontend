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
import MatchesBuilder from '../Matches/MatchesBuilder';

class Test extends Component {

    constructor(props) {
        super(props);
        this.state = {
            matches: []
        }
    }
    
    componentDidMount() {
         const { firebaseApp, auth, watchList, pool } = this.props;
          //firebaseApp.database().ref(`/users/${auth.uid}/matches`);
         // let ref = firebaseApp.database().ref(`/pools/${pool.key}/users/${auth.uid}/`);
          //watchList(ref, "listMatches"); 
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
        const { pools, auth, pool } = this.props;
        
       
        return (
            // <Activity
            // ><PoolList pools={this.props.pools} history={this.props.history} />
            
                    
            // </Activity>
            <Activity>
                <MatchesBuilder pool={this.props.pools[0]} user={auth} />
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




