import Customer from "./Pages/Customer/Customer";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="customer">
            <Route path="add" element={<Customer type="add"/>}/>
            <Route path="view/:id" element={<Customer type="view"/>}/>
            <Route path="update/:id" element={<Customer type="update"/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
