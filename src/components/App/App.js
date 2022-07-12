import './App.css';
import { Routes, Route} from "react-router-dom";
import Header from '../Header/Header';
import HeaderLanding from '../HeaderLanding/HeaderLanding.js';
import LandingSelector from '../LandingSelector/LandingSelector';
import AboutProject from '../AboutProject/AboutProject';
import Technology from '../Technology/Technology';
import Student from '../Student/Student';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

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
              <Portfolio />
              </>
            }
          />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
