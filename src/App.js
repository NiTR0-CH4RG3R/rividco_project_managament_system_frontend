import Customer from "./Pages/Customer/Customer";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Vendor from "./Pages/Vendor/Vendor";

function App() {
  return (
    <div className="App">
      {/*<Router>
        
        <Routes>
          <Route path="customer">
            <Route path="add" element={<Customer type="add"/>}/>
            <Route path="view/:id" element={<Customer type="view"/>}/>
            <Route path="update/:id" element={<Customer type="update"/>}/>
          </Route>
          <Route path="vendor">
          <Route path="add" element={<Vendor type="add"/>}/>
            <Route path="view/:id" element={<Vendor type="view"/>}/>
            <Route path="update/:id" element={<Vendor type="update"/>}/>
          </Route>
        </Routes>
        
  </Router>*/}

    </div>
  );
}

export default App;
