import React, { Component } from 'react';
import TestList from '../../components/Match/TestList'
import MatchList from '../../components/Match/MatchList'
import BetForm from '../../components/Forms/BetForm'
import { Activity } from 'rmw-shell'



class Test extends Component {
    state = {
        bets: ''
    }

    submit = values => {
        // print the form values to the console
        console.log(values)
    }
    render() {
        return (
            <Activity><MatchList /></Activity>
        
        )
    }
}

export default Test

