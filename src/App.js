import logo from "./logo.svg";
import "./App.css";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Leftsidebar from "./components/layout/Menu/Leftsidebar";
import SliderContent from "./components/layout/Menu/SliderContent";
import Update from "./components/Member/Update";
import BlogRate from "./components/Blog/BlogRate";
import Rate from "./components/Blog/Rate";
import Edit from "./components/My-product/Edit";
function App(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}

export default App;
