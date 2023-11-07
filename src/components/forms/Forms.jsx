"use Client";

import { useState } from "react";

export const UpdateCollectionNameForm = ({ handleUpdateCollectionName }) => {
  const [collectionNameVisible, setCollectionNameVisible] = useState(false);
  return (
    <form className="items-form" onSubmit={handleUpdateCollectionName}>
      <h1 className="title">Update the collection name</h1>
      <button
        type="button"
        className="button"
        onClick={() => setCollectionNameVisible(!collectionNameVisible)}
      >
        {collectionNameVisible ? "Hide" : "Show"}
      </button>
      <label className={`label ${collectionNameVisible ? "visible" : ""}`}>
        Name:
      </label>
      <input
        placeholder="Enter text"
        type="text"
        id="name"
        name="name"
        className={`input-test ${collectionNameVisible ? "visible" : ""}`}
      />
      <button
        className={`submit-button ${collectionNameVisible ? "visible" : ""}`}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export const UpdateCollectionItemsForm = ({ handleSubmit }) => {
  const [collectionUpdateVisible, setCollectionUpdateVisible] = useState(false);
  return (
    <form
      onSubmit={(e) => handleSubmit(e, "update-items")}
      className="items-form"
    >
      <h1 className="title">Update an item of the collection using ID</h1>
      <button
        type="button"
        className="button"
        onClick={() => setCollectionUpdateVisible(!collectionUpdateVisible)}
      >
        {collectionUpdateVisible ? "Hide" : "Show"}
      </button>
      <div className="form-group">
        <label className={`label ${collectionUpdateVisible ? "visible" : ""}`}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`input-test ${collectionUpdateVisible ? "visible" : ""}`}
        />
      </div>
      <div className="form-group">
        <label className={`label ${collectionUpdateVisible ? "visible" : ""}`}>
          ID of the item you want to update:
        </label>
        <input
          type="text"
          id="id"
          name="id"
          className={`input-test ${collectionUpdateVisible ? "visible" : ""}`}
        />
      </div>
      <div className="form-group">
        <label className={`label ${collectionUpdateVisible ? "visible" : ""}`}>
          Image:
        </label>
        <input
          type="text"
          id="image"
          name="image"
          className={`input-test ${collectionUpdateVisible ? "visible" : ""}`}
        />
      </div>
      <div className="form-group">
        <label className={`label ${collectionUpdateVisible ? "visible" : ""}`}>
          Desc:
        </label>
        <input
          type="text"
          id="desc"
          name="desc"
          className={`input-test ${collectionUpdateVisible ? "visible" : ""}`}
        />
      </div>
      <div className="form-group">
        <label className={`label ${collectionUpdateVisible ? "visible" : ""}`}>
          Topic:
        </label>
        <input
          type="text"
          id="topic"
          name="topic"
          className={`input-test ${collectionUpdateVisible ? "visible" : ""}`}
        />
      </div>
      <div className="form-group">
        <label className={`label ${collectionUpdateVisible ? "visible" : ""}`}>
          #Tags:
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          className={`input-test ${collectionUpdateVisible ? "visible" : ""}`}
        />
      </div>
      <button
        className={`submit-button ${collectionUpdateVisible ? "visible" : ""}`}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export const AddItemsToCollectionForm = ({ handleSubmit }) => {
  const [addItemsVisible, setAddItemsVisible] = useState(false);
  return (
    <form onSubmit={(e) => handleSubmit(e, "add-items")} className="items-form">
      <h1 className="title">Add items to the Collection</h1>
      <button
        type="button"
        className="button"
        onClick={() => setAddItemsVisible(!addItemsVisible)}
      >
        {addItemsVisible ? "Hide" : "Show"}
      </button>
      <div>
        <label className={`label ${addItemsVisible ? "visible" : ""}`}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`input-test ${addItemsVisible ? "visible" : ""}`}
        />
      </div>
      <div>
        <label className={`label ${addItemsVisible ? "visible" : ""}`}>
          ID:
        </label>
        <input
          type="text"
          id="id"
          name="id"
          required
          className={`input-test ${addItemsVisible ? "visible" : ""}`}
        />
      </div>
      <div>
        <label className={`label ${addItemsVisible ? "visible" : ""}`}>
          Image:
        </label>
        <input
          type="text"
          id="image"
          name="image"
          className={`input-test ${addItemsVisible ? "visible" : ""}`}
        />
      </div>
      <div>
        <label className={`label ${addItemsVisible ? "visible" : ""}`}>
          Desc:
        </label>
        <input
          type="text"
          id="desc"
          name="desc"
          className={`input-test ${addItemsVisible ? "visible" : ""}`}
        />
      </div>
      <div>
        <label className={`label ${addItemsVisible ? "visible" : ""}`}>
          Topic:
        </label>
        <input
          type="text"
          id="topic"
          name="topic"
          className={`input-test ${addItemsVisible ? "visible" : ""}`}
        />
      </div>
      <div>
        <label className={`label ${addItemsVisible ? "visible" : ""}`}>
          #Tags:
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          className={`input-test ${addItemsVisible ? "visible" : ""}`}
        />
      </div>
      <button
        className={`submit-button ${addItemsVisible ? "visible" : ""}`}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

// <div>
//         <Label>Comment:</Label>
//         <Input
//           type="text"
//           id="comment"
//           name="comment"
//           className={`input-test ${addItemsVisible ? "visible" : ""}`}
//         />
//       </div>
