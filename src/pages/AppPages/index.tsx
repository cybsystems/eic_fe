import CRMPage from "@pages/CRMPages";
import AddEditCRMPage from "@pages/CRMPages/AddEditCRMPage";
import DashboardPage from "@pages/DashboardPage";
import FirmsPage from "@pages/FirmsPages";
import AddEditFirmPage from "@pages/FirmsPages/AddEditFirmPage";
import HomePage from "@pages/HomePage";
import InwardPage from "@pages/MaterialInwardPages";
import AddInwardPage from "@pages/MaterialInwardPages/AddInwardPage";
import MaterialIssuePage from "@pages/MaterialIssuePage";
import PageNotFound from "@pages/PageNotFound";
import ProjectsPages from "@pages/ProjectsPages";
import AddEditProjectPage from "@pages/ProjectsPages/AddEditProjectPages";
import AddContractorPage from "@pages/ProjectsPages/AddEditProjectPages/AddContractor";
import AddUnitsPage from "@pages/ProjectsPages/AddEditProjectPages/AddUnitsPage";
import ProjectDetailsPage from "@pages/ProjectsPages/ProjectDetailsPage";
import StocksPages from "@pages/StocksPages";
import AddEditStockPage from "@pages/StocksPages/AddEditStocksPage";
import UsersPage from "@pages/UsersPage";
import AddEditUserPage from "@pages/UsersPage/AddEditUserPage";
import VendorsPage from "@pages/VendorsPages";
import AddEditVendorPage from "@pages/VendorsPages/AddEditVendorsPages";
import WorkOrderPage from "@pages/WorkOrderPages";
import AddEditWorkOrderPage from "@pages/WorkOrderPages/AddEditWorkOrderPages";
import WorkOrderDetailsPage from "@pages/WorkOrderPages/WorkOrderDetailsPage";
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
        <Route path="/projects/:id/details" element={<ProjectDetailsPage />} />
        <Route path="/projects/:id" element={<AddEditProjectPage />} />
        <Route path="/projects/new" element={<AddEditProjectPage />} />
        <Route path="/projects/:id/units" element={<AddUnitsPage />} />

        <Route path="/projects/:id/contractor" element={<AddContractorPage />} />



        <Route path="/firms" element={<FirmsPage/>}/>
        <Route path="/firms/:id" element={<AddEditFirmPage />} />
        <Route path="/firms/new" element={<AddEditFirmPage />} />


        <Route path="/work-orders" element={<WorkOrderPage/>}/>
        <Route path="/work-orders/:id" element={<WorkOrderDetailsPage />} />
        <Route path="/work-orders/new" element={<AddEditWorkOrderPage />} />



        <Route path="/stocks" element={<StocksPages/>}/>
        <Route path="/stocks/new" element={<AddEditStockPage/>}/>



        <Route path="/vendors" element={<VendorsPage/>}/>
        <Route path="/vendors/:id" element={<AddEditVendorPage/>}/>

        <Route path="/vendors/new" element={<AddEditVendorPage/>}/>



        <Route path="/inwards/" element={<InwardPage/>}/>
        <Route path="/inwards/new" element={<AddInwardPage/>}/>

        <Route path="/material-issue/" element={<MaterialIssuePage/>}/>


        <Route path="*" element={<PageNotFound />} />
        
      </Route>
    </Routes>
  );
};

export default AppPages;
