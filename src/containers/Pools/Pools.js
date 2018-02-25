import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { injectIntl } from 'react-intl'
import { Activity } from 'rmw-shell'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import FontIcon from 'material-ui/FontIcon'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { withRouter } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import { withFirebase } from 'firekit-provider'
import isGranted from 'rmw-shell/lib/utils/auth'
import Scrollbar from 'rmw-shell/lib/components/Scrollbar/Scrollbar'

class Pools extends Component {
  componentDidMount () {
    const { watchList, firebaseApp } = this.props

    let ref = firebaseApp.database().ref('pools').limitToFirst(20)

    watchList(ref)
  }

  renderList (pools) {
    const { history } = this.props

    if (pools === undefined) {
      return <div />
    }

    return pools.map((pool, index) => {
      return <div key={index}>
        <ListItem
          leftAvatar={
            <Avatar
              src={pool.val.photoURL}
              alt='bussines'
              icon={
                <FontIcon className='material-icons'>
                  business
                </FontIcon>
              }
            />
          }
          key={index}
          primaryText={pool.val.name}
          secondaryText={pool.val.full_name}
          onClick={() => { history.push(`/pools/edit/${pool.key}`) }}
          id={index}
        />
        <Divider inset />
      </div>
    })
  }

  render () {
    const { intl, pools, muiTheme, history, isGranted } = this.props

    return (
      <Activity
        isLoading={pools === undefined}
        containerStyle={{ overflow: 'hidden' }}
        title={intl.formatMessage({ id: 'pools' })}>

        <Scrollbar>

          <div style={{ overflow: 'none', backgroundColor: muiTheme.palette.convasColor }}>
            <List id='test' style={{ height: '100%' }} ref={(field) => { this.list = field }}>
              {this.renderList(pools)}
            </List>
          </div>

          <div style={{ position: 'fixed', right: 18, zIndex: 3, bottom: 18 }}>
            {
              isGranted('create_pool') &&
              <FloatingActionButton secondary onClick={() => { history.push(`/pools/create`) }} style={{ zIndex: 3 }}>
                <FontIcon className='material-icons' >add</FontIcon>
              </FloatingActionButton>
            }
          </div>
        </Scrollbar>
      </Activity>
    )
  }
}

Pools.propTypes = {
  pools: PropTypes.array,
  history: PropTypes.object,
  isGranted: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { auth, browser, lists } = state

  return {
    pools: lists.pools,
    auth,
    browser,
    isGranted: grant => isGranted(state, grant)
  }
}

export default connect(
  mapStateToProps
)(injectIntl(muiThemeable()(withRouter(withFirebase(Pools)))))
