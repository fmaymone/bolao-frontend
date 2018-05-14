import React, { Component } from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import { injectIntl, intlShape } from 'react-intl'
import { GitHubIcon } from 'rmw-shell/lib/components/Icons'
import { Activity } from 'rmw-shell'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { Line, Bar } from 'react-chartjs-2'
import { withFirebase } from 'firekit-provider'
import PoolStepper from '../Pools/PoolStepper';



class Dashboard extends Component {


  render () {
    
    const {intl} = this.props;
    return (
      <Activity
        iconElementRight={
          <div></div>
          // <FlatButton
          //   style={{ marginTop: 4 }}
          //   href='https://github.com/TarikHuber/react-most-wanted'
          //   target='_blank'
          //   rel='noopener'
          //   secondary
          //   icon={<GitHubIcon />}
          // />
        }
        title={intl.formatMessage({ id: 'dashboard' })} >

        <div style={{ margin: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
          <PoolStepper />

        </div>

        <br />
        

      </Activity >
    )
  }
}

Dashboard.propTypes = {
  intl: intlShape.isRequired
}

const mapStateToProps = (state) => {
  const { paths } = state

  return {
   
  }
}

export default connect(
  mapStateToProps
)(injectIntl(muiThemeable()(withFirebase(Dashboard))))
