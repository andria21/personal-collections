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
    formData,
  } = await request.json();

  console.log(formData);

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
      const updateData = {};
    
      // Add fields to updateData only if they are non-empty
      if (name !== undefined && name !== null && name !== "") {
        updateData.name = name;
      }
    
      if (image !== undefined && image !== null && image !== "") {
        updateData.image = image;
      }
    
      if (desc !== undefined && desc !== null && desc !== "") {
        updateData.desc = desc;
      }
    
      if (topic !== undefined && topic !== null && topic !== "") {
        updateData.topic = topic;
      }
    
      if (tags !== undefined && tags !== null && tags.length > 0) {
        updateData.tags = tags;
      }
    
      try {
        await prisma.collection.update({
          where: { id: collectionId },
          data: {
            item: {
              updateMany: {
                where: { id: id },
                data: updateData,
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    } else if (buttonName === "add-types") {
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          // console.log(`${key}: ${formData[key]}`);
          const value = formData[key];
          // const displayValue = typeof value === 'string' && /^\d+$/.test(value) ? parseInt(value, 10) : value;
          if (value !== null && value !== undefined && value !== "") {
            console.log(value);
            try {
              await prisma.collection.update({
                where: { id: collectionId },
                data: {
                  item: {
                    updateMany: {
                      where: { id: id },
                      data: {
                        [key]: value,
                      },
                    },
                  },
                },
              });
            } catch (error) {
              console.log(error);
            }
          }
        }
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
            where: { id: itemId },
          },
        },
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
