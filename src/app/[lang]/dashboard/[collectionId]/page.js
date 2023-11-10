"use client";

import useSWR from "swr";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import "./page.styles.scss";
import Image from "next/image";
import {
  AddItemsToCollectionForm,
  UpdateCollectionItemsForm,
  UpdateCollectionNameForm,
} from "@/components/forms/Forms";

import { getDictionary } from "../../../../../getDictionary";

export default function CollectionPage({ params }) {
  const session = useSession();
  const { collectionId } = params;

  const [text, setText] = useState({});

  useEffect(() => {
    const func = async () => {
      const lang = await getDictionary(params.lang);
      console.log(lang.page.dashboard);
      setText(lang.page.dashboard)
      
    };
    func();
  }, [params]);

  const [itemId, setItemId] = useState("");

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/collection/${collectionId}`,
    fetcher
  );

  useEffect(() => {}, []);

  const filteredLikeObjects = [];

  !isLoading &&
    data.map((col) => {
      col.item.map((a) => {
        const likedObjs = a.likes.filter((like) => like.like === true);
        // console.log(likedObjs);
        filteredLikeObjects.push(likedObjs);
      });
    });

  const isOwner =
    !isLoading && data.some((u) => u.username === session.data?.user.email);

  const handleSubmit = async (e, buttonName) => {
    e.preventDefault();

    const name = e.target[1].value;
    const id = e.target[2].value;
    const image = e.target[3].value;
    const desc = e.target[4].value;
    const topic = e.target[5].value;
    const tags = e.target[6].value;
    const comment = e.target[7].value;

    try {
      await fetch(`/api/collection/${collectionId}/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          id,
          image,
          desc,
          topic,
          tags,
          buttonName,
          comment,
          commentUser: session.data.user.name,
        }),
      });
      e.target[1].value = "";
      e.target[2].value = "";
      e.target[3].value = "";
      e.target[4].value = "";
      e.target[5].value = "";
      e.target[6].value = "";
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCollectionName = async (e) => {
    e.preventDefault();
    const name = e.target[1].value;
    try {
      await fetch(`/api/collection/${collectionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });
      e.target[0].value = "";
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitComment = async (e, buttonName) => {
    e.preventDefault();

    const comment = e.target[0].value;

    try {
      await fetch(`/api/collection/${collectionId}/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buttonName,
          comment,
          commentUser: session.data.user.name,
          id: itemId,
        }),
      });
      e.target[0].value = "";
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (buttonName, itemID, like) => {
    try {
      await fetch(`/api/collection/${collectionId}/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buttonName,
          like,
          likeUser: session.data?.user.name,
          id: itemID,
        }),
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await fetch(`/api/collection/${collectionId}/item`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
        }),
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };
  // NEED TO OPTIMIZE THE CODE FOR SURE!

  return (
    <div className="items-container">
      {!isLoading &&
        data.map((collection) => (
          <div key={collection.id}>
            <p className="cardHeading">{text.collection}: {collection.name}</p>
            <p className="cardHeading">{text.user}: {collection.username}</p>
            {collection.item.map((item) => (
              <div className="cardContainer">
                <span className="deleteItem" onClick={() => handleDeleteItem(item.id)}>X</span>
                <p className="cardHeading">{text.name}: {item.name}</p>
                <p className="cardHeading">{text.id}: {item.id}</p>
                <Image
                  src={item.image}
                  height={20}
                  width={800}
                  className="cardImage"
                />
                <h4>{text.topic}: {item.topic}</h4>
                <h4>{text.description}: {item.desc}</h4>
                <h4>{text.tags}: {item.tags}</h4>
                <div className="likesCommentsContainer">
                  <div className="countDiv">{item.likes.length} {text.likes}</div>
                  <div className="countDiv">
                    {item.comments.length} {text.comments}
                  </div>
                </div>
                <div className="actionsDiv">
                  <h4
                    className="customH4"
                    onClick={() => {
                      const alreadyLiked = item.likes.filter(
                        (like) => like.likeUser === session.data.user.name
                      );
                      if (alreadyLiked.length) {
                        handleLike("update-like", item.id, false);
                      } else {
                        handleLike("like", item.id, true);
                      }
                    }}
                  >
                  {text.like}
                  </h4>
                  <h4
                    className="customH4"
                    onClick={() => setShowComments(!showComments)}
                  >
                  {text.comment}
                  </h4>
                </div>
                <form
                  onSubmit={(e) => handleSubmitComment(e, "add-comment")}
                  className="commentsForm"
                >
                  <input
                    type="text"
                    id="comment"
                    name="comment"
                    placeholder={text.addComment}
                    className="commentInput"
                  />
                  <button
                    type="submit"
                    className="commentButton"
                    onClick={() => {
                      setItemId(item.id);
                    }}
                  >
                  {text.post}
                  </button>
                </form>
                <div>
                  {item.comments.map(({ commentUser, comment }) => (
                    <div className="commentsDiv">
                      {comment && (
                        <div className="commentsContainer">
                          <h5>{commentUser}</h5>
                          <p>{comment}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      {isOwner && (
        <div className="items-flex">
          <UpdateCollectionNameForm
            handleUpdateCollectionName={handleUpdateCollectionName}
          />
          <UpdateCollectionItemsForm handleSubmit={handleSubmit} />
          <AddItemsToCollectionForm handleSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
}

// NEED TO CREATE SEPARATE FORMS TO CHANGE COLLECTION NAME, ITEMS ETC...

/*
                    {!isLoading &&
                data.map((collection) => (
                    <div key={collection.id}>
                        <h1>{collection.name}</h1>
                        {collection.item.map((item) => (
                            <div>
                                <h6>ID: {item.id}</h6>
                                <h6>Name: {item.name}</h6>
                                <h6>Image: {item.image}</h6>
                                <h6>Topic: {item.topic}</h6>
                                <h6>Description: {item.desc}</h6>
                                <h6>Tags: {item.tags}</h6>
                                {item.comments.map(
                                    ({ commentUser, comment }) => (
                                        <div>
                                            <h6>{commentUser}</h6>
                                            <h6>Comment: {comment}</h6>
                                        </div>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                ))}
*/
