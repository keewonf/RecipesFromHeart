import { Routes, Route } from "react-router";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { AuthLayout } from "../components/AuthLayout";
import { NotFound } from "../pages/NotFound";
import { Help } from "../pages/Help";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/help" element={<Help />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
