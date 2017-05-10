import React from 'react';
import { Card, CardText, CardHeader, CardTitle } from 'material-ui/Card';
import UserRow from './UserRow.jsx';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const DataComponent = (props) => {
  const users = props.users.map(q => (
      <UserRow 
        username={q.username}
        givenName={q.givenName}
        role={q.role}
        cohort={q.cohort}
        />
    ));
  return (
    <Card className="queue" initiallyExpanded={true}>
      <CardHeader title='Data'
        actAsExpander={true}
        showExpandableButton={true}
        />
      <CardText expandable={true}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Username</TableHeaderColumn>
              <TableHeaderColumn>Given Name</TableHeaderColumn>
              <TableHeaderColumn>Role</TableHeaderColumn>
              <TableHeaderColumn>Cohort</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users}
          </TableBody>
        </Table>
      </CardText>
    </Card>
  );
};

export default DataComponent;