import LoginPage from "../views/LoginPage.jsx";
import SearchCards from "../views/SearchCards.jsx";
import CreateCards from "../views/CreateCards.jsx";
import SendCard from "../views/SendCard.jsx";
import ViewFriends from "../views/ViewFriends.jsx";
import MyCards from "../views/MyCards.jsx";

let indexRoutes = [
  { path: "/", name: "Login", component: LoginPage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/search", name: "Search", component: SearchCards },
  { path: "/create", name: "Create", component: CreateCards },
  { path: "/send", name: "Send", component: SendCard },
  { path: "/friends", name: "ViewFriends", component: ViewFriends },
  { path: "/mycards", name: "MyCards", component: MyCards }
];

export default indexRoutes;
