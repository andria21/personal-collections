import { NextResponse } from "next/server";
import { connect } from "@/utils/connect";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  await connect;
  try {
    const collections = await prisma.collection.findMany();

    const results = collections.filter(collection =>
      collection.item.some(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    );

    return new NextResponse(JSON.stringify(results), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(`Database Error: ${error}`, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
