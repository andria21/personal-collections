import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connect } from "@/utils/connect";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request) => {
    const { name, email, password } = await request.json();

    await connect;

    const hashedPassword = await bcrypt.hash(password, 5);

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                likedItems: [],
                lastName: "",
                profilePic: "",
                backgroundPic: "",
            },
        });

        return new NextResponse(JSON.stringify(newUser), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse(error.message, {
            status: 500,
        });
    } finally {
        prisma.$disconnect();
    }
};
