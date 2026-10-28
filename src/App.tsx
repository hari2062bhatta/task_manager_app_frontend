import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import View from "./components/dashboard/View";
import Create from "./components/dashboard/Create";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>}>
        <Route index element={<h1>dashboard</h1>}/>
          <Route path="view" element={<View/>}/>
          <Route path="create" element={<Create/>}/>
          <Route path="setting" element={<h1>this is seeting </h1>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
