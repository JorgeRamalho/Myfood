ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "restaurantId" TEXT;
CREATE INDEX IF NOT EXISTS "User_role_idx" ON "User"("role");
CREATE INDEX IF NOT EXISTS "User_restaurantId_idx" ON "User"("restaurantId");
