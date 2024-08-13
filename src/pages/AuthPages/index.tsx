import LoginPage from "@pages/LoginPage";
import PageNotFound from "@pages/PageNotFound";
import { Route, Routes } from "react-router-dom";

const SignUp = () => <>Sign Up</>;

const AuthPages = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<PageNotFound />} />


    </Routes>
  );
};

export default AuthPages;
