type UserAPIRole = "USER" | "MODERATOR" | "ADMIN";

type UserAPIResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserAPIRole;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
};
