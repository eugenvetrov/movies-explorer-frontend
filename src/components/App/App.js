import './App.css';
import { Routes, Route} from "react-router-dom";
import Header from '../Header/Header';
import HeaderLanding from '../HeaderLanding/HeaderLanding.js';
import LandingSelector from '../LandingSelector/LandingSelector';
import AboutProject from '../AboutProject/AboutProject';
import Technology from '../Technology/Technology';
import Student from '../Student/Student';

function App() {

  return (
    <div className="page">
      <Header />
      <Routes>
         <Route
            path="/"
            element={
              <>
              <HeaderLanding />
              <LandingSelector />
              <AboutProject />
              <Technology />
              <Student />
              </>
            }
          />
        </Routes>
      hello
    </div>
  );
}

export default App;
