import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { history } from "../utils/history";
import ScrollToTop from "../utils/scrollToTop";
import Header from "./common/Header";
import Footer from "./common/Footer";
import HomePage from "../containers/HomePage";
import SinglePage from "../containers/SinglePage";
import Blog from "../containers/Blog";
import SinglePost from "../containers/SinglePost";
import NotFound from "../components/errors/404";
import { ThemeProvider } from "../hooks/useTheme";

import "../dist/css/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

const App = () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "", // Use your WPGraphql url here. example: http://yourwebsite.com/wordpress/graphql
  });

  return (
    <ThemeProvider>
      <ToastContainer />
      <Router history={history}>
        <ScrollToTop>
          <Header />
          <ApolloProvider client={client}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/pages/:uri" component={SinglePage} />
              <Route exact path="/blog" component={Blog} />
              <Route exact path="/posts/:uri" component={SinglePost} />
              <Route path="/not-found" component={NotFound} />
              <Redirect to="/not-found" />
            </Switch>
            <Footer />
          </ApolloProvider>
        </ScrollToTop>
      </Router>
    </ThemeProvider>
  );
};

export default App;
