import { useAuth } from "@contexts/authContext";
import AppPages from "@pages/AppPages";
import AuthPages from "@pages/AuthPages";
import { BrowserRouter } from "react-router-dom";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return "";
  }
  return (
    <BrowserRouter>
      {!isAuthenticated ? <AuthPages /> : <AppPages />}
    </BrowserRouter>
  );
};

export default AppRoutes;
