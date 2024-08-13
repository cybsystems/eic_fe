import CRMPage from "@pages/CRMPages";
import AddEditCRMPage from "@pages/CRMPages/AddEditCRMPage";
import DashboardPage from "@pages/DashboardPage";
import HomePage from "@pages/HomePage";
import PageNotFound from "@pages/PageNotFound";
import UsersPage from "@pages/UsersPage";
import AddEditUserPage from "@pages/UsersPage/AddEditUserPage";
import { Route, Routes } from "react-router-dom";

const AppPages = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route index element={<DashboardPage />} />
        <Route path="/users/new" element={<AddEditUserPage />} />
        <Route path="/users/:id" element={<AddEditUserPage />} />
        <Route path="/users" element={<UsersPage />} />


        <Route path="/crm" element={<CRMPage />} />
        <Route path="/crm/:id" element={<AddEditCRMPage />} />
        <Route path="/crm/new" element={<AddEditCRMPage />} />

        
        <Route path="*" element={<PageNotFound />} />
        
      </Route>
    </Routes>
  );
};

export default AppPages;
