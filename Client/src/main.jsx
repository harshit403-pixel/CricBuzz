import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import router from "./routes";
import store from "./lib/store";
import { queryClient } from "./lib/queryClient";

import AuthBootstrap from "./components/AuthBootstrap";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AuthBootstrap>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </AuthBootstrap>
    </Provider>
  </QueryClientProvider>,
);