
import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router-dom'
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import MatchesBuilder from '../../containers/Matches/MatchesBuilder'
import muiThemeable from 'material-ui/styles/muiThemeable'
import UsersOfPool from '../../containers/Pools/UsersOfPool'

const style = {
  margin: 12,
};

class Pool extends Component {

  renderPoolData = () => {
    const { pool } = this.props;
    const user = this.props.location.state.userOfPool;

    return (
      <Card>
        <CardTitle title={pool.val.name} subtitle={`criado por: ${pool.val.userName}`} />
        <CardText>
          {pool.val.description ? pool.val.description : 'N/A'}
        </CardText>
      </Card>

    )
  }
  render() {
    const { pool } = this.props;
    const user = this.props.location.state.userOfPool;
    return (
      <div>
        {this.renderPoolData()}
      </div>
      // <Card>
      //   <CardTitle title={pool.val.name} subtitle={`criado por: ${pool.val.userName}`} />
      //   <CardText>
      //     {pool.val.description ? pool.val.description : 'N/A'}
      //   </CardText>
      //   {/* <CardActions>
      //     <MatchesBuilder pool={pool} user={user} />
      //   </CardActions> */}
      //   <Divider />
      //   <CardTitle title='Usuários do Pool' />
      //   {/* <CardText>
      //     <UsersOfPool users={pool.val.users} />
      //   </CardText> */}
      // </Card>
    )
  }

}

export default withRouter(muiThemeable()(Pool));