import { Route } from "react-router-dom";
import ProductPage from "../pages/ProductPage";
import LandingPage from "../pages/LandingPage";
import SAProductPage from "../pages/SAdminProductPage";

const routes = [
  <Route path="" element={<LandingPage />}></Route>,
  <Route path="/product" element={<ProductPage />}></Route>,
  <Route path="/sa-product" element={<SAProductPage />}></Route>,
];
export default routes;
