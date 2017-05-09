import React from 'react';
import Question from './question.component.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      // store questions

      // sample data
      sampleData: [
        {
          questionText: 'Is this the first question?',
          codeSnippet: 'Sample Code Snippet',
          votes: '1',
          answered: false,
          createdAt: Date.now(),
          tags: [],
          username: 'Arturo Ruvalcaba',
          usersVoted: []
        },
        {
          questionText: 'Is this the second question?',
          codeSnippet: 'Sample Code Snippet',
          votes: '2',
          answered: false,
          createdAt: Date.now(),
          tags: [],
          username: 'Arturo Ruvalcaba',
          usersVoted: []
        },
        {
          questionText: 'Is this the third question?',
          codeSnippet: 'Sample Code Snippet',
          votes: '3',
          answered: false,
          createdAt: Date.now(),
          tags: [],
          username: 'Arturo Ruvalcaba',
          usersVoted: []
        },
        {
          questionText: 'Is this the fourth question?',
          codeSnippet: 'Sample Code Snippet',
          votes: '4',
          answered: false,
          createdAt: Date.now(),
          tags: [],
          username: 'Arturo Ruvalcaba',
          usersVoted: []
        }
      ]
    };
  }
  render() {
    return (
      <div id="home-wrapper">

        <input type="text" placeholder="Search Questions..."></input>
        <select>
          <option value="">Most Recent</option>
          <option value="">Least Recent</option>
          <option value="">Most Upvotes</option>
          <option value="">Least Upvotes</option>
        </select>

        <div id="queue-wrapper">
          { this.state.sampleData.map(function(question) {
            return <Question question={question}/>
          })}
        </div>
      </div>
    );
  }
}

export default Home;
