import react from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import mainpage from './component/MainPage/mainpage';
import PassForm from './component/WebsitePassForm/websitepassform'
import ShowPass from './component/ShowPass/showpass'
const App = () => {
  return (
    <Router>
      <Route path="/" exact component={mainpage} />
      <Route path="/form"  component={PassForm} />
      <Route path="/passwords" component={ShowPass} />
    </Router>
  );
  
}

export default App;
