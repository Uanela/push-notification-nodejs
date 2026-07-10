import { PrismaQueryOptions } from 'arkos/prisma';
import { Prisma } from "@prisma/client"

const userQueryOptions: PrismaQueryOptions<Prisma.UserDelegate> = {

  global: {},
  find: {
    omit: {
      password: true,
    }, 
    include: {
      role: {
        include: {
          role: true,
        }
      },
    },
  },
  findOne: {
    include: {
      role: {
        include: {
          role: {
            include: {
              permissions: true
            }
          }
        }
      },
    },
  },
  findMany: {},
  update: {},
  updateMany: {},
  updateOne: {},
  create: {},
  createMany: {},
  createOne: {},
  save: {},
  saveMany: {},
  saveOne: {
    omit: {
      password: true,
    }, 
  },
  delete: {},
  deleteMany: {},
  deleteOne: {},
}

export default userQueryOptions;
