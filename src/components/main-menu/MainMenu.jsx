"use client";

import React, { useState } from "react";
import {
  ActionsDiv,
  CardContainer,
  Comment,
  CommentButton,
  CommentContainer,
  CommentCount,
  CommentDiv,
  CommentInput,
  CommentUserName,
  Container,
  H4,
  LikeCount,
  LikesComments,
  PostImage,
  UserName,
} from "./main-menu.module";

export default function MainMenu() {
  const [showComments, setShowComments] = useState(false);

  return (
    <Container>
      <CardContainer>
        <UserName>Andria</UserName>
        <PostImage
          src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Post"
          width={800}
          height={20}
        />
        <LikesComments>
          <LikeCount>63 Likes</LikeCount>
          <CommentCount>12 Comments</CommentCount>
        </LikesComments>
        <ActionsDiv>
          <H4>Like</H4>
          <H4 onClick={() => setShowComments(!showComments)}>Comment</H4>
        </ActionsDiv>
        {showComments && (
          <CommentContainer>
            <CommentDiv>
              <CommentUserName>Linda</CommentUserName>
              <Comment>This is a great post!</Comment>
            </CommentDiv>
            <CommentDiv>
              <CommentUserName>Branda</CommentUserName>
              <Comment>I love it!</Comment>
            </CommentDiv>

            <CommentInput type="text" placeholder="Add a comment" />
            <CommentButton>Post</CommentButton>
          </CommentContainer>
        )}
      </CardContainer>
    </Container>
  );
}
