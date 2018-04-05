import React, { Component } from 'react';
import TestList from '../../components/Match/TestList'
import BetForm from '../../components/Forms/BetForm'
import { Activity } from 'rmw-shell'
import MatchesLoader from './MatchesLoader'

class GroupsBuilder extends Component {
        
    render() {
        return (
            <Activity><MatchesLoader stage={this.props.stage}/></Activity>
        
        )
    }
}

export default GroupsBuilder

