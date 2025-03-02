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
import ProfilePage from "./pages/profilePage";
import InnovatorPage from "./pages/guestPages/innovator";
import ExpertPage from "./pages/guestPages/expert";
// import Innovator from "./pages/innovator";
import StartAProject from "./pages/guestPages/innovator/start-a-project";
import Home from ".";
import Profile from "./pages/profile/profile";
import {
  createBrowserRouter,
  // RouterProvider,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
console.log(import.meta.env.VITE_SUPABASE_PROJECT_URL);
// const router = createBrowserRouter([
// {
//   path: "/",
//   element: <MainHeader />,
//   children: [
//     {
//       path: "",
//       element: <Home />,
//     },
//     {
//       path: "privacy-policy",
//       element: <PrivacyPolicy />,
//     },
//     {
//       path: "profile",
//       element: <Profile />,
//     },

//     {
//       path: "investors",
//       element: <InvestorPage />,
//     },
//     {
//       path: "experts",
//       element: <ExpertPage />,
//     },
//     {
//       path: "innovator",
//       element: <Innovator />,
//     },
//     {
//       path: "/innovator/start-a-project",
//       element: <StartAProject />,
//     },
//   ],
// },
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
// { path: "/sign-in", element: <SigninForm /> },
// { path: "/sign-up", element: <SignupForm /> },
//   {
//     path: "/registeration",
//     element: <Layout />,
//     children: [
//       { path: "expert", element: <ExpertRegisteration /> },
//       { path: "innovator", element: <InnovatorRegiseration /> },
//       { path: "investor", element: <InvestorRegiseration /> },
//     ],
//   },
// ]);
function App() {
  const { isUserAuthenticated } = useAuth();
  isUserAuthenticated();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHeader />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/innovator/start-a-project"
            element={<StartAProject />}
          />
          <Route
            path="/profile/:usertype/:username"
            element={<ProfilePage />}
          />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="profile" element={<Profile />} />
          <Route path="innovators" element={<InnovatorPage />} />
          <Route path="experts" element={<ExpertPage />} />
          <Route path="investors" element={<InvestorPage />} />
        </Route>
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
        <Route path="/registeration" element={<Layout />}>
          <Route path="expert" element={<ExpertRegisteration />} />
          <Route path="innovator" element={<InnovatorRegiseration />} />
          <Route path="investor" element={<InvestorRegiseration />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
