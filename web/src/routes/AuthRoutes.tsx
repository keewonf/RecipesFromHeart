import { Routes, Route } from "react-router";
import { SignIn } from "../pages/SignIn";
import { AuthLayout } from "../components/AuthLayout";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout title="Login" />}>
        <Route path="/" element={<SignIn />} />
      </Route>
    </Routes>
  );
}
