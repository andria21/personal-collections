import { NextResponse } from "next/server";
import { connect } from "@/utils/connect";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request, { params }) => {
  const {
    name,
    id,
    image,
    desc,
    topic,
    tags,
    buttonName,
    comment,
    commentUser,
    likeUser,
    like,
  } = await request.json();

  const { collectionId } = params;
  await connect;
  try {
    if (buttonName === "add-items") {
      await prisma.collection.update({
        where: { id: collectionId },
        data: {
          item: {
            push: {
              name,
              id,
              image,
              desc,
              topic,
              tags,

            },
          },
        },
      });
    } else if (buttonName === "update-items") {
      try {
        await prisma.collection.update({
          where: { id: collectionId },
          data: {
            item: {
              updateMany: {
                where: { id: id },
                data: {
                  name,
                  id,
                  image,
                  desc,
                  topic,
                  tags,
                },
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    } else if (buttonName === "add-comment") {
      await prisma.collection.update({
        where: { id: collectionId },
        data: {
          item: {
            updateMany: {
              where: { id: id },
              data: {
                comments: {
                  push: { commentUser, comment },
                },
              },
            },
          },
        },
      });
    } else if (buttonName === "like") {
      await prisma.collection.update({
        where: { id: collectionId },
        data: {
          item: {
            updateMany: {
              where: { id: id },
              data: {
                likes: {
                  push: { likeUser, like },
                },
              },
            },
          },
        },
      });
    } else if (buttonName === "update-like") {
      await prisma.collection.update({
        where: { id: collectionId },
        data: {
          item: {
            updateMany: {
              where: { id: id },
              data: {
                likes: {
                  deleteMany: {
                    where: { likeUser },
                  },
                },
              },
            },
          },
        },
      });
    }

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

export const DELETE = async (request, { params }) => {
  const { itemId } = await request.json();
  const { collectionId } = params;

  await connect;

  try {
    await prisma.collection.update({
      where: { id: collectionId },
      data: {
        item: {
          deleteMany: {
            where: { id: itemId }
          }
        }
      },
    });

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

// export const GET = async (request) => {
//     await connect;
//     try {
//         const users = await prisma.collection.findMany();
//         return new NextResponse(JSON.stringify(users), { status: 200 });
//     } catch (error) {
//         return new NextResponse(`Database Error: ${error}`, { status: 500 });
//     } finally {
//         prisma.$disconnect();
//     }
// };

/**
      comments: {
                commentUser: "",
                comment: "",
              },
              likes: {
                likeUser: "",
                like: false,
              },
 */