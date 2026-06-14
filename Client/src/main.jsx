import ReactDOM from "react-dom/client";
import { queryClient } from "./lib/queryClient.js";
import { RouterProvider } from "react-router-dom";
import router from "./App.jsx";

import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./lib/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </QueryClientProvider>,
);
