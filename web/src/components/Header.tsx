import { Bell } from "lucide-react";
import profilePic from "../assets/profile.png";

export function Header() {
  return (
    <header className="relative z-10 flex w-full items-center justify-end gap-5 bg-[#eee4c0] px-8 py-2 shadow-[0_14px_18px_-18px_rgba(41,27,26,0.55)] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-stone-300/80 after:shadow-[0_8px_14px_rgba(41,27,26,0.18)]">
      <Bell />
      <img
        src={profilePic}
        alt="profilePicture"
        className="h-13 w-13 rounded-full border border-stone-300/50 bg-[#f7f0de] object-cover brightness-105 contrast-105 ring-1 ring-[#f7f0de] shadow-[0_1px_6px_rgba(41,27,26,0.12)]"
      />
    </header>
  );
}
