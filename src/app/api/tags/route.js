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
    const ress = collections.map((collection) => {
      const tags = collection.item.flatMap((item) => item.tags);
      return tags.filter((tag) => tag.toLowerCase().includes(query.toLocaleLowerCase()));
    });

    return new NextResponse(JSON.stringify(ress), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(`Database Error: ${error}`, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
