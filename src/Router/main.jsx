import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import "../index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="contact/:id" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

const Login = () => {
  const navigate = useNavigate();

  return (
    <h1>
      login form
      <button
        onClick={() => {
          navigate("/contact");
        }}
      >
        Go to contact
      </button>
    </h1>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
