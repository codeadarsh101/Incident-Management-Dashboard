const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const services = ["payments", "auth", "search", "billing", "api-gateway"];
const severities = ["SEV1", "SEV2", "SEV3", "SEV4"];
const statuses = ["OPEN", "MITIGATED", "RESOLVED"];

async function main() {
  console.log("Seeding database...");

  for (let i = 0; i < 200; i++) {
    await prisma.incident.create({
      data: {
        title: faker.hacker.phrase(),
        service: faker.helpers.arrayElement(services),
        severity: faker.helpers.arrayElement(severities),
        status: faker.helpers.arrayElement(statuses),
        owner: faker.internet.username(),
        summary: faker.lorem.sentence(),
      },
    });
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
