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
import InvoicePage from "../pages/InvoicePage";
import SalesReportPage from "../pages/SalesReportPage";
import ChartSalesReportTransactions from "../components/Chart-SalesReport-transaction";
import PromoPage from "../pages/PromoPage";
import SalesReportProductPage from "../pages/SalesReportProductPage";
import SalesReportUserPage from "../pages/SalesReportUserPage";
import DashboardAdminPage from "../pages/Dashboard-Admin-Page";
import ProfileAdminPage from "../pages/ProfileAdminPage";

const routes = [
  <Route
    path="/"
    element={
      <ProtectedPage guestOnly={true} adminOnly={false}>
        <LandingPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/dashboard"
    element={
      <ProtectedPage needLogin={true} adminOnly={true}>
        <DashboardAdminPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/login"
    element={
      <ProtectedPage guestOnly={true}>
        <LoginPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/register"
    element={
      <ProtectedPage guestOnly={true}>
        <RegisterPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/verify/:token"
    element={
      <ProtectedPage >
        <VerifyPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/forgot-password/:token"
    element={
      <ProtectedPage >
        <ResetPass />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/change-pass"
    element={
      <ProtectedPage needLogin={true} userOnly={true}>
        <ChangePass />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/admin-branch"
    element={
      <ProtectedPage needLogin={true} adminOnly={true}>
        <DashboardBranch />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/sales-report"
    element={
      <ProtectedPage adminOnly={true} needLogin={true}>
        <SalesReportPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/sales-report-product"
    element={
      <ProtectedPage adminOnly={true} needLogin={true}>
        <SalesReportProductPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/sales-report-user"
    element={
      <ProtectedPage adminOnly={true} needLogin={true}>
        <SalesReportUserPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route path="/*" element={<NotFound />}></Route>,

  <Route
    path="/not-authority"
    element={
      <ProtectedPage>
        <NotFound />
      </ProtectedPage>
    }
  ></Route>,

  <Route path="/product" element={<ProductPage />}></Route>,
  <Route path="/promo" element={<PromoPage />}></Route>,

  <Route
    path="/sa-product"
    element={
      <ProtectedPage needLogin={true} adminOnly={true}>
        <SuperAdminProductPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/a-stock"
    element={
      <ProtectedPage needLogin={true} adminOnly={true}>
        <AdminStockPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/stockhistory"
    element={
      <ProtectedPage needLogin={true} adminOnly={true}>
        <StockHistoryPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/sa-category"
    element={
      <ProtectedPage needLogin={true} adminOnly={true}>
        <SuperAdminCategoryPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/profile"
    element={
      <ProtectedPage needLogin={true} userOnly={true}>
        <ProfilePage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
  path="/profile-admin"
  element={
    <ProtectedPage needLogin={true} adminOnly={true}>
      <ProfileAdminPage />
    </ProtectedPage>
  }
></Route>,

  <Route
    path="/admin-branch"
    element={
      <ProtectedPage>
        <DashboardBranch needLogin={true} adminOnly={true} />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/discount"
    element={
      <ProtectedPage>
        <DiscountPage needLogin={true} adminOnly={true} />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/voucher"
    element={
      <ProtectedPage>
        <VoucherPage needLogin={true} adminOnly={true} />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/sales-report"
    element={
      <ProtectedPage>
        <SalesReportPage needLogin={true} adminOnly={true} />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/cart"
    element={
      <ProtectedPage needLogin={true} userOnly={true}>
        <CartPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/address"
    element={
      <ProtectedPage needLogin={true} userOnly={true}>
        <AddressListPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/orders/:order_number"
    element={
      <ProtectedPage needLogin={true} userOnly={true}>
        <OrderDetailPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/orders"
    element={
      <ProtectedPage needLogin={true} userOnly={true}>
        <OrderListPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/payment/:order_number"
    element={
      <ProtectedPage needLogin={true} userOnly={true}>
        <PaymentPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/payment"
    element={
      <ProtectedPage needLogin={true} userOnly={true}>
        <PaymentPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/admin/orders/:order_number"
    element={
      <ProtectedPage needLogin={true} adminOnly={true}>
        <AdminOrderDetailPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/admin/orders"
    element={
      <ProtectedPage needLogin={true} adminOnly={true}>
        <AdminOrderPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/disadd"
    element={
      <ProtectedPage needLogin={true} adminOnly={true}>
        <DiscountAddModal />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/disaprod"
    element={
      <ProtectedPage needLogin={true} adminOnly={true}>
        <DiscountAddProductModal />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/invoice/:order_number"
    element={
      <ProtectedPage needLogin={true} userOnly={true}>
        <InvoicePage />
      </ProtectedPage>
    }
  ></Route>,
];

export default routes;
