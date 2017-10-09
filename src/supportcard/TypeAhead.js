import React from "react";
import styled from "styled-components";

const AutoSuggestContainer = styled.div`position: relative;`;

const AutoSuggestInput = styled.div`
  width: 240px;
  height: 30px;
  padding: 10px 20px;
  font-family: Helvetica, sans-serif;
  font-weight: 300;
  font-size: 16px;
  border: 1px solid #aaa;
  border-radius: 4px;
  :focus {
    outline: none;
  }
`;
