import React, { Component } from 'react';
import TestList from '../../components/Match/TestList';
import BetForm from '../../components/Forms/BetForm';
import { Activity } from 'rmw-shell';
import MatchesLoader from './MatchesLoader';
import MatchList from '../../components/Match/MatchList';
import ClassificationBuilder from './ClassificationBuilder';

class GroupsBuilder extends Component {

    render() {
        return (
            <Activity>
                <MatchList matches={this.props.matches}  />
                <ClassificationBuilder matches={this.props.matches} />
            </Activity>
        )
    }
}

export default GroupsBuilder

