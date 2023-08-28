import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import "./App.css";
import { useStateContext } from "./contexts/ContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoutingModule from "./routes/Routes";


const App = () => {
  const client = new QueryClient();
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    showUI,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <QueryClientProvider client={client}>
      <div className={currentMode === "Dark" ? "dark" : ""}>
      <Router>
        <div className="flex relative dark:bg-main-dark-bg">
          {showUI ? (
            <>
              {/* <div
                className="fixed right-4 bottom-4"
                style={{ zIndex: "1000" }}
              >
                <TooltipComponent content="Settings" position={"TopCenter"}>
                  <button
                    type="button"
                    onClick={() => setThemeSettings(true)}
                    style={{ background: currentColor, borderRadius: "50%" }}
                    className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  >
                    <FiSettings />
                  </button>
                </TooltipComponent>
              </div> */}
              {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                  <Sidebar />
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  <Sidebar />
                </div>
              )}
            </>
          ) : null}
          <div
            className={
              activeMenu
                ? `dark:bg-main-dark-bg  bg-main-bg min-h-screen ${
                    showUI ? "md:ml-72" : null
                  } w-full`
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            {showUI ? (
              <div className="sticky md:sticky z-1000 bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
            ) : null}
            <div className="h-[80%]">
              {/* {themeSettings && <ThemeSettings />}   */}
              <RoutingModule />
            </div>
            {/* {showUI ? <Footer /> : null} */}
          </div>
        </div>
      </Router>
    </div>
    <ReactQueryDevtools initialIsOpen={false}/>
    <ToastContainer position={'top-right'} autoClose={1000} style={{zIndex: 20000}}/>
    </QueryClientProvider>
  );
};

export default App;
