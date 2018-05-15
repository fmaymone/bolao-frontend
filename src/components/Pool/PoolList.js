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

    renderList = (poolsOfUser) => {
        let objectsOfPool = [];
        for (let index = 0; index < poolsOfUser.length; index++) {
            const element = poolsOfUser[index];
            const object = this.props.pools.find(k => k.key === element);
            objectsOfPool.push(object);
        }

        return (
            <div style={styles.root}>
                <GridList
                    cellHeight={180}
                    style={styles.gridList}
                >
                    {/* <Subheader>Pools</Subheader> */}
                    {objectsOfPool.map((pool) => (
                        <GridTile
                            key={pool.key}
                            title={pool.name}
                            subtitle={<span>Criado por: <b>{pool.userName}</b></span>}
                            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                            onClick={() => {
                                this.props.history.push({
                                    pathname: `/pools/show/${pool.key}`,
                                    state: { userOfPool: this.props.user }
                                })
                            }}
                        >
                            <img src={pool.photoURL} />
                        </GridTile>
                    ))}
                </GridList>
            </div>
        )
    }

    render() {

        const { history, poolsOfUser, pools } = this.props
        if (poolsOfUser === undefined) {
            return <h1>Sem Pools</h1>
        } else {
            return this.renderList(poolsOfUser);
        }

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
