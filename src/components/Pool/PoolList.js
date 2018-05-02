import React, { Component } from 'react';

import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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
        return (<div style={styles.root}>
            <GridList
                cellHeight={180}
                style={styles.gridList}
            >
                <Subheader>Pools</Subheader>
                {pools.map((pool) => (
                    <GridTile
                        key={pool.val.userPhotoURL}
                        title={pool.val.name}
                        subtitle={<span>by <b>{pool.val.userName}</b></span>}
                        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                    >
                        <img src={pool.val.userPhotoURL} />
                    </GridTile>
                ))}
            </GridList>
        </div>)
    }
}

export default PoolList;