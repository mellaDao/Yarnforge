import { Routes, Route, useLocation, HashRouter } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import MyPatterns from "./MyPatterns";
import NewPattern from "./NewPattern";
import Knitting101 from "./Knitting101";
import Glossary from "./Glossary";
import About from "./About";
import Account from "./Account";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import ViewPattern from "./ViewPattern";
import TokenVerification from "./TokenVerification";
import ResetPassword from "./ResetPassword";

function App() {
  const location = useLocation();

  // Do not show header for certain routes
  const showHeader = ![
    "/login",
    "/register",
    "/forgotPassword",
    "/TokenVerification",
    "/ResetPassword",
  ].includes(location.pathname);

  return (
    <HashRouter>
      {/* Routes*/}
      {showHeader && <Header />}
      <Routes>
        <Route path="/myPatterns" element={<MyPatterns />} />
        <Route path="/newPattern" element={<NewPattern />} />
        <Route path="/knitting101" element={<Knitting101 />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/tokenVerification" element={<TokenVerification />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/viewPattern" element={<ViewPattern />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
