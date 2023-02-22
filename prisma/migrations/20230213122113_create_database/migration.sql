-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "userId" VARCHAR(36) NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "surname" VARCHAR(20) NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "password" VARCHAR(15) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "todoId" VARCHAR(36) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_userId_key" ON "user"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "todo_id_key" ON "todo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "todo_todoId_key" ON "todo"("todoId");

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
