import React, { createContext, useContext, useMemo, useState } from "react";

const PostCommentContext = createContext(null);

export const PostProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const commentsByParentId = useMemo(() => {
    const group = {};
    comments.forEach((comment) => {
      if (comment?.mainDiscuss?.id) {
        group[comment?.mainDiscuss?.id] ||= [];
        group[comment?.mainDiscuss?.id].push(comment);
      } else {
        group[null] ||= [];
        group[null].push(comment);
      }
    });
    return group;
  }, [comments]);

  async function getDataComment({ API_FN, page }) {
    try {
      const response = await API_FN;
      if (page !== 1) {
        setComments([...comments, ...response.data?.data]);
      } else {
        setComments(response.data?.data);
      }
      setTotalPage(response.data?.total);
    } catch (error) {
      console.log(error);
    }
  }

  function getReplies(parentId) {
    return commentsByParentId[parentId] || [];
  }

  function updateComment({ commentId, data }) {
    const newData = comments.map((comment) =>
      comment?.id === commentId ? { ...comment, content: data } : comment
    );
    setComments([...newData]);
  }

  function addComment(data) {
    setComments([...comments, {...data}]);
  }

  //   function toggleLocalCommentLike(id, addLike) {
  //     setComments((prevComments) => {
  //       return prevComments.map((comment) => {
  //         if (id === comment.id) {
  //           if (addLike) {
  //             return {
  //               ...comment,
  //               likeCount: comment.likeCount + 1,
  //               likedByMe: true,
  //             };
  //           } else {
  //             return {
  //               ...comment,
  //               likeCount: comment.likeCount - 1,
  //               likedByMe: false,
  //             };
  //           }
  //         } else {
  //           return comment;
  //         }
  //       });
  //     });
  //   }

  return (
    <PostCommentContext.Provider
      value={{
        getReplies,
        getDataComment,
        updateComment,
        addComment,
        rootComment: commentsByParentId[null],
        currentTotalComment: comments.length,
        totalPage,
      }}
    >
      {children}
    </PostCommentContext.Provider>
  );
};

export const useCommentContext = () => useContext(PostCommentContext);
