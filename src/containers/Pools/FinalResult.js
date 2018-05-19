import React, { Component } from "react";
import Loader from "../../components/UI/Loader";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import TeamClassification from "../../components/Match/TeamClassification";

class FinalResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderList = () => {
      const {finalResult} = this.props;
    return (
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn style={{ width: "25%" }}>
              Campeão
            </TableHeaderColumn>
            <TableHeaderColumn style={{ width: "25%" }}>Vice</TableHeaderColumn>
            <TableHeaderColumn style={{ width: "25%" }}>
              3o Colocado
            </TableHeaderColumn>
            <TableHeaderColumn style={{ width: "25%" }}>
              4o Colocado
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn style={{ width: "25%" }}>
              <TeamClassification id={finalResult.first} isChip={true} position='first' />
            </TableRowColumn>
            <TableRowColumn style={{ width: "25%" }}>
              <TeamClassification id={finalResult.second}  isChip={true} position='second'/>
            </TableRowColumn>
            <TableRowColumn style={{ width: "25%" }}>
              <TeamClassification id={finalResult.third}  isChip={true} position='third'/>
            </TableRowColumn>
            <TableRowColumn style={{ width: "25%" }}>
              <TeamClassification id={finalResult.fourth}  isChip={true} position='fourth'/>
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
  };
  render() {
    if (this.props.finalResult !== undefined) {
      return this.renderList();
    } else {
      return <div />;
    }
  }
}

export default FinalResult;
