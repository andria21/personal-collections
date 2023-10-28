import { styled } from "styled-components";

export const DarkModeContainer = styled.div`
    width: 45px;
    height: 20px;
    border: 1.5px solid #495E57;
    border-radius: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px;
    position: relative;
    cursor: pointer;
`;

export const Icon = styled.div`
    font-size: 12px;
`;

export const Ball = styled.div`
    width: 15px;
    height: 15px;
    background-color: #495E57;
    border-radius: 50%;
    position: absolute;
`;
