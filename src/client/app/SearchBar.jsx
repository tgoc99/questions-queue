import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

function SearchBar(props) {
  var filterState = props.filterState;
  var handlers = props.filterHandlers;

  console.log('Loading SearchBar')

  return (
    <div className="search-wrapper">
      <TextField
        onChange={handlers.query}
        floatingLabelText="Seach Questions..." />

      <DropDownMenu
        value={filterState.location}
        onChange={(e, idx, val) => handlers.location(val)} >
        <MenuItem value="in *" primaryText = "in *" />
        <MenuItem value="in Question" primaryText="in Question" />
        <MenuItem value="in Code Snippet" primaryText="in Code Snippet" />
        <MenuItem value="in Tags" primaryText="in Tags" />
      </DropDownMenu>

      <DropDownMenu
        value={filterState.by}
        onChange={(e, idx, val) => handlers.by(val)} >
        <MenuItem value="Upvotes : High to Low" primaryText="Upvotes : High to Low" />
        <MenuItem value="Time Created : New First" primaryText="Time Created : New First"/>
        <MenuItem value="Time Created : Old First" primaryText="Time Created : Old First"/>
      </DropDownMenu>

      <DropDownMenu
        value={filterState.in}
        onChange={(e, idx, val) => handlers.in(val)} >
        <MenuItem value="All Questions" primaryText="All Questions" />
        <MenuItem value="Answered" primaryText="Answered"/>
        <MenuItem value="Unanswered" primaryText="Unanswered"/>
      </DropDownMenu>
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
