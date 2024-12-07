import { useNavigate } from "react-router-dom";
import SigninForm from "./pages/signin/index";
import SignupForm from "./pages/signup";
import ExpertRegisteration from "./pages/registeration/expert";
import InnovatorRegiseration from "./pages/registeration/innovator";
import InvestorRegiseration from "./pages/registeration/investor";
import Layout from "./pages/registeration/layout";
import PrivacyPolicy from "./pages/privacy-policy";
import { useAuth } from "../hooks/use-auth";
import MainHeader from "./components/shared/Header/main-header";
import InvestorPage from "./pages/guestPages/investor";
import InnovatorProfile from "./pages/profile/innovator-profile";
import ExpertProfile from "./pages/profile/expert-profile";
import InvestorProfile from "./pages/profile/investor-profile";
import InnovatorPage from "./pages/guestPages/innovator";
import ExpertPage from "./pages/guestPages/expert";
import Innovator from "./pages/innovator";
import StartAProject from "./pages/guestPages/innovator/start-a-project";
import Home from ".";
import Profile from "./pages/profile/profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainHeader />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "profile",
        element: <Profile />,
      },

      // {
      //   path: "home",
      //   element: <Home />,
      // },
      {
        path: "innovators",
        element: <InnovatorPage />,
      },
      {
        path: "investors",
        element: <InvestorPage />,
      },
      {
        path: "experts",
        element: <ExpertPage />,
      },
      {
        path: "innovator",
        element: <Innovator />,
      },
      {
        path: "/innovator/start-a-project",
        element: <StartAProject />,
      },
    ],
  },
  // {
  //   path: "/profile",
  //   element: <MainHeader />,
  //   children: [
  //     {
  //       path: "innovator",
  //       element: <InnovatorProfile />,
  //     },
  //     {
  //       path: "expert",
  //       element: <ExpertProfile />,
  //     },
  //     {
  //       path: "investor",
  //       element: <InvestorProfile />,
  //     },
  //   ],
  // },
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
