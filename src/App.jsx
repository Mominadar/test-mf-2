import Att from "accessibleTextBooks/Att";
import Header from "common/Header";
import Footer from "common/Footer";
import LoginCard from "common/LoginCard";
import { isLoggedIn, logout } from "common/login";
import Dashboard from "playgroundUi/Dashboard";

import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="att" element={<Att />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  const navigate = useNavigate();
  return (
    <>
      {isLoggedIn() ? (
        <div>
          <Header goToHome={()=>navigate("/")} handleLogout={logout} />
          <Outlet />
          <Footer />
        </div>
      ) : (
        <LoginCard />
      )}
    </>
  );
}

function Home() {
  const navigate = useNavigate();
  return <Dashboard navigate={navigate} />;
}

function About() {
  return (
    <div>
      <Button
        onClick={() =>
          alert("Now everything's alright! If not, check reality settings.")
        }
      >
        Make everything alright
      </Button>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
