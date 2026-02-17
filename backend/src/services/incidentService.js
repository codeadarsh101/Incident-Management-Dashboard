
// At Database Level..

const prisma = require("../config/prisma");

// CREATE INCIDENT
exports.createIncident = async (data) => {
  return prisma.incident.create({ data });
};

//     GET SINGLE INCIDENT BYID
exports.getIncidentById = async (id) => {
  return prisma.incident.findUnique({
    where: { id },
  });
};

// UPDATE INCIDENT
exports.updateIncident = async (id, data) => {
  return prisma.incident.update({
    where: { id },
    data,
  });
};


// GET INCIDENTS WITH (PAGINATION + FILTER + SEARCH + SORT)

exports.getIncidents = async (query) => {
  const {
  page = 1,
  limit = 10,
  search,
  severity,
  status,
  order = "desc", // newest first default
} = query;


  const skip = (page - 1) * limit;

  
  const where = {
    AND: [
      search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { summary: { contains: search, mode: "insensitive" } },
            ],
          }
        : {},
      severity ? { severity } : {},
      status ? { status } : {},
    ],
  };

  // SORT logic
  const orderBy = {
  createdAt: order === "asc" ? "asc" : "desc",
};


  const incidents = await prisma.incident.findMany({
    where,
    skip: Number(skip),
    take: Number(limit),
    orderBy,
  });

  const total = await prisma.incident.count({ where });

  return {
    data: incidents,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

