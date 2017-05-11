import React from 'react';
import { Card, CardText, CardHeader, CardTitle } from 'material-ui/Card';
import UserRow from './UserRow.jsx';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class DataComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const users = this.props.users.map(q => (
        <UserRow 
          user={q}
          handleUserDelete={this.props.handleUserDelete}
          />
      ));
    
    return (
      <Card className="queue" initiallyExpanded={true}>
        <CardHeader title='Data'
          actAsExpander={true}
          showExpandableButton={true}
          />
        <CardText expandable={true}>
          <SelectField
            floatingLabelText="Select Cohort"
            value={this.props.cohortChoice}
            onChange={(e, idx, val)=> this.props.handleFilterByCohort(val)}
          >
            <MenuItem value={'All Cohorts'} primaryText="All Cohorts" />
            <MenuItem value={7} primaryText="HRNYC-7" />
            <MenuItem value={8} primaryText="HRNYC-8" />
            <MenuItem value={9} primaryText="HRNYC-9" />
            <MenuItem value={10} primaryText="HRNYC-10" />
            <MenuItem value={11} primaryText="HRNYC-11" />
          </SelectField>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Username</TableHeaderColumn>
                <TableHeaderColumn>Given Name</TableHeaderColumn>
                <TableHeaderColumn>Role</TableHeaderColumn>
                <TableHeaderColumn>Cohort</TableHeaderColumn>
                <TableHeaderColumn>Delete User</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users}
            </TableBody>
          </Table>
        </CardText>
      </Card>
    );
  }
};

export default DataComponent;