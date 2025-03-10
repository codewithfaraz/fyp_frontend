import SigninForm from "./pages/signin/index";
import SignupForm from "./pages/signup";
import ExpertRegisteration from "./pages/registeration/expert";
import InnovatorRegiseration from "./pages/registeration/innovator";
import InvestorRegiseration from "./pages/registeration/investor";
import Layout from "./pages/registeration/layout";
import PrivacyPolicy from "./pages/privacy-policy";
import { useAuth } from "../hooks/use-auth";
import MainHeader from "./components/shared/Header/main-header";
// import InvestorPage from "./pages/guestPages/investor";
import InvestorPage from "./components/pagesToDisplayAfterRegisteration/Investor";
import ProfilePage from "./pages/profilePage";
import IsInnovator from "./routeProtections/IsInnovator";
import IsExpert from "./routeProtections/IsExpert";
import IsInvestor from "./routeProtections/isInvestor";
// import ExpertPage from "./pages/guestPages/expert";
import ExpertPage from "./components/pagesToDisplayAfterRegisteration/Expert";
import InnovatorPage from "./components/pagesToDisplayAfterRegisteration/Innovator";
import InnovatorProfile from "./pages/profile/innovator-profile";
// import InnovatorPage from "./pages/guestPages/innovator";
// import ExpertPage from "./pages/guestPages/expert";
import ViewIdea from "./components/table/viewIdea";
// import Innovator from "./pages/innovator";
import StartAProject from "./pages/guestPages/innovator/start-a-project";
import Home from ".";
import Profile from "./pages/profile/profile";
import ChatPage from "./pages/Chat";
import {
  // RouterProvider,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

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
            element={
              <IsInnovator>
                <StartAProject />
              </IsInnovator>
            }
          />
          <Route
            path="/profile/:usertype/:username"
            element={<ProfilePage />}
          />
          <Route
            path="/innovator/innovator-profile"
            element={<InnovatorProfile user={undefined} />}
          />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="innovators"
            element={
              <IsInnovator>
                <InnovatorPage />
              </IsInnovator>
            }
          />
          <Route
            path="experts"
            element={
              <IsExpert>
                <ExpertPage />
              </IsExpert>
            }
          />
          <Route path="messages/:username?" element={<ChatPage />} />
          <Route
            path="investors"
            element={
              <IsInvestor>
                <InvestorPage />
              </IsInvestor>
            }
          />
        </Route>
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
        <Route path="/registeration" element={<Layout />}>
          <Route path="expert" element={<ExpertRegisteration />} />
          <Route path="innovator" element={<InnovatorRegiseration />} />
          <Route path="investor" element={<InvestorRegiseration />} />
        </Route>
        <Route path="/view-idea" element={<ViewIdea />} />
      </Routes>
    </Router>
  );
}

export default App;
