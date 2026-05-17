import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./AuthRoutes";
import { AppLayout } from "../components/AppLayout";

export function Routes() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
