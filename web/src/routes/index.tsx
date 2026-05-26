import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./AuthRoutes";
import { UserRoutes } from "./UserRoutes";
import { Loading } from "../components/Loading";
import { useAuth } from "../hooks/useAuth";

export function Routes() {
  const { session, isLoading } = useAuth();

  function Route() {
    switch (session?.user.role) {
      case "ADMIN":
        return <UserRoutes />;
      case "MODERATOR":
        return <UserRoutes />;
      case "USER":
        return <UserRoutes />;
      default:
        return <AuthRoutes />;
    }
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
