import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from 'react-router-dom';

import Navbar from './components/navbar'

import Students from './pages/students'
import StudentDetails from './pages/studentDetails'
import StudentForm from './pages/studentForm'

function App() {
  return (
    <Router>
    <Navbar />
      <Switch>
        <Route path='/students' exact component={Students} />
        <Route path='/students/new' exact component={StudentForm} />
        <Route path='/students/:id' exact component={StudentDetails} />
        <Route path='/students/:id/edit' component={StudentForm} />
      </Switch>
    </Router>
  );
}

export default App;
