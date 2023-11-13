import { NextResponse } from "next/server";
import { connect } from "@/utils/connect";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request) => {
  const { collectionName, userEmail, collectionDescription, collectionTopic, collectionImage } = await request.json();

  await connect;

  try {
    await prisma.collection.create({
      data: {
        name: collectionName,
        username: userEmail,
        description: collectionDescription,
        topic: collectionTopic,
        image: collectionImage
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

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query')
  await connect;
  try {
    const collections = await prisma.collection.findMany();
    return new NextResponse(JSON.stringify(collections), { status: 200 });
  } catch (error) {
    return new NextResponse(`Database Error: ${error}`, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const DELETE = async (request) => {
  const { collectionId } = await request.json();

  await connect;

  try {
    await prisma.collection.deleteMany({ where: { id: collectionId } });

    return new NextResponse("Successfully deleted collection!", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  } finally {
    prisma.$disconnect();
  }
};
