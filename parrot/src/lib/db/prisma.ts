import { PrismaClient } from '@prisma/client';

//Function to create prismaClient instance to ensure only one instance is created.
const prismaClientSingleton = () => {
    return new PrismaClient();
}

//create a type alias  for the prismaClientSingleton singleton client
//it ensure the safety when working with PrismaClient instance
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

//access global context using globalThis
const globalForPrisma = globalThis as unknown as {prisma:  PrismaClientSingleton | undefined};

//retrieving the client if exist otherwise creating it
const  prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

//store the client in the global state if the environment is not a production one
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}