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
import ExportToCsvButton from "@/components/export-to-csv/ExportToCsvButton";
import ItemContainer from "@/components/item-container/ItemContainer";
import { handleDeleteItemForm, handleLikeForm, handleSubmitCommentForm, handleSubmitForm, handleSubmitTypesForm, handleUpdateCollectionNameForm } from "@/utils/handleActions";

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

  const handleSubmit = (e, buttonName) => {
    handleSubmitForm(e, buttonName, collectionId, session, mutate);
  };

  const handleSubmitTypes = (e, buttonName, inputMap) => {
    handleSubmitTypesForm(e, buttonName, inputMap, collectionId, mutate);
  };

  const handleUpdateCollectionName = (e) => {
    handleUpdateCollectionNameForm(e, collectionId, mutate);
  };

  const handleSubmitComment = (e, buttonName) => {
    handleSubmitCommentForm(e, buttonName, collectionId, mutate, session, itemId)
  };

  const handleLike = (buttonName, itemID, like) => {
    handleLikeForm(buttonName, itemID, like, collectionId, session, mutate);
  };

  const handleDeleteItem = (itemId) => {
    handleDeleteItemForm(itemId, collectionId, mutate);
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
                <ExportToCsvButton collectionData={data} />
              </div>
              <ItemContainer
                collection={collection}
                text={text}
                handleDeleteItem={handleDeleteItem}
                isOwner={isOwner}
                loggedUserName={loggedUserName}
                handleLike={handleLike}
                setShowAuthNotification={setShowAuthNotification}
                setShowComments={setShowComments}
                showComments={showComments}
                handleSubmitComment={handleSubmitComment}
                setItemId={setItemId}
                isAuthenticated={isAuthenticated}
              />
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
