"use client";

import styled from "styled-components";

import Link from "next/link";

export const Container = styled.div`
  /* width: 100%;
  margin-top: 30px;
  padding: 0 90px 0 90px; */
  padding-top: 30px;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LinksContainer = styled.div`
  display: flex;
  gap: 10px;
  font-size: 1.0625em;
  align-items: center;
`;

export const NavLink = styled(Link)``;

export const Logo = styled(Link)`
  font-weight: bold;
  font-size: 1.8125em;
`;

export const Button = styled.button`
  background-color: #222;
  border-radius: 4px;
  border-style: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: "Farfetch Basis","Helvetica Neue",Arial,sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
  margin: 0;
  max-width: none;
  min-height: 24px;
  min-width: 10px;
  outline: none;
  overflow: hidden;
  padding: 9px 20px 8px;
  position: relative;
  text-align: center;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;

  &:hover, &:focus{
    opacity: .75;
  }
`