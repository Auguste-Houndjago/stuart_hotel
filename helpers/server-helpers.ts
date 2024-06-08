
import prisma from "@/save/indext";
import { error } from "console";

export const connectToDatabase = async () => {
    try {
        await prisma.$connect();
    } catch (error) {}
    console.log(error)
    throw new Error("imcapable de se connecter a la base");

} ;