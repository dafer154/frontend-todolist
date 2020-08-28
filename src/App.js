import React from 'react';
import './App.css';
import { HashRouter as Router, Route, browserHistory } from 'react-router-dom';
import ListUsers from './components/users/ListUsers';
import ListTasks from './components/tasks/ListTasks';
import Navigation from './components/shared/Navigation';
import Main from './components/shared/Main';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation></Navigation>
        <div className="container p-4">
        <Route path="/" exact component={Main}></Route>
        {/* <Route path="/editNotes/:id" component={CreateNote}></Route>
        <Route path="/createNotes" component={CreateNote}></Route>
        <Route path="/updateNotes" component={UdateNote}></Route> */}
        <Route path="/listTasks" component={ListTasks}></Route>
        <Route path="/listUsers" component={ListUsers}></Route>
      </div>
      </Router>
    </div>
  );
}

export default App;
