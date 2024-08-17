import CRMPage from "@pages/CRMPages";
import AddEditCRMPage from "@pages/CRMPages/AddEditCRMPage";
import DashboardPage from "@pages/DashboardPage";
import FirmsPage from "@pages/FirmsPages";
import AddEditFirmPage from "@pages/FirmsPages/AddEditFirmPage";
import HomePage from "@pages/HomePage";
import PageNotFound from "@pages/PageNotFound";
import ProjectsPages from "@pages/ProjectsPages";
import AddEditProjectPage from "@pages/ProjectsPages/AddEditProjectPages";
import AddUnitsPage from "@pages/ProjectsPages/AddEditProjectPages/AddUnitsPage";
import UsersPage from "@pages/UsersPage";
import AddEditUserPage from "@pages/UsersPage/AddEditUserPage";
import WorkOrderPage from "@pages/WorkOrderPages";
import AddEditWorkOrderPage from "@pages/WorkOrderPages/AddEditWorkOrderPages";
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


        <Route path="/projects" element={<ProjectsPages/>}/>
        <Route path="/projects/:id" element={<AddEditProjectPage />} />
        <Route path="/projects/new" element={<AddEditProjectPage />} />
        <Route path="/projects/:id/units" element={<AddUnitsPage />} />




        <Route path="/firms" element={<FirmsPage/>}/>
        <Route path="/firms/:id" element={<AddEditFirmPage />} />
        <Route path="/firms/new" element={<AddEditFirmPage />} />


        <Route path="/work-orders" element={<WorkOrderPage/>}/>
        <Route path="/work-orders:id" element={<AddEditWorkOrderPage />} />
        <Route path="/work-orders/new" element={<AddEditWorkOrderPage />} />





        <Route path="*" element={<PageNotFound />} />
        
      </Route>
    </Routes>
  );
};

export default AppPages;
