import { NextResponse } from "next/server";
import { connect } from "@/utils/connect";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request) => {
    await connect;

    const { id, buttonName } = await request.json();

    try {
        const user = await prisma.user.findMany({ where: { id: { in: id } } });

        if (buttonName === "block") {
            await prisma.user.updateMany({
                where: { id: { in: id } },
                data: {
                    isBlocked: true,
                },
            });
        } else if (buttonName === "unblock") {
            await prisma.user.updateMany({
                where: { id: { in: id } },
                data: {
                    isBlocked: false,
                },
            });
        } else if (buttonName === "delete") {
            await prisma.user.deleteMany({
                where: { id: { in: id } },
            });
        } else if (buttonName === "add-admin") {
            await prisma.user.updateMany({
                where: { id: { in: id } },
                data: {
                    isAdmin: true,
                },
            });
        } else {
            await prisma.user.updateMany({
                where: { id: { in: id } },
                data: {
                    isAdmin: false,
                },
            });
        }

        return new NextResponse(
            `User's admin access has been updated successfully!`,
            {
                status: 200,
            }
        );
    } catch (error) {
        return new NextResponse(`Database Error: ${error}`, { status: 500 });
    } finally {
        prisma.$disconnect();
    }
};
