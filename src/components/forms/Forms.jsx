"use Client";

import { useState } from "react";

import { inputMap } from "../input-map/InputMap";

export const UpdateCollectionNameForm = ({ handleUpdateCollectionName }) => {
  return (
    <form className="items-form" onSubmit={handleUpdateCollectionName}>
      <h1 className="title">Update the collection name</h1>
      <label className="label">Name:</label>
      <input
        placeholder="Enter name"
        type="text"
        id="name"
        name="name"
        className="input-test"
      />
      <button className="submit-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export const UpdateCollectionItemsForm = ({ handleSubmit }) => {
  return (
    <form
      onSubmit={(e) => handleSubmit(e, "update-items")}
      className="items-form"
    >
      <h1 className="title">Update an item of the collection using ID</h1>
      <label className="label">ID of the item to update:</label>
      <input
        type="text"
        id="id"
        name="id"
        className="input-test"
        placeholder="Enter id"
      />
      <label className="label">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        className="input-test"
        placeholder="Enter name"
      />
      <label className="label">Image:</label>
      <input
        type="text"
        id="image"
        name="image"
        className="input-test"
        placeholder="Enter image URL"
      />
      <label className="label">Desc:</label>
      <input
        type="text"
        id="desc"
        name="desc"
        className="input-test"
        placeholder="Enter description"
      />
      <label className="label">Topic:</label>
      <input
        type="text"
        id="topic"
        name="topic"
        className="input-test"
        placeholder="Enter topic"
      />
      <label className="label">#Tags:</label>
      <input
        type="text"
        id="tags"
        name="tags"
        className="input-test"
        placeholder="Enter tags"
      />
      <button className="submit-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export const AddItemsToCollectionForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e, "add-items")} className="items-form">
      <h1 className="title">Add items to the Collection</h1>
      <label className="label">ID:</label>
      <input
        type="text"
        id="id"
        name="id"
        required
        className="input-test"
        placeholder="Enter id"
      />
      <label className="label">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        className="input-test"
        placeholder="Enter name"
        required
      />
      <label className="label">Image (optional):</label>
      <input
        type="text"
        id="image"
        name="image"
        className="input-test"
        placeholder="Enter image URL (optional)"
      />
      <label className="label">Desc:</label>
      <input
        type="text"
        id="desc"
        name="desc"
        className="input-test"
        placeholder="Enter description"
        required
      />
      <label className="label">Topic:</label>
      <input
        type="text"
        id="topic"
        name="topic"
        className="input-test"
        placeholder="Enter topic"
        required
      />
      <label className="label">#Tags:</label>
      <input
        type="text"
        id="tags"
        name="tags"
        className="input-test"
        placeholder="Enter tags"
        required
      />

      <button className="submit-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export const AddTypesToItem = ({ handleSubmit }) => {
  const [show, setShow] = useState({
    ints: false,
    strings: false,
    multilines: false,
    booleans: false,
    dates: false,
  });

  return (
    <form
      onSubmit={(e) => handleSubmit(e, "add-types", inputMap)}
      className="items-form"
    >
      <h1 className="title">
        Add types <br />
        to Item
      </h1>
      <label className="label">ID:</label>
      <input
        type="text"
        id="id"
        name="id"
        required
        className="input-test"
        placeholder="Enter id"
      />
      <button
        className="typesButton"
        type="button"
        onClick={() =>
          setShow((prevShow) => ({ ...prevShow, ints: !show.ints }))
        }
      >
        Add Ints
      </button>
      <button
        className="typesButton"
        type="button"
        onClick={() =>
          setShow((prevShow) => ({ ...prevShow, strings: !show.strings }))
        }
      >
        Add Strings
      </button>
      <button
        className="typesButton"
        type="button"
        onClick={() =>
          setShow((prevShow) => ({ ...prevShow, multilines: !show.multilines }))
        }
      >
        Add Multilines
      </button>
      <button
        className="typesButton"
        type="button"
        onClick={() =>
          setShow((prevShow) => ({ ...prevShow, booleans: !show.booleans }))
        }
      >
        Add Booleans
      </button>
      <button
        className="typesButton"
        type="button"
        onClick={() =>
          setShow((prevShow) => ({ ...prevShow, dates: !show.dates }))
        }
      >
        Add Dates
      </button>

      {show.ints && (
        <div>
          {inputMap.int1}
          {inputMap.int2}
          {inputMap.int3}
        </div>
      )}
      {show.strings && (
        <div>
          {inputMap.string1}
          {inputMap.string2}
          {inputMap.string3}
        </div>
      )}
      {show.multilines && (
        <div>
          {inputMap.multiline1}
          {inputMap.multiline2}
          {inputMap.multiline3}
        </div>
      )}
      {show.booleans && (
        <div>
          {inputMap.boolean1}
          {inputMap.boolean2}
          {inputMap.boolean3}
        </div>
      )}
      {show.dates && (
        <div>
          {inputMap.date1}
          {inputMap.date2}
          {inputMap.date3}
        </div>
      )}

      <button className="submit-button" type="submit">
        Submit
      </button>
    </form>
  );
};
