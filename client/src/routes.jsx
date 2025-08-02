import CreateQuote from "./components/CreateQuote";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import OtherUserProfile from "./components/OtherUserProfile";
import NotFound from "./components/NotFound";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/create", element: <CreateQuote /> },
  { path: "/profile", element: <Profile /> },
  { path: "/profile/:userId", element: <OtherUserProfile /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
