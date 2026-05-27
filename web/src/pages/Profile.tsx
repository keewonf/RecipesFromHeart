import { useEffect, useState, useRef } from "react";
import type { AxiosError } from "axios";

import profileImg from "../assets/profilePlaceholder.png";
import bgImg from "../assets/bg-image.jpg";
import { api } from "../services/api";
import { MyRecipes } from "./recipes/MyRecipes";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/Loading";

export function Profile() {
  const auth = useAuth();
  const [user, setUser] = useState<UserAPIResponse["user"] | null>(
    auth.session?.user ?? null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formName, setFormName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      setIsLoading(true);
      try {
        const response = await api.get<{ user: UserAPIResponse["user"] }>(
          "/users/me",
          { signal: controller.signal },
        );

        setUser(response.data.user);
      } catch (error) {
        const err = error as AxiosError | Error | any;
        // If the request was cancelled, just return silently
        if (err?.code === "ERR_CANCELED" || err?.name === "CanceledError") {
          return;
        }

        // Fallback to auth session user if available
        if (auth.session?.user) {
          setUser(auth.session.user);
        }
      } finally {
        setIsLoading(false);
      }
    }

    void loadProfile();

    return () => {
      controller.abort();
    };
  }, [auth.session?.user]);

  return (
    <div className="p-4">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="overflow-hidden rounded-3xl">
            <img src={bgImg} alt="" className="h-35 w-full object-cover" />
          </div>
          <div className="-mt-8 flex items-center gap-4 px-4">
            <div className="inline-flex rounded-full bg-white p-1 shadow-[0_6px_20px_rgba(41,27,26,0.16)]">
              <img
                src={previewUrl ?? user?.profileImageUrl ?? profileImg}
                alt={user?.name ?? "Imagem de perfil"}
                className="h-35 w-35 rounded-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-text-primary">
                  {user?.name ?? "Perfil"}
                </h1>
                {!isEditing && (
                  <button
                    onClick={() => {
                      setFormName(user?.name ?? null);
                      setPreviewUrl(null);
                      setSelectedFile(null);
                      setIsEditing(true);
                    }}
                    className="text-sm px-3 py-1 rounded-full border border-surface-dark hover:bg-surface-dark"
                  >
                    Editar perfil
                  </button>
                )}
              </div>
              <p className="text-sm text-text-secondary">{user?.email}</p>
            </div>
          </div>

          {isEditing && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  setIsLoading(true);

                  let profileImageUrl = user?.profileImageUrl ?? null;
                  let profileImageKey: string | null = null;

                  if (selectedFile) {
                    const fd = new FormData();
                    fd.append("file", selectedFile);

                    const uploadRes = await api.post("/uploads/profile", fd, {
                      headers: { "Content-Type": "multipart/form-data" },
                    });

                    profileImageUrl = uploadRes.data.imageUrl;
                    profileImageKey = uploadRes.data.imageKey;
                  }

                  const payload: any = {};
                  if (formName !== null) payload.name = formName;
                  payload.profileImageUrl = profileImageUrl;
                  payload.profileImageKey = profileImageKey;

                  const res = await api.patch<{
                    user: UserAPIResponse["user"];
                  }>("/users/me", payload);

                  setUser(res.data.user);
                  setIsEditing(false);
                } catch (err) {
                  // TODO: show user-facing error
                } finally {
                  setIsLoading(false);
                }
              }}
              className="mt-4 p-4 bg-surface-light rounded-2xl"
            >
              <div className="flex flex-col gap-3">
                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-1">Nome</span>
                  <input
                    value={formName ?? ""}
                    onChange={(e) => setFormName(e.target.value)}
                    className="rounded-md border p-2"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-1">
                    Foto de perfil
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files && e.target.files[0];
                      if (f) {
                        setSelectedFile(f);
                        setPreviewUrl(URL.createObjectURL(f));
                      }
                    }}
                  />
                </label>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-surface-dark text-white rounded-2xl"
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="px-4 py-2 border rounded-2xl"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          )}
          <p className="mt-3 px-4 text-lg leading-7 text-text-primary">
            {user?.role === "ADMIN"
              ? "Administrador da plataforma"
              : "Amante de doces e café. Compartilhando minhas receitas caseiras"}
          </p>
          <MyRecipes showHeader={false} />
        </>
      )}
    </div>
  );
}
