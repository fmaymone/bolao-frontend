import React, { Component } from 'react';
import TestList from '../../components/Match/TestList'

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
            <Activity></Activity>
        
        )
    }
}

export default Test

