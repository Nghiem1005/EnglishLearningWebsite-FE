import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/authProvider";
import { ContextProvider } from "./contexts/ContextProvider";
import "./index.css";
import { PostProvider } from "./contexts/postProvider";
import { ChatProvider } from "./contexts/chatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <AuthProvider>
        <PostProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </PostProvider>
      </AuthProvider>
    </ContextProvider>
  </React.StrictMode>
);
