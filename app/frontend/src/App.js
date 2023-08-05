import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
// import './App.css';
import "react-toastify/dist/ReactToastify.min.css";
import NotFound from "./pages/NotFound";
import HeaderProvider from "./context/HeaderProvider";
import NavBar from "./components/NavBar";
import NewBook from "./pages/NewBook";
import Modal from "react-modal";
import Footer from "./components/Footer";

Modal.setAppElement("#root");

function App() {
  return (
    <>
      <HeaderProvider>
        <NavBar />
        <Routes>
          <Route exact path="/" element={ <Login /> } />
          <Route exact path="/signin" element={ <SignIn /> } />
          <Route exact path="/home" element={ <Home /> } />
          <Route exact path="/newbook" element={ <NewBook /> } />
          <Route path="/*" element={ <NotFound /> } />
        </Routes>
        <Footer />
        <ToastContainer />
      </HeaderProvider>
    </>
  );
}

export default App;
