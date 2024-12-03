import SigninForm from "./pages/signin/index";
import SignupForm from "./pages/signup";
import ExpertRegisteration from "./pages/registeration/expert";
import InnovatorRegiseration from "./pages/registeration/innovator";
import InvestorRegiseration from "./pages/registeration/investor";
import Layout from "./pages/registeration/layout";
import PrivacyPolicy from "./pages/privacy-policy";
import { useAuth } from "../hooks/use-auth";
import MainHeader from "./components/shared/Header/main-header";
import Categories from "./pages/categories";
import InnovatorProfile from "./pages/profile/innovator-profile";
import ExpertProfile from "./pages/profile/expert-profile";
import InvestorProfile from "./pages/profile/investor-profile";
import Home from ".";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainHeader />,
    children: [
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
    ],
  },
  {
    path: "/profile",
    element: <MainHeader />,
    children: [
      {
        path: "innovator",
        element: <InnovatorProfile />,
      },
      {
        path: "expert",
        element: <ExpertProfile />,
      },
      {
        path: "investor",
        element: <InvestorProfile />,
      },
    ],
  },
  { path: "/sign-in", element: <SigninForm /> },
  { path: "/sign-up", element: <SignupForm /> },
  {
    path: "/registeration",
    element: <Layout />,
    children: [
      { path: "expert", element: <ExpertRegisteration /> },
      { path: "innovator", element: <InnovatorRegiseration /> },
      { path: "investor", element: <InvestorRegiseration /> },
    ],
  },
]);
function App() {
  const { isUserAuthenticated } = useAuth();
  isUserAuthenticated();
  return <RouterProvider router={router} />;
}

export default App;
