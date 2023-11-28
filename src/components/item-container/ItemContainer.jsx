export default function ItemContainer({
  collection,
  text,
  handleDeleteItem,
  handleLike,
  setShowAuthNotification,
  setShowComments,
  showComments,
  handleSubmitComment,
  setItemId,
  isAuthenticated,
  isOwner,
  loggedUserName,
}) {
  return (
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
          <div className="tableContainer">
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
                  {item.string1name && (
                    <th className="th">{item.string1name}</th>
                  )}
                  {item.string2name && (
                    <th className="th">{item.string2name}</th>
                  )}
                  {item.string3name && (
                    <th className="th">{item.string3name}</th>
                  )}
                  {item.multiline1name && (
                    <th className="th">{item.multiline1name}</th>
                  )}
                  {item.multiline2name && (
                    <th className="th">{item.multiline2name}</th>
                  )}
                  {item.multiline3name && (
                    <th className="th">{item.multiline3name}</th>
                  )}
                  {item.boolean1name && (
                    <th className="th">{item.boolean1name}</th>
                  )}
                  {item.boolean2name && (
                    <th className="th">{item.boolean2name}</th>
                  )}
                  {item.boolean3name && (
                    <th className="th">{item.boolean3name}</th>
                  )}
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
                  {item.string1value && (
                    <td className="td">{item.string1value}</td>
                  )}
                  {item.string2value && (
                    <td className="td">{item.string2value}</td>
                  )}
                  {item.string3value && (
                    <td className="td">{item.string3value}</td>
                  )}
                  {item.multiline1value && (
                    <td className="td">{item.multiline1value}</td>
                  )}
                  {item.multiline2value && (
                    <td className="td">{item.multiline2value}</td>
                  )}
                  {item.multiline3value && (
                    <td className="td">{item.multiline3value}</td>
                  )}
                  {item.boolean1value && item.boolean1name && (
                    <td className="td">{item.boolean1value}</td>
                  )}
                  {item.boolean2value && item.boolean2name && (
                    <td className="td">{item.boolean2value}</td>
                  )}
                  {item.boolean3value && item.boolean3name && (
                    <td className="td">{item.boolean3value}</td>
                  )}
                  {item.date1value && <td className="td">{item.date1value}</td>}
                  {item.date2value && <td className="td">{item.date2value}</td>}
                  {item.date3value && <td className="td">{item.date3value}</td>}
                </tr>
              </tbody>
            </table>
          </div>

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
                item.likes.some((like) => like.likeUser === loggedUserName)
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
              {item.likes.some((like) => like.likeUser === loggedUserName)
                ? text.liked
                : text.like}
            </h4>
            <h4
              className="commentH4"
              onClick={() =>
                setShowComments(showComments === item.id ? null : item.id)
              }
            >
              {text.comment}
            </h4>
          </div>
          {showComments === item.id && (
            <div>
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
                {item.comments.map(({ commentUser, comment }, index) => (
                  <div className="commentsDiv" key={index}>
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
          )}
        </div>
      ))}
    </div>
  );
}
