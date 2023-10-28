"use client";

import { styled } from "styled-components";
import Image from "next/image";

export const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const CardContainer = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px;
`;

export const UserName = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

export const PostImage = styled(Image)`
  width: 100%;
  height: 100%;
  /* height: auto;
  width: auto; */
  object-fit: cover;
`;

export const LikesComments = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

export const LikeCount = styled.div`
  color: #007bff;
`;

export const CommentCount = styled.div`
  color: #007bff;
`;

export const ActionsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 12px;
  margin-top: 12px;
  border-top: 1px solid #3A3B3C;
  border-bottom: 1px solid #3A3B3C;
`;

//                                          COMMENT CONTAINER  ///////////

export const CommentContainer = styled.div`
  /* border-top: 1px solid #ccc; */
  /* margin-top: 16px; */
  padding-top: 16px;
`;

export const CommentUserName = styled.h5``;

export const CommentDiv = styled.div`
  background-color: #3A3B3C;
  border-radius: 10px;
  padding: 8px;
  margin-bottom: 16px;
`

export const H4 = styled.h4`
  cursor: pointer;
`;

export const Comment = styled.div`
  margin-bottom: 8px;
`;

export const CommentInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 8px;
`;

export const CommentButton = styled.button`
  margin-top: 8px;
  background-color: #3A3B3C;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
