import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Layout from "./components/layout/Layout";

import ScrollToTop from "@components/utils/ScrollToTop";
import {AuthProvider} from "./context/AuthContext";
import GoogleCallback from "./context/GoogleCallback";
import ProtectedRoute from "./context/ProtectedRoute";
import {Toaster} from "react-hot-toast";
import {lazy, Suspense} from "react";

const Home = lazy(() => import("./pages/Home/Home"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const Login = lazy(() => import("./pages/Login/Login"));
const Catalog = lazy(() => import("./pages/Catalog/Catalog"));
const Item = lazy(() => import("./pages/Item/Item"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const CalculatorBMI = lazy(() => import("./pages/CalculatorBMI/CalculatorBMI"));
const News = lazy(() => import("./pages/News/News"));
const Article = lazy(() => import("./pages/Article/Article"));
const OurMission = lazy(() => import("./pages/OurMission/OurMission"));
const BillingInfo = lazy(() => import("./pages/BillingInfo/BillingInfo"));
const SuccessPage = lazy(() => import("./pages/Success/Success"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const CreateAcc = lazy(() => import("./pages/CreateAcc/CreateAcc"));
const RegistrationSuccess = lazy(() => import("./pages/RegistrationSuccess/RegistrationSuccess"));

function App() {
 return (
  <Router >
   <AuthProvider>
    <ScrollToTop />
    <Suspense fallback={<div>Loading...</div>}>
     <Routes>
      <Route
       path="/"
       element={<Layout />}
      >
       <Route
        index
        element={<Home />}
       />
       <Route
        path="/signup"
        element={<Signup />}
       />
       <Route
        path="/auth/google/callback"
        element={<GoogleCallback />}
       />
       <Route
        path="/login"
        element={<Login />}
       />
       <Route
        path="/createacc"
        element={<CreateAcc />}
       />
       <Route
        path="/successreg"
        element={<RegistrationSuccess />}
       />
       <Route
        path="/profile"
        element={
         <ProtectedRoute>
          <Profile />
         </ProtectedRoute>
        }
       />
       <Route
        path="/catalog"
        element={<Catalog />}
       />
       <Route
        path="/catalog/:id"
        element={<Item />}
       />
       <Route
        path="/cart"
        element={<Cart />}
       />
       <Route
        path="/checkout"
        element={<BillingInfo />}
       />
       <Route
        path="/order-success"
        element={<SuccessPage />}
       />
       <Route
        path="/calculator"
        element={<CalculatorBMI />}
       />
       <Route
        path="/news"
        element={<News />}
       />
       <Route
        path="/news/:slug"
        element={<Article />}
       />
       <Route
        path="/our-mission"
        element={<OurMission />}
       />
      </Route>
     </Routes>
    </Suspense>
    <Toaster
     position="top-right"
     reverseOrder={false}
    />
   </AuthProvider>
  </Router>
 );
}

export default App;
