import SigninForm from "./pages/signin/index";
import SignupForm from "./pages/signup";
import ExpertRegisteration from "./pages/registeration/expert";
import InnovatorRegiseration from "./pages/registeration/innovator";
import InvestorRegiseration from "./pages/registeration/investor";
import Layout from "./pages/registeration/layout";

import { useAuth } from "../hooks/use-auth";
import Home from ".";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <h1>404</h1> },
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
