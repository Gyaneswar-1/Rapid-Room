import React from "react";
import styled from "styled-components";

const FloatButton = ({ name }: any) => {
  return (
    <StyledWrapper>
      <button className="cssbuttons-io">
        <span>{name}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cssbuttons-io {
    position: relative;
    font-family: inherit;
    font-weight: 600;
    font-size: 14px;
    border-radius: 0.8em;
    cursor: pointer;
    border: none;
    background: linear-gradient(to right, #1d4ed8, #1d4ed8);
    color: white;
    overflow: hidden;
  }

  .cssbuttons-io svg {
    width: 1.2em;
    height: 1.2em;
    margin-left: 0.7em;
    stroke-width: 2px;
  }

  .cssbuttons-io span {
    position: relative;
    z-index: 10;
    transition: color 0.4s;
    display: inline-flex;
    align-items: center;
    padding: 0.8em 0.9em 0.8em 1.02em;
  }

  .cssbuttons-io::before,
  .cssbuttons-io::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .cssbuttons-io::before {
    content: "";
    background: #172554;
    width: 120%;
    left: -10%;
    transform: skew(30deg);
    transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
  }

  .cssbuttons-io:hover::before {
    transform: translate3d(100%, 0, 0);
  }

  .cssbuttons-io:active {
    transform: scale(0.95);
  }
`;

export default FloatButton;
