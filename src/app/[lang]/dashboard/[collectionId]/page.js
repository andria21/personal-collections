"use client";

import useSWR from "swr";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import "./page.styles.scss";
import Image from "next/image";
import {
  AddItemsToCollectionForm,
  AddTypesToItem,
  UpdateCollectionItemsForm,
  UpdateCollectionNameForm,
} from "@/components/forms/Forms";

import { getDictionary } from "../../../../../getDictionary";
import AuthNotification from "@/components/auth-notification/AuthNotification";
import { isAdmin } from "@/utils/isAdmin";
import { useUsers } from "@/contexts/usersContext";

export default function CollectionPage({ params }) {
  const session = useSession();
  const { collectionId } = params;
  const loggedUserName = session.data?.user.name;
  const loggedUserEmail = session.data?.user.email;
  const isAuthenticated = session.status === "authenticated" ? true : false;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showComments, setShowComments] = useState(null);
  const [showAuthNotification, setShowAuthNotification] = useState(false);

  const { users } = useUsers();

  const [text, setText] = useState({});
  useEffect(() => {
    const func = async () => {
      const lang = await getDictionary(params.lang);
      setText(lang.page.dashboard);
    };
    func();
  }, [params]);

  const [itemId, setItemId] = useState("");

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/collection/${collectionId}`,
    fetcher
  );

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
    (!isLoading && data.some((u) => u.username === session.data?.user.email)) ||
    isAdmin(isLoading, users, session);

  const handleSubmit = async (e, buttonName) => {
    e.preventDefault();

    const id = e.target[0].value;
    const name = e.target[1].value;
    // const image = e.target[2].value;
    const desc = e.target[2].value;
    const topic = e.target[3].value;
    const tags = e.target[4].value;
    const comment = e.target[5].value;

    try {
      await fetch(`/api/collection/${collectionId}/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          id,
          desc,
          topic,
          tags,
          buttonName,
          comment,
          commentUser: session.data.user.name,
        }),
      });
      e.target[0].value = "";
      e.target[1].value = "";
      e.target[2].value = "";
      e.target[3].value = "";
      e.target[4].value = "";
      e.target[5].value = "";
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitTypes = async (e, buttonName, inputMap) => {
    e.preventDefault();

    console.log(e.target[0].value, buttonName);
    const formData = {};

    const id = e.target[0].value;

    Object.keys(inputMap).forEach((type) => {
      const name = `${type}name`;
      const value = `${type}value`;

      const nameInput = e.target[name];
      const valueInput = e.target[value];

      if (nameInput && valueInput) {
        formData[name] = nameInput.value;
        formData[value] = valueInput.value;
      } else {
        console.error(`Input elements not found for ${type}`);
      }
    });

    console.log(formData);

    try {
      await fetch(`/api/collection/${collectionId}/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          formData,
          buttonName,
        }),
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCollectionName = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
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

    if (comment.length === 0) {
      alert("Comment can not be empty!");
      return;
    }

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
            <div className="items-div">
              <div className="collection-infos">
                <div className="collection-infos">
                  <p className="cardHeading">
                    {text.collection}: {collection.name}
                  </p>
                  <p className="cardHeading">
                    {text.user}: {collection.username}
                  </p>
                  {collection.image && (
                    <Image
                      src={collection.image}
                      height={20}
                      width={800}
                      className="cardImage"
                      alt="Item Image"
                    />
                  )}
                </div>
                <div className="editDiv">
                  {isOwner && (
                    <h3
                      className="editHeading"
                      onClick={() => setIsModalOpen(!isModalOpen)}
                    >
                      Edit
                    </h3>
                  )}
                </div>
              </div>
              <div className="items-flex">
                {collection.item.map((item) => (
                  <div className="cardContainer" key={item.id}>
                    {isOwner && (
                      <span
                        className="deleteItem"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        Delete
                      </span>
                    )}
                    <table className="table">
                      <thead>
                        <tr className="tr">
                          <th className="th">{text.id}</th>
                          <th className="th">{text.name}</th>
                          <th className="th">{text.topic}</th>
                          <th className="th">{text.description}</th>
                          <th className="th">{text.tags}</th>
                          {item.int1name && <th className="th">{item.int1name}</th>}
                          {item.int2name && <th className="th">{item.int2name}</th>}
                          {item.int3name && <th className="th">{item.int3name}</th>}
                          {item.string1name && <th className="th">{item.string1name}</th>}
                          {item.string2name && <th className="th">{item.string2name}</th>}
                          {item.string3name && <th className="th">{item.string3name}</th>}
                          {item.multiline1name && <th className="th">{item.multiline1name}</th>}
                          {item.multiline2name && <th className="th">{item.multiline2name}</th>}
                          {item.multiline3name && <th className="th">{item.multiline3name}</th>}
                          {item.boolean1name && <th className="th">{item.boolean1name}</th>}
                          {item.boolean2name && <th className="th">{item.boolean2name}</th>}
                          {item.boolean3name && <th className="th">{item.boolean3name}</th>}
                          {item.date1name && <th className="th">{item.date1name}</th>}
                          {item.date2name && <th className="th">{item.date2name}</th>}
                          {item.date3name && <th className="th">{item.date3name}</th>}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="tr">
                          <td className="td">{item.id}</td>
                          <td className="td">{item.name}</td>
                          <td className="td">{item.topic}</td>
                          <td className="td">{item.desc}</td>
                          <td className="td">{item.tags}</td>
                          {item.int1value && <td className="td">{item.int1value}</td>}
                          {item.int2value && <td className="td">{item.int2value}</td>}
                          {item.int3value && <td className="td">{item.int3value}</td>}
                          {item.string1value && <td className="td">{item.string1value}</td>}
                          {item.string2value && <td className="td">{item.string2value}</td>}
                          {item.string3value && <td className="td">{item.string3value}</td>}
                          {item.multiline1value && <td className="td">{item.multiline1value}</td>}
                          {item.multiline2value && <td className="td">{item.multiline2value}</td>}
                          {item.multiline3value && <td className="td">{item.multiline3value}</td>}
                          {item.boolean1value && <td className="td">{item.boolean1value}</td>}
                          {item.boolean2value && <td className="td">{item.boolean2value}</td>}
                          {item.boolean3value && <td className="td">{item.boolean3value}</td>}
                          {item.date1value && <td className="td">{item.date1value}</td>}
                          {item.date2value && <td className="td">{item.date2value}</td>}
                          {item.date3value && <td className="td">{item.date3value}</td>}
                        </tr>
                      </tbody>
                    </table>

                    <div className="likesCommentsContainer">
                      <div className="countDiv">
                        {item.likes.length} {text.likes}
                      </div>
                      <div className="countDiv">
                        {item.comments.length} {text.comments}
                      </div>
                    </div>
                    <div className="actionsDiv">
                      <h4
                        className={`likeH4 ${
                          item.likes.some(
                            (like) => like.likeUser === loggedUserName
                          )
                            ? "liked"
                            : ""
                        }`}
                        onClick={() => {
                          const alreadyLiked = item.likes.filter(
                            (like) => like.likeUser === loggedUserName
                          );
                          if (isAuthenticated) {
                            if (alreadyLiked.length) {
                              handleLike("update-like", item.id, false);
                            } else {
                              handleLike("like", item.id, true);
                            }
                          } else {
                            setShowAuthNotification(true);
                          }
                        }}
                      >
                        {item.likes.some(
                          (like) => like.likeUser === loggedUserName
                        )
                          ? text.liked
                          : text.like}
                      </h4>
                      <h4
                        className="commentH4"
                        onClick={() =>
                          setShowComments(
                            showComments === item.id ? null : item.id
                          )
                        }
                      >
                        {text.comment}
                      </h4>
                    </div>
                    {showComments === item.id && (
                      <div>
                        <form
                          onSubmit={(e) =>
                            handleSubmitComment(e, "add-comment")
                          }
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
                              if (isAuthenticated) {
                                setItemId(item.id);
                              } else {
                                setShowAuthNotification(true);
                              }
                            }}
                          >
                            {text.post}
                          </button>
                        </form>
                        <div>
                          {item.comments.map(
                            ({ commentUser, comment }, index) => (
                              <div className="commentsDiv" key={index}>
                                {comment && (
                                  <div className="commentsContainer">
                                    <h5>{commentUser}</h5>
                                    <p>{comment}</p>
                                  </div>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      {isOwner && isModalOpen && (
        <div className=" modalOverlay">
          <div className="modalFlex">
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <UpdateCollectionNameForm
                handleUpdateCollectionName={handleUpdateCollectionName}
              />
              <UpdateCollectionItemsForm handleSubmit={handleSubmit} />
              <AddItemsToCollectionForm handleSubmit={handleSubmit} />
              <AddTypesToItem handleSubmit={handleSubmitTypes} />
            </div>
            <div>
              <button
                className="closeModalButton"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showAuthNotification && (
        <AuthNotification onClose={() => setShowAuthNotification(false)} />
      )}
    </div>
  );
}
