import React, { Component } from 'react';
import { Activity } from 'rmw-shell'
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import GroupsBuilder from './GroupsBuilder';
import { GROUPS_STAGE, KNOCKOUT_STAGE } from '../../store/actions/types';
import MatchList from '../../components/Match/MatchList';




class MatchesBuilder extends Component {
    state = {
        matches: ''
    }




    renderGroupsStage() {
        return (<GroupsBuilder stage={this.props.playerDataReducer} />)

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

export default connect(mapStateToProps

)(injectIntl(withRouter(withFirebase(muiThemeable()(MatchesBuilder)))));

