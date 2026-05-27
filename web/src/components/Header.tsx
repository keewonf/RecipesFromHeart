import { Bell } from "lucide-react";
import profilePic from "../assets/profile.png";
import { useAuth } from "../hooks/useAuth";

export function Header() {
  const auth = useAuth();
  const profileImage = auth.session?.user.profileImageUrl ?? profilePic;

  return (
    <header className="relative z-10 flex w-full items-center justify-end gap-3 bg-[#eee4c0] px-4 py-3 shadow-[0_14px_18px_-18px_rgba(41,27,26,0.55)] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-stone-300/80 after:shadow-[0_8px_14px_rgba(41,27,26,0.18)] md:gap-5 md:px-8 md:py-2">
      <button
        type="button"
        aria-label="Notificações"
        className="rounded-full p-2 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-dark"
      >
        <Bell size={18} />
      </button>
      <img
        src={profileImage}
        alt="Foto de perfil do usuário"
        className="h-11 w-11 rounded-full border border-stone-300/50 bg-[#f7f0de] object-cover brightness-105 contrast-105 ring-1 ring-[#f7f0de] shadow-[0_1px_6px_rgba(41,27,26,0.12)] md:h-13 md:w-13"
      />
    </header>
  );
}
