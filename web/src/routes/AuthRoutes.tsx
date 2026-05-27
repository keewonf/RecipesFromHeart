import { Routes, Route } from "react-router";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { AuthLayout } from "../components/AuthLayout";
import { PublicLayout } from "../components/PublicLayout";
import { NotFound } from "../pages/NotFound";
import { Help } from "../pages/Help";
import { Home } from "../pages/Home";
import { CommunityRecipes } from "../pages/recipes/CommunityRecipes";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="/recipes/community" element={<CommunityRecipes />} />
      </Route>
      <Route path="/signin" element={<AuthLayout />}>
        <Route index element={<SignIn />} />
      </Route>
      <Route path="/signup" element={<AuthLayout />}>
        <Route index element={<SignUp />} />
      </Route>
      <Route path="/help" element={<AuthLayout />}>
        <Route index element={<Help />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
