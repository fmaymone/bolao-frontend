import React, { Component } from 'react';
import TestList from '../../components/Match/TestList'
import GroupsMatchList from '../../components/Match/GroupsMatchList'
import BetForm from '../../components/Forms/BetForm'
import { Activity } from 'rmw-shell'



class MatchesController extends Component {
    state = {
        bets: ''
    }

    submit = values => {
        // print the form values to the console
        console.log(values)
    }
    render() {
        return (
            <Activity><GroupsMatchList /></Activity>
        
        )
    }
}

export default MatchesController

