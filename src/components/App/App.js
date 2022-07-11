import './App.css';
import { Routes, Route} from "react-router-dom";
import Header from '../Header/Header';
import HeaderLanding from '../HeaderLanding/HeaderLanding.js';
import LandingSelector from '../LandingSelector/LandingSelector';

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
              </>
            }
          />
        </Routes>
      hello
    </div>
  );
}

export default App;
