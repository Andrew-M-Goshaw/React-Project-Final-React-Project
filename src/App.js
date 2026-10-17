import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./Components/Home";
import Product from "./Components/Product";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path=":id" element={<Product />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
