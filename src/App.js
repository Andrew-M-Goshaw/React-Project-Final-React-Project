import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./Components/Home";
import MovieDetails from "./Components/MovieDetails";
import Footer from "./Components/Footer";
import Movie from "./Components/Movie";
import Rating from "./Components/Rating";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
