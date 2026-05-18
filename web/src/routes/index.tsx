import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./AuthRoutes";
import { UserRoutes } from "./UserRoutes";


export function Routes() {
  return (
    <BrowserRouter>
      <UserRoutes />
    </BrowserRouter>
  );
}
