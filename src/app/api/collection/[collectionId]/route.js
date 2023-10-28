import { NextResponse } from "next/server";
import { connect } from "@/utils/connect";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (request, { params }) => {
    await connect;

    const { collectionId } = params;

    console.log(collectionId);

    try {
        const collections = await prisma.collection.findMany({
            where: { id: collectionId },
        });
        return new NextResponse(JSON.stringify(collections), { status: 200 });
    } catch (error) {
        return new NextResponse(`Database Error: ${error}`, { status: 500 });
    } finally {
        prisma.$disconnect();
    }
};

// export const POST = async (request, { params }) => {
//     const { collectionName, name, id, image, desc, topic, tags, userEmail } =
//         await request.json();

//     await connect;

//     // now user has collection field and we can push this to the user

//     try {
//         await prisma.collection.create({
//             data: {
//                 name: collectionName,
//                 username: userEmail,
//                 item: [
//                     {
//                         name,
//                         id,
//                         image,
//                         desc,
//                         topic,
//                         tags,
//                     },
//                 ],
//             },
//         });

//         return new NextResponse("Success!", { status: 200 });
//     } catch (error) {
//         console.log(error);
//         return new NextResponse(error.message, {
//             status: 500,
//         });
//     } finally {
//         prisma.$disconnect();
//     }
// };
