import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./styles/reset.css";
import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/index.css";

import App from "./App.jsx";
import {FormProvider} from "./context/FormContext.jsx";
import {CartProvider} from "./context/CartContext.jsx";
// import { useFormContext } from "./hooks/useFormContext";

createRoot(document.getElementById("root")).render(
 <StrictMode>
  <CartProvider>
   <App />
  </CartProvider>
  <FormProvider>
   <App />
  </FormProvider>
 </StrictMode>
);
