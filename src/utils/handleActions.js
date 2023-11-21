export const handleSubmit = async (e, buttonName) => {
  e.preventDefault();

  const id = e.target[0].value;
  const name = e.target[1].value;
  const image = e.target[2].value;
  const desc = e.target[3].value;
  const topic = e.target[4].value;
  const tags = e.target[5].value;
  const comment = e.target[6].value;

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

export const handleSubmitTypes = async (e, buttonName, inputMap) => {
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

export const handleUpdateCollectionName = async (e) => {
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

export const handleSubmitComment = async (e, buttonName) => {
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

export const handleLike = async (buttonName, itemID, like) => {
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

export const handleDeleteItem = async (itemId) => {
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