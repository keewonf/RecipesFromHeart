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
  const selectedFileName = selectedFile?.name ?? "Nenhum arquivo selecionado";

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
    <div className="p-4 md:p-6">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="overflow-hidden rounded-3xl">
            <img
              src={bgImg}
              alt=""
              className="h-28 w-full object-cover md:h-35"
            />
          </div>
          <div className="-mt-8 flex flex-col items-center gap-4 px-2 text-center md:flex-row md:items-end md:px-4 md:text-left">
            <div className="inline-flex rounded-full bg-white p-1 shadow-[0_6px_20px_rgba(41,27,26,0.16)]">
              <img
                src={previewUrl ?? user?.profileImageUrl ?? profileImg}
                alt={user?.name ?? "Imagem de perfil"}
                className="h-24 w-24 rounded-full object-cover md:h-35 md:w-35"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-start">
                <h1 className="text-2xl font-bold text-text-primary md:text-3xl">
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
                    className="rounded-full border border-surface-dark px-3 py-1 text-sm transition-colors hover:bg-surface-dark hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface-light"
                  >
                    Editar perfil
                  </button>
                )}
              </div>
              <p className="text-sm text-text-secondary md:text-base">
                {user?.email}
              </p>
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
              className="mt-4 rounded-3xl border border-stone-300 bg-white p-4 shadow-[0_8px_30px_rgba(41,27,26,0.08)] md:p-5"
            >
              <div className="flex flex-col gap-4">
                <label className="flex flex-col">
                  <span className="mb-1 text-sm font-medium text-text-primary">
                    Nome
                  </span>
                  <input
                    value={formName ?? ""}
                    onChange={(e) => setFormName(e.target.value)}
                    className="rounded-2xl border border-stone-300 bg-surface-light px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/60 focus:border-surface-dark focus:ring-2 focus:ring-surface-dark/10"
                    placeholder="Seu nome"
                  />
                </label>

                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-text-primary">
                    Foto de perfil
                  </span>

                  <label className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-dashed border-stone-300 bg-surface-light px-4 py-4 transition-colors hover:border-surface-dark hover:bg-surface-light-dark/40 focus-within:border-surface-dark focus-within:ring-2 focus-within:ring-surface-dark/10">
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
                      className="sr-only"
                    />

                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface-dark text-sm font-bold text-white shadow-sm">
                        ⬆
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-text-primary">
                          {selectedFile ? "Trocar imagem" : "Selecionar arquivo"}
                        </p>
                        <p className="truncate text-xs text-text-secondary">
                          {selectedFileName}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                  <button
                    type="submit"
                    className="rounded-2xl bg-surface-dark px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-dark focus-visible:ring-offset-2 focus-visible:ring-offset-white"
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
                    className="rounded-2xl border border-stone-300 px-4 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-dark focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          )}
          <p className="mt-3 px-2 text-base leading-7 text-text-primary md:px-4 md:text-lg">
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
