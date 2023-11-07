"use client";

import styled from "styled-components";

import Link from "next/link";

export const Container = styled.div`
    /* width: 100%;
  margin-top: 30px;
  padding: 0 90px 0 90px; */
    padding-top: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #323235;
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

export const NavLink = styled(Link)`
    margin-left: 20px;
    /* text-decoration: none;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0;
        left: 0;
        background: transparent;
        transition: background 0.3s ease;
    } */
/* 
    &:hover::after {
        background: #ffffff;
    } */
`;

export const Logo = styled(Link)`
    font-weight: bold;
    font-size: 26px;

    &:hover {
        color: #ff9900;
    }
`;

export const Button = styled.button`
    background-color: #222;
    border-radius: 4px;
    border-style: none;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: "Farfetch Basis", "Helvetica Neue", Arial, sans-serif;
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

    &:hover,
    &:focus {
        opacity: 0.75;
    }
`;

export const SignOutButton = styled.button`
    background-color: #435B66;
    color: #000;
    border: none;
    padding: 10px 20px;
    cursor: pointer;

    &:hover {
        background-color: #2D4356;
        color: #fff;
    }
`;
