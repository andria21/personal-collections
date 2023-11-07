"use client"

import { styled } from "styled-components";

export const InputTest = styled.input`
    display: ${(props) => (props.isVisible ? "block" : "none")};
    margin-left: 10px;
`;

export const SubmitButton = styled.button`
    display: ${(props) => (props.isVisible ? "block" : "none")};
    font-family: lato, sans-serif;
    font-weight: bold;
    font-size: 1em;
    letter-spacing: 0.1em;
    text-decoration: none;
    color: #ffffff;
    background-color: #191919;
    padding: 10px 40px;
    border: 2px solid #ffffff;
    cursor: pointer;
    &:hover {
        color: #000000;
        background-color: #ffffff;
    }
`;

export const ItemsContainer = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const ItemForm = styled.form`
    padding: 30px;
    width: 500px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    height: 100%;
    background: #113946;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
    margin-bottom: 15px;
`;

export const Label = styled.label`
    display: block;
    font-weight: bold;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    /* border-radius: 5px; */
`;

export const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

export const Button = styled.button`
    font-family: lato, sans-serif;
    font-weight: bold;
    font-size: 1em;
    letter-spacing: 0.1em;
    text-decoration: none;
    color: #ffffff;
    background-color: #191919;
    display: inline-block;
    padding: 10px 40px;
    position: relative;
    border: 2px solid #ffffff;
    width: 40%;
    cursor: pointer;
    &:hover {
        color: #000000;
        background-color: #ffffff;
    }
`;

export const CollectionDiv = styled.div``;

export const CollectionHeading = styled.h1`
    margin-bottom: 20px;
    text-align: center;
    border-bottom: 2px solid #419197;
`;

export const HeadingDiv = styled.div`
    width: 100%;
    padding: 0 10px 0 10px;
`;

export const CollectionName = styled.h3`
    cursor: pointer;
    background-color: #113946;
    border-radius: 10px;
    padding: 8px;
    margin-bottom: 16px;
    text-align: center;
`;
