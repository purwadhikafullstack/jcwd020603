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
import DashboardBranch from "../pages/DashboardBranch";
import CartPage from "../pages/CartPage";
import AddressListPage from "../pages/AddressListPage";
import OrderListPage from "../pages/OrderListPage";
import SuperAdminCategoryPage from "../pages/Super-Admin-Category-Page";
import SuperAdminProductPage from "../pages/Super-Admin-Product-Page";
import AdminStockPage from "../pages/Admin-Stock-Page";
import PaymentPage from "../pages/PaymentPage";
import OrderDetailPage from "../pages/OrderDetailPage";
import AdminOrderPage from "../pages/AdminOrderPage";
import AdminOrderDetailPage from "../pages/AdminOrderDetailPage";
import DiscountPage from "../pages/DiscountPage";
import StockHistoryPage from "../pages/Stock-History-Page";
import ResetPass from "../components/ResetPass";
import DiscountAddModal from "../components/DiscountAddModal";
import DiscountAddProductModal from "../components/DiscountAddProductModal";
import VoucherPage from "../pages/VoucherPage";
import SalesReportPage from "../pages/SalesReportPage";
import ChartSalesReportTransactions from "../components/Chart-SalesReport-transaction";
import SalesReportProductPage from "../pages/SalesReportProductPage";
import SalesReportUserPage from "../pages/SalesReportUserPage";
import DashboardAdminPage from "../pages/Dashboard-Admin-Page";

const routes = [
  <Route
    path="/"
    element={
      <ProtectedPage >
        <LandingPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/dashboard"
    element={
      <ProtectedPage >
        <DashboardAdminPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/login"
    element={
      <ProtectedPage >
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
      <ProtectedPage >
        <ChangePass />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/product"
    element={
      <ProtectedPage >
        <ProductPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/sa-product"
    element={
      <ProtectedPage >
        <SuperAdminProductPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/admin-branch"
    element={
      <ProtectedPage>
        <DashboardBranch />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/sales-report"
    element={
      <ProtectedPage adminOnly={true} >
        <SalesReportPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/sales-report-product"
    element={
      <ProtectedPage>
        <SalesReportProductPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/sales-report-user"
    element={
      <ProtectedPage>
        <SalesReportUserPage />
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
  <Route path="/admin-branch" element={<DashboardBranch />}></Route>,
  <Route path="/discount" element={<DiscountPage />}></Route>,
  <Route path="/voucher" element={<VoucherPage />}></Route>,
  <Route path="/sales-report" element={<SalesReportPage />}></Route>,
  <Route path="/sales-report-product" element={<SalesReportProductPage />}></Route>,
  <Route path="/sales-report-user" element={<SalesReportUserPage />}></Route>,
  <Route path="/cart" element={<CartPage />}></Route>,
  <Route path="/address" element={<AddressListPage />}></Route>,
  <Route path="/orders/:order_number" element={<OrderDetailPage />}></Route>,
  <Route path="/orders" element={<OrderListPage />}></Route>,
  <Route path="/payment" element={<PaymentPage />}></Route>,
  <Route
    path="/admin/orders/:order_number"
    element={<AdminOrderDetailPage />}
  ></Route>,
  <Route path="/admin/orders" element={<AdminOrderPage />}></Route>,
  <Route path="/disadd" element={<DiscountAddModal />}></Route>,
  <Route path="/disaprod" element={<DiscountAddProductModal />}></Route>,
];

export default routes;
