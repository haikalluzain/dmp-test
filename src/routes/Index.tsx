import { BrowserRouter, Route, Routes } from "react-router-dom";

//Pages
import SignUp from "../pages/Auth/Register";
import SignIn from "../pages/Auth/Login";
import NotFound from "../pages/NotFound";
import JobList from "../pages/Job";
import JobDetail from "../pages/Job/Detail";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
