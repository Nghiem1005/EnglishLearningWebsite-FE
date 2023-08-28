import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RoutingModule from "./routes/Routes";
import ScrollTop from "./components/scrollTop";
import { useStateContext } from "./contexts/ContextProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createBrowserHistory } from "history";

const ToolSupportScreen = React.lazy(() =>
  import("./screens/ToolSupportScreen")
);
const Header = React.lazy(() => import("./components/common/header/Header"));
const Footer = React.lazy(() =>
  wait(1000).then(() => import("./components/common/footer/Footer"))
);

function App() {
  const client = new QueryClient();
  const { authUI } = useStateContext();

  return (
    <QueryClientProvider client={client}>
      <Router history={createBrowserHistory}>
        {/* <UserContainer/> */}
        {authUI ? null : (
          <Suspense fallback={null}>
            <Header />
          </Suspense>
        )}
        <ScrollTop>
          <RoutingModule />
        </ScrollTop>
        {authUI ? null : (
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        )}
      </Router>
      {authUI ? null : (
        <Suspense fallback={null}>
          <ToolSupportScreen />
        </Suspense>
      )}
      <ToastContainer
        position={"top-right"}
        autoClose={1000}
        style={{ zIndex: 20000 }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default App;
