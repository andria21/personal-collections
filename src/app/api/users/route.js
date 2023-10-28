import { NextResponse } from "next/server";
import { connect } from "@/utils/connect";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (request) => {
    await connect;
    try {
        const users = await prisma.user.findMany();
        return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (error) {
        return new NextResponse(`Database Error: ${error}`, { status: 500 });
    } finally {
        prisma.$disconnect();
    }
};

export const POST = async (request) => {
    await connect;
    const { id } = await request.json();

    try {
        await prisma.user.delete({ where: { id: id } });
        return new NextResponse("User has been deleted successfully!", {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(`Database Error: ${error}`, { status: 500 });
    } finally {
        prisma.$disconnect();
    }
};
