import { NextResponse } from "next/server";
import { connect } from "@/utils/connect";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (request, { params }) => {
    await connect;

    const { collectionId } = params;

    // console.log(collectionId);

    try {
        const collection = await prisma.collection.findMany({
            where: { id: collectionId },
        });
        return new NextResponse(JSON.stringify(collection), { status: 200 });
    } catch (error) {
        return new NextResponse(`Database Error: ${error}`, { status: 500 });
    } finally {
        prisma.$disconnect();
    }
};

export const POST = async (request, { params }) => {
    const { name } = await request.json();

    const { collectionId } = params;

    await connect;

    try {
        const collection = await prisma.collection.update({
            where: { id: collectionId },
            data: {
                name,
            },
        });
        return new NextResponse("Success!", { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse(error.message, {
            status: 500,
        });
    } finally {
        prisma.$disconnect();
    }
};
