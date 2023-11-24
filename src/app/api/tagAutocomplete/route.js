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
    const matchingTags = new Set();

    collections.forEach((collection) => {
      collection.item.forEach((item) => {
        const tagsObject = item.tags;
        for (const key in tagsObject) {
          if (tagsObject.hasOwnProperty(key) && tagsObject[key].toLowerCase().includes(query.toLowerCase())) {
            matchingTags.add(tagsObject[key].toLowerCase());
          }
        }
      });
    });
    //not working!
    const uniqueMatchingTags = Array.from(matchingTags);

    console.log(uniqueMatchingTags);

    return new NextResponse(JSON.stringify(uniqueMatchingTags), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(`Database Error: ${error}`, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
