import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import View from "./components/dashboard/View";
import Create from "./components/dashboard/Create";
import Analytics from "./components/dashboard/Analytics";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>}>
        <Route index element={<Analytics/>}/>
          <Route path="view" element={<View/>}/>
          <Route path="create" element={<Create/>}/>
          <Route path="setting" element={<h1>this is seeting </h1>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
