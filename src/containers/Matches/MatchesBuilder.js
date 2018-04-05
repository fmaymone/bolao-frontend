import React, { Component } from 'react';
import { Activity } from 'rmw-shell'
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import GroupsBuilder from './GroupsBuilder'
import { GROUPS_STAGE, KNOCKOUT_STAGE } from '../../store/actions/types'
import MatchList from '../../components/Match/MatchList'



class MatchesBuilder extends Component {
    state = {
        matches: ''
    }

    getActualValues = async () => {

        const { firebaseApp, auth } = this.props;
        let ref = await firebaseApp.database().ref('/users/' + auth.uid + '/bets/');
        await ref.on('value', (dataSnapshot) => {

            if (dataSnapshot.val()) {
                console.log(dataSnapshot.val());
                this.setState({ matches: dataSnapshot.val() })
            }
        });
    }

    renderGroupsStage() {
        return (<GroupsBuilder stage={this.props.playerDataReducer} />)

    }
    renderKnockoutStage() {
       // return (<h1>GroupsStage</h1>)
       return (<MatchList />)

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

