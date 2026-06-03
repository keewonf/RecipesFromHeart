-- CreateTable
CREATE TABLE "recipe_likes" (
    "user_id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recipe_likes_pkey" PRIMARY KEY ("user_id","recipe_id")
);

-- CreateTable
CREATE TABLE "recipe_favorites" (
    "user_id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recipe_favorites_pkey" PRIMARY KEY ("user_id","recipe_id")
);

-- CreateIndex
CREATE INDEX "recipe_likes_recipe_id_idx" ON "recipe_likes"("recipe_id");

-- CreateIndex
CREATE INDEX "recipe_likes_user_id_idx" ON "recipe_likes"("user_id");

-- CreateIndex
CREATE INDEX "recipe_favorites_recipe_id_idx" ON "recipe_favorites"("recipe_id");

-- CreateIndex
CREATE INDEX "recipe_favorites_user_id_idx" ON "recipe_favorites"("user_id");

-- AddForeignKey
ALTER TABLE "recipe_likes" ADD CONSTRAINT "recipe_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_likes" ADD CONSTRAINT "recipe_likes_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_favorites" ADD CONSTRAINT "recipe_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_favorites" ADD CONSTRAINT "recipe_favorites_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
