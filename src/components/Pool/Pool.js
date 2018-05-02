import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import UsersOfPool from '../../containers/Users/UsersOfPool';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const Pool = ({pool}) => (
    <Card>
    {/* <CardHeader
      title={pool.val.name}
      subtitle={`criado por: ${pool.val.userName}`} 
      avatar={pool.val.photoUrl}
    /> */}
    {/* <CardMedia
      overlay={<CardTitle title="Pool" subtitle="Detalhes" />}
    >
      
    </CardMedia> */}
    <CardTitle title={pool.val.name} subtitle={`criado por: ${pool.val.userName}`}  />
    <CardText>
    {pool.val.description ? pool.val.description : 'N/A'}
    </CardText>
    
    <CardActions>
      <RaisedButton label="Minhas Apostas" primary={true} style={style} />
    </CardActions>
    <Divider />
    <CardTitle title='Usuários do Pool'  />
    <CardText>
      <UsersOfPool users={pool.val.users} />
    </CardText>
  </Card>
);

export default Pool;