-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "startsAt" INTEGER NOT NULL,
    "endsAt" INTEGER NOT NULL,
    "vacancies" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityUser" (
    "id" SERIAL NOT NULL,
    "activityId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ActivityUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityUser" ADD CONSTRAINT "ActivityUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityUser" ADD CONSTRAINT "ActivityUser_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
