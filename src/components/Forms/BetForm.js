import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import { SuperSelectField } from 'rmw-shell/lib/components/ReduxFormFields'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'

class BetForm extends Component {

  render() {

    const { handleSubmit, handleChange, intl , matches} = this.props
    
    return (
      <form onSubmit={handleSubmit} onChange={handleChange}>
        
        <FlatButton
          label={intl.formatMessage({ id: 'submit' })}
          type='submit'
          primary
        //disabled={!initialized}
        />

      </form>

    )
  } 
}
const mapStateToProps = state => {
  const { intl, lists } = state

  return {
    intl,
    users: lists.users
  }
}

BetForm = reduxForm({
  // a unique name for the form
  form: 'bets'
})(BetForm)



export default connect(
  mapStateToProps
)(injectIntl(BetForm))