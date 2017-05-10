import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

function SearchBar(props) {

  var searchIn = props.searchIn;
  var filterBy = props.filterBy;

  console.log(searchIn, typeof searchIn)

  return (
    <div className="search-wrapper">
      <TextField
        onChange={() => true}
        floatingLabelText="Seach Questions..." />

      <DropDownMenu
        value={searchIn}
        onChange={() => true} >
        <MenuItem value="*" primaryText = "*" />
        <MenuItem value="questionText" primaryText="Question Text" />
        <MenuItem value="codeSnippets" primaryText="Code Snippets" />
        <MenuItem value="tags" primaryText="Tags" />
      </DropDownMenu>

      <DropDownMenu
        value={filterBy}
        onChange={() => true} >
        <MenuItem value="*" primaryText="*"/>
        <MenuItem value="upvotes" primaryText="Upvotes" />
        <MenuItem value="dateCreated" primaryText="dateCreated"/>
      </DropDownMenu>

      <IconButton
        tooltip="Reverse Order"
        onClick={() => true}>
        <FontIcon className="material-icons">
          {true ? 'arrow_upward' : 'arrow_downward'}
        </FontIcon>
      </IconButton>
    </div>
  )
}

export default SearchBar;
//
// <TextField
//   className="search-field"
//   value={}
//   floatingLabelText="Seach questions for..."
//   onChange={} />
// <DropDownMenu
//   className="search-dropdown"
//   value={props.filterBy}
//   onChange={(e, idx, val) => props.handleFilterByChange(val)} >
//   <MenuItem value="all" primaryText = "in all fields" />
//   <MenuItem value="questionText" primaryText="in question text" />
//   <MenuItem value="codeSnippet" primaryText="in code snippets" />
//   <MenuItem value="tags" primaryText="in tags" />
// </DropDownMenu>
//   <DropDownMenu
//     className="sort-dropdown"
//     value={props.sortBy}
//     onChange={(e, idx, val) => props.handleSortByChange(val)} >
//     <MenuItem value="createdAt" primaryText="Sort by Date"/>
//     <MenuItem value="votes" primaryText="Sort by Votes" />
//   </DropDownMenu>
//   <IconButton
//     className="sortButton"
//     tooltip="Reverse Order"
//     onTouchTap={props.handleReverse}>
//     <FontIcon className="material-icons">
//       {props.reverseSort ? 'arrow_upward' : 'arrow_downward'}
//     </FontIcon>
//   </IconButton>
