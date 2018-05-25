import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';

const PoolThumbnail = (props) => {
    const { pool, history, user } = props;
    //console.log(history);
    return (
        <GridTile
            key={pool.key}
            title={pool.name}
            subtitle={<span>Criado por: <b>{pool.userName}</b></span>}
            actionIcon={<IconButton></IconButton>}
            onClick={() => {
                history.push({
                    pathname: `/pools/show/${pool.key}`,
                    state: { userOfPool: user , pool: pool},
                    
                })
            }}
        >
            <img src={pool.photoURL} />
        </GridTile>
    )
}
export default PoolThumbnail