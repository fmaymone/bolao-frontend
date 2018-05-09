import React, { Component } from 'react';

import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { withFirebase } from 'firekit-provider'

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        height: 450,
        overflowY: 'auto',
    },
};

class PoolList extends Component {

    render() {
        const pools = this.props.pools;
        const { history } = this.props
        return (<div style={styles.root}>
            <GridList
                cellHeight={180}
                style={styles.gridList}
            >
                <Subheader>Pools</Subheader>
                {pools.map((pool) => (
                    <GridTile
                        key={pool.key}
                        title={pool.val.name}
                        subtitle={<span>by <b>{pool.val.userName}</b></span>}
                        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                        // onClick={() => { history.push(`/pools/show/${pool.key}`) }}
                        onClick={() => {
                            history.push({
                                pathname: `/pools/show/${pool.key}`,
                                state: { userOfPool: this.props.user }
                              })
                        }}
                    >

                    
                        <img src={pool.val.photoURL} />
                    </GridTile>
                ))}
            </GridList>
        </div>)
    }
}
const mapStateToProps = (state) => {
    //const { auth, browser, lists } = state
  
    return {
     
    }
  }
export default connect(
    mapStateToProps
  )(injectIntl(muiThemeable()(withRouter(withFirebase(PoolList)))))
