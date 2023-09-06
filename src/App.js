import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './Components/Home';
import Category from './Components/Category';
import Question from './Components/Question';
import Login from './Components/Login';
import Register from './Components/Register';
import Nav from './Components/Nav';
import Quiz from './Components/Quiz';
import Protect from './Components/Protect'
import Result from './Components/Result';

function App() {  
  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route exact path='/home'>
          <Protect>
            <Home />
            </Protect>
          </Route>
          <Route exact path='/quiz/:id'>
          <Protect>
            <Quiz /></Protect>
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route exact path='/category'>
          <Protect>
            <Category />
            </Protect>
          </Route> 
          <Route exact path='/question'>
          <Protect>
            <Question />
            </Protect>
          </Route>
          <Route exact path='/resultData'>
          <Protect>
            <Result />
            </Protect>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
