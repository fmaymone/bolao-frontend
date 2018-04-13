import React, { Component } from 'react';
import TestList from '../../components/Match/TestList';
import BetForm from '../../components/Forms/BetForm';
import { Activity } from 'rmw-shell';
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import MatchesLoader from './MatchesLoader';
import MatchList from '../../components/Match/MatchList';
import ClassificationBuilder from './ClassificationBuilder';
import FlatButton from "material-ui/FlatButton";
import { matchesFetch, changeStage } from "../../store/actions/bolaoActions";
import { Container, Row, Col } from "react-grid-system";
import { GROUPS_STAGE, KNOCKOUT_STAGE } from "../../store/actions/types";

const groups = ['round_16', 'round_8', 'round_4', 'round2_loser', 'round2_winner'];

class KnockoutBuilder extends Component {

    nextGroup = () => {
        const { changeStage, playerDataReducer } = this.props;

        let newGroupValue = { currentGroup: 'round_16', currentPhase: KNOCKOUT_STAGE };
        let tempGroup;
        if (playerDataReducer.currentGroup === 'round2_winner') {
            tempGroup = 'round_16';
        } else {
            tempGroup = groups[groups.indexOf(playerDataReducer.currentGroup) + 1];
        }
        newGroupValue.currentGroup = tempGroup;
        changeStage(newGroupValue);


    };

    prevGroup = () => {
        const { changeStage, playerDataReducer } = this.props;

        let newGroupValue = { currentGroup: 'a', currentPhase: KNOCKOUT_STAGE };
        let tempGroup;
        if (playerDataReducer.currentGroup === 'round_16') {
            tempGroup = 'round2_winner';
        } else {
            tempGroup = groups[groups.indexOf(playerDataReducer.currentGroup) - 1];
        }
        newGroupValue.currentGroup = tempGroup;
        changeStage(newGroupValue);

    };

    groupsControls() {
        return (
            <div>
                <FlatButton
                    label={"< Anterior"}
                    primary={true}
                    onClick={this.prevGroup.bind(this)}
                />
                <FlatButton
                    label={"Proximo >"}
                    primary={true}
                    onClick={this.nextGroup.bind(this)}
                />
            </div>
        )
    }

    render() {
        const currentGroup = this.props.playerDataReducer.currentGroup;
        const { intl } = this.props
        return (
            <div>
               <Row><Col  md={12}> <MatchList matches={this.props.matches} stage={this.props.playerDataReducer} title={intl.formatMessage({ id: currentGroup })} /></Col></Row>
               <Row><Col  md={8} offset={{ md: 2 }} ><div>{this.groupsControls()}</div></Col></Row>
               {/* <Row>
                    <Col  md={8} offset={{ md: 2 }}><ClassificationBuilder matches={this.props.matches} group={currentGroup} /></Col>
                </Row> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { intl, dialogs, auth, playerDataReducer, lists } = state;

    return {
        intl,
        dialogs,
        auth,
        playerDataReducer: playerDataReducer

    };
};

export default connect(mapStateToProps, { matchesFetch, changeStage })(
    injectIntl(withRouter(withFirebase(muiThemeable()(KnockoutBuilder))))
);

