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

const groups = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

class GroupsBuilder extends Component {

    nextGroup = () => {
        const { changeStage, playerDataReducer } = this.props;

        let newGroupValue = { currentGroup: 'a', currentPhase: 'groups_stage' };
        let tempGroup;
        if (playerDataReducer.currentGroup === 'h') {
            tempGroup = 'a';
        } else {
            tempGroup = groups[groups.indexOf(playerDataReducer.currentGroup) + 1];
        }
        newGroupValue.currentGroup = tempGroup;
        changeStage(newGroupValue);


    };

    prevGroup = () => {
        const { changeStage, playerDataReducer } = this.props;

        let newGroupValue = { currentGroup: 'a', currentPhase: 'groups_stage' };
        let tempGroup;
        if (playerDataReducer.currentGroup === 'a') {
            tempGroup = 'h';
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
        return (
            <div>
                <Row><Col md={12}> <MatchList matches={this.props.matches} title={'Grupo ' + currentGroup.toUpperCase()} /></Col></Row>
                <Row><Col md={8} offset={{ md: 2 }} ><div>{this.groupsControls()}</div></Col></Row>
                <Row>
                    <Col md={8} offset={{ md: 2 }}><ClassificationBuilder matches={this.props.matches} stage={this.props.playerDataReducer} /></Col>
                </Row>
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
    injectIntl(withRouter(withFirebase(muiThemeable()(GroupsBuilder))))
);

