"use client";
import styled from "styled-components";

type ButtonArguments = {
  buttonText: String;
  buttonFunction: Function;
};

function BaseInterfaceButton(buttonArguments: ButtonArguments) {
  return (
    <BaseButton
      onClick={() => {
        buttonArguments.buttonFunction();
      }}
    >
      {buttonArguments.buttonText}
    </BaseButton>
  );
}

export { BaseInterfaceButton };

const BaseButton = styled.button`
  border: 2px solid red;
  border-radius: 3px;
  padding: 2px 4px;
`;
