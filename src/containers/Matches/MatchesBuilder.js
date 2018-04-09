import React, { Component } from 'react';
import { Activity } from 'rmw-shell'
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
<<<<<<< HEAD
import GroupsBuilder from './GroupsBuilder';
import { GROUPS_STAGE, KNOCKOUT_STAGE } from '../../store/actions/types';
import MatchList from '../../components/Match/MatchList';

=======
import GroupsBuilder from './GroupsBuilder'
import { GROUPS_STAGE, KNOCKOUT_STAGE } from '../../store/actions/types'
import MatchList from '../../components/Match/MatchList'
import {matchesFetch} from '../../store/actions/bolaoActions'
>>>>>>> refactor



class MatchesBuilder extends Component {
    state = {
        matches: ''
    }
   filterFromGroup = (value) => {
        
    return value.group == this.props.playerDataReducer.currentGroup;
   }
    getMatchesFromGroup = () => {
        
        const group = this.props.playerDataReducer.currentGroup;
        const matches = this.props.playerDataReducer.matches.matches.filter(this.filterFromGroup);
        return matches;

    }


    renderGroupsStage() {
        return (<GroupsBuilder matches={this.getMatchesFromGroup()} />)

    }
    renderKnockoutStage() {
<<<<<<< HEAD
         return (<h1>Knockout</h1>)
=======
         return (<h1>Knockout Stage</h1>)
>>>>>>> refactor
        

    }
    render() {

        let type = this.props.playerDataReducer.currentPhase === GROUPS_STAGE ? this.renderGroupsStage() : this.renderKnockoutStage()

        return (
            <Activity>{type}</Activity>

        )
    }
}

const mapStateToProps = state => {
    const { intl, dialogs, auth, playerDataReducer } = state;

    return {
        intl,
        dialogs,
        auth,
        playerDataReducer: playerDataReducer
    };
};

export default connect(mapStateToProps, {matchesFetch}

)(injectIntl(withRouter(withFirebase(muiThemeable()(MatchesBuilder)))));
