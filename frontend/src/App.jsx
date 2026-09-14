import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./utils/Auth";
import PrivateRoutes from "./utils/PrivateRoutes";
import Navbar from "./components/Navbar";
import Signin from "./pages/SignIn";
import Home from "./pages/Home";
import About from "./pages/About";
import Account from "./pages/Account";
import TodoListPage from "./pages/TodoListPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <AuthProvider>
          <Routes>
            <Route
              path="/todolists"
              element={
                <PrivateRoutes>
                  <TodoListPage />
                </PrivateRoutes>
              }
            />
            <Route
              path="/account"
              element={
                <PrivateRoutes>
                  <Account />
                </PrivateRoutes>
              }
            />
            <Route path="/signin" element={<Signin />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
