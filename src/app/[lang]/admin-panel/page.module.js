import { styled } from "styled-components";

export const TableContainer = styled.div`
    width: 100%;
    max-width: 640px;
    /* margin-top: 50px; */
    
`;

export const TableDiv = styled.div`
    /* display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #242526;
    padding: 5px; */
`;

export const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #242526;
    padding: 5px;
`;

export const H4 = styled.h4`
    cursor: pointer;
`;

export const BlockButton = styled.a`
  display: inline-block;
  padding: 0.6em 1.7em;
  border: 0.1em solid #3A3B3C;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    color: #000000;
    background-color: #ffffff;
  }
`;

export const Td = styled.td`
  padding: 20px;
  border: 1px solid #3A3B3C;
  text-align: center;
`;
export const Th = styled.th`
  padding: 20px;
  border: 1px solid #3A3B3C;
`;

export const Tr = styled.tr`
  border: 1px solid #3A3B3C;
  border-collapse: collapse;
  border-radius: 10px;
`;

export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  padding-bottom: 150px;
`;