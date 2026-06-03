import { useState } from "react";
import { api } from "../services/api";

type ReactionType = "like" | "favorite";

// Types required by the hook to manage state
type UseRecipeReactionsParams = {
  recipeId: string;
  initialLiked: boolean;
  initialFavorites: boolean;
  initialLikesCount: number;
  initialFavoritesCount: number;
};

// Functions and state returned by the hook
type UseRecipeReactionsResult = {
  liked: boolean;
  favorited: boolean;

  likesCount: number;
  favoritesCount: number;

  toggleReaction: (type: ReactionType) => Promise<void>;

  liking: boolean;
  favoriting: boolean;
};

export function useRecipeReactions({
  recipeId,
  initialLiked,
  initialFavorites,
  initialLikesCount,
  initialFavoritesCount,
}: UseRecipeReactionsParams): UseRecipeReactionsResult {
  const [liked, setLiked] = useState(initialLiked);
  const [favorited, setFavorited] = useState(initialFavorites);

  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [favoritesCount, setFavoritesCount] = useState(initialFavoritesCount);

  const [liking, setLiking] = useState(false);
  const [favoriting, setFavoriting] = useState(false);

  async function toggleReaction(type: ReactionType) {
    if (type === "like") {
      if (liking) return;

      setLiking(true);

      const previousLiked = liked;
      const previousCount = likesCount;
      const nextLiked = !liked; // If already liked, next will be unliked, and vice versa

      setLiked(nextLiked);
      setLikesCount((current) => (nextLiked ? current + 1 : current - 1));

      try {
        if (previousLiked) {
          await api.delete(`/recipes/${recipeId}/likes`);
        } else {
          await api.post(`/recipes/${recipeId}/likes`);
        }
      } catch (error) {
        setLiked(previousLiked);
        setLikesCount(previousCount);
      } finally {
        setLiking(false);
      }

      return;
    }

    if (favoriting) return;

    setFavoriting(true);

    const previousFavorited = favorited;
    const previousCount = favoritesCount;
    const nextFavorited = !favorited;

    setFavorited(nextFavorited);
    setFavoritesCount((current) => (nextFavorited ? current + 1 : current - 1));

    try {
      if (previousFavorited) {
        await api.delete(`/recipes/${recipeId}/favorites`);
      } else {
        await api.post(`/recipes/${recipeId}/favorites`);
      }
    } catch (error) {
      setFavorited(previousFavorited);
      setFavoritesCount(previousCount);
    } finally {
      setFavoriting(false);
    }
  }

  return {
    liked,
    favorited,
    liking,
    favoriting,
    likesCount,
    favoritesCount,
    toggleReaction,
  };
}
