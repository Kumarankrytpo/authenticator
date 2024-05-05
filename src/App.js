import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Login from'./login.js';
import AuthCode from './AuthCode.jsx'
import AuthCodeIdentifier from './authCodeIdentifier.jsx';
import Welcome from './mainPage.jsx';


function App() {
  return (
    <Router>
    <div>
        <Routes>
        <Route path="/authcode" element={<AuthCode/>} exact/>
        <Route  path='/' element={<Login/>}/>
        <Route path="/authcodeidentify" element={<AuthCodeIdentifier/>} />
        <Route path="/welcome" element={<Welcome/>}/>
        </Routes>
    </div>
    </Router>
    
  );
}



export default App;
