import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/Home/Home";
import OldQuiz from "./components/OldQuiz";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/oldquizresults" component={OldQuiz} />
      </Switch>
      <Footer />
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
