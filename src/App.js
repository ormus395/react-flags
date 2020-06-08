import React from "react";
import "./App.css";

import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import CountryList from "./components/CountryList/CountryList";

function App() {
  return (
    <div className="App">
      <Header />
      <Search />
      <CountryList />
    </div>
  );
}

export default App;
