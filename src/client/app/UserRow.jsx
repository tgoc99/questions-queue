import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


const UserRow = (props) => {
  const username = props.username;
  const givenName = props.givenName;
  const role = props.role;
  const cohort = props.cohort;

  return (
    <TableRow>
      <TableRowColumn>{username}</TableRowColumn>
      <TableRowColumn>{givenName}</TableRowColumn>
      <TableRowColumn>{role}</TableRowColumn>
      <TableRowColumn>{cohort}</TableRowColumn>
    </TableRow>
  );
};


export default UserRow;
