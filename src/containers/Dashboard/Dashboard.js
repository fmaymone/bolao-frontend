import React, { Component } from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import { injectIntl, intlShape } from 'react-intl'
import { GitHubIcon } from 'rmw-shell/lib/components/Icons'
import { Activity } from 'rmw-shell'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { Line, Bar } from 'react-chartjs-2'
import { withFirebase } from 'firekit-provider'
import CountUp from 'react-countup'
import FontIcon from 'material-ui/FontIcon'
import ReactEcharts from 'echarts-for-react'

const currentYear = new Date().getFullYear()
const daysPath = `/user_registrations_per_day/${currentYear}/${new Date().toISOString().slice(5, 7)}`
const monthsPath = `/user_registrations_per_month/${currentYear}`
const providerPath = `/provider_count`

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
          <div style={{ flexGrow: 1, flexShrink: 1, maxWidth: 600 }}>
            <h1>H1 Normal</h1>
          </div>
          <div style={{ flexGrow: 1, flexShrink: 1, maxWidth: 600 }}>
            <h1>H1 Normal</h1>
          </div>
          <div style={{ flexGrow: 1, flexShrink: 1, maxWidth: 600 }}>
            <h1>H1 Normal</h1>
          </div>
          <div style={{ flexGrow: 1, flexShrink: 1, maxWidth: 600 }}>
            <h1>H1 Normal</h1>
          </div>
          <div style={{ flexGrow: 1, flexShrink: 1, maxWidth: 600 }}>
            <h1>H1 Normal</h1>
          </div>
          <div style={{ flexGrow: 1, flexShrink: 1, maxWidth: 600 }}>
            <h1>H1 Normal</h1>
          </div>
          <div style={{ flexGrow: 1, flexShrink: 1, maxWidth: 600 }}>
            <h1>H1 Normal</h1>
          </div>
          <div style={{ flexGrow: 1, flexShrink: 1, maxWidth: 600 }}>
            <h1>H1 Normal</h1>
          </div>

          <div style={{ flexGrow: 1, flexShrink: 1, maxWidth: 600 }}>
            
          </div>

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
    days: paths[daysPath],
    months: paths[monthsPath],
    providers: paths[providerPath],
    usersCount: paths['users_count'] ? paths['users_count'] : 0
  }
}

export default connect(
  mapStateToProps
)(injectIntl(muiThemeable()(withFirebase(Dashboard))))
