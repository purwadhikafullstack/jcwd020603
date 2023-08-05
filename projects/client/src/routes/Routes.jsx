import { Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFound from "../pages/NotFound";
import ProtectedPage from "./ProtectedPage";
import VerifyPage from "../pages/VerifyPage";
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/LandingPage";
import ProductPage from "../pages/ProductPage";
import ProfilePage from "../pages/ProfilePage";
import ChangePass from "../components/ChangePass";
import AdminBranch from "../components/AdminBranch";
import DashboardBranch from "../pages/DashboardBranch";
import AddAdminBranch from "../components/AdminBranchAddModal";
import CartPage from "../pages/CartPage";
import AddressListPage from "../pages/AddressListPage";
import OrderListPage from "../pages/OrderListPage";
import SuperAdminCategoryPage from "../pages/Super-Admin-Category-Page";
import SuperAdminProductPage from "../pages/Super-Admin-Product-Page";
import AdminStockPage from "../pages/Admin-Stock-Page";
import StockHistoryPage from "../pages/Stock-History-Page";
import ResetPass from "../components/ResetPass";

const routes = [
  <Route
    path="/"
    element={
      <ProtectedPage needLogin={true} guestOnly={true}>
        <LandingPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/dashboard"
    element={
      <ProtectedPage needLogin={true} guestOnly={true} adminOnly={true}>
        <Dashboard />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/login"
    element={
      <ProtectedPage>
        <LoginPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/register"
    element={
      <ProtectedPage>
        <RegisterPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/verify/:token"
    element={
      <ProtectedPage>
        <VerifyPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
  path="/forgot-password/:token"
  element={
    <ProtectedPage>
      <ResetPass />
    </ProtectedPage>
  }
></Route>,

<Route
path="/change-pass"
element={
  <ProtectedPage needLogin={true}>
    <ChangePass />
  </ProtectedPage>
}
></Route>,



  <Route
    path="/product"
    element={
      <ProtectedPage guestOnly={true}>
        <ProductPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/sa-product"
    element={
      <ProtectedPage adminOnly={true}>
        <SuperAdminProductPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/adminbranch"
    element={
      <ProtectedPage guestOnly={true}>
        <DashboardBranch />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/*"
    element={
      <ProtectedPage>
        <NotFound />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/not-authority"
    element={
      <ProtectedPage>
        <NotFound />
      </ProtectedPage>
    }
  ></Route>,
  <Route path="/a-stock" element={<AdminStockPage />}></Route>,
  <Route path="/stockhistory" element={<StockHistoryPage />}></Route>,
  <Route path="/sa-category" element={<SuperAdminCategoryPage />}></Route>,
  <Route path="/profile" element={<ProfilePage />}></Route>,
  <Route path="/ab" element={<DashboardBranch />}></Route>,
  <Route path="/cart" element={<CartPage />}></Route>,
  <Route path="/address" element={<AddressListPage />}></Route>,
  <Route path="/orders" element={<OrderListPage />}></Route>,
];

export default routes;
