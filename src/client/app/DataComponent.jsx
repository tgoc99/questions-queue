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
    const users = this.props.users.map(u => (

        <UserRow
          key={u.id}
          user={u}
          handleUserDelete={this.props.handleUserDelete}
          handleUserModify={this.props.handleUserModify}
          />
      ));
    const cohorts = this.props.allCohorts.map(c => {
      return <MenuItem key={c[0]} value={c[1]} primaryText={c[1]} />
    })
    
    return (
      <Card className="queue" initiallyExpanded={false}>
        <CardHeader title='Data'
          actAsExpander={true}
          showExpandableButton={true}
          />
        <CardText expandable={true}>
              <SelectField
                className="user-input-field" 
                value={this.props.cohortChoice}
                floatingLabelText='Filter By Cohort'
                onChange={(e, idx, val)=> this.props.handleFilterByCohort(val)}
              >
                <MenuItem value={'All Cohorts'} primaryText='All Cohorts' />
                {cohorts}
              </SelectField> 
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Username</TableHeaderColumn>
                <TableHeaderColumn>Given Name</TableHeaderColumn>
                <TableHeaderColumn>Role</TableHeaderColumn>
                <TableHeaderColumn>Cohort</TableHeaderColumn>
                <TableHeaderColumn> Modify / Delete</TableHeaderColumn>
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