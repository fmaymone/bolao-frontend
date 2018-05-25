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
import PoolThumbnail from './PoolThumbnail';
const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
       
        
        overflowY: 'auto',
    },
};

class PoolList extends Component {

    renderList = (filterPools) => {
        
        let objectsOfPool = [];
        for (let index = 0; index < filterPools.length; index++) {
            const element = filterPools[index];
            const object = this.props.pools.find(k => k.key === element);
            objectsOfPool.push(object);
        }

        return (
            <div style={styles.root}>
                <GridList
                    cellHeight={180}
                    style={styles.gridList}
                >
                    {objectsOfPool.map((pool) => (
                       <PoolThumbnail history={this.props.history} pool = {pool} user={this.props.user} pools={this.props.pools}/>
                    ))}
                </GridList>
            </div>
        )
    }
    renderAllPools = () => {
        //console.log(this.props);
        return (
            <div style={styles.root}>
                <GridList
                    cellHeight={180}
                    style={styles.gridList}
                >
                    {this.props.pools.map((pool) => (
                       <PoolThumbnail history={this.props.history} pool = {pool} user={this.props.user} pools={this.props.pools}/>
                    ))}
                </GridList>
            </div>
        )
    }

    render() {

        const { history, filterPools, pools } = this.props
        if (filterPools === undefined) {
            return this.renderAllPools();
        } else {
            return this.renderList(filterPools);
        }

    }
}
const mapStateToProps = (state) => {
    const { auth, browser, lists } = state

    return {

    }
}
export default connect(
    mapStateToProps
)(injectIntl(muiThemeable()(withRouter(withFirebase(PoolList)))))
