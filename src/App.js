import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import { Navbar, Exchanges, Cryptocurrencies, CryptoDetails, News, HomePage } from "./components";
import "./App.scss";


const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/" render={() => <HomePage />} />
              <Route exact path="/exchanges" render={() => <Exchanges />} />
              <Route exact path="/cryptocurrencies" render={() => <Cryptocurrencies />} />
              <Route exact path="/crypto/:coinId" render={() => <CryptoDetails />} />
              <Route exact path="/news" render={() => <News />} />
            </Switch>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{ color: "white", textAlign: "center" }}>
            CryptoDaily <br />
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
