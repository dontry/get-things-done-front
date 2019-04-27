import React, { Component } from "react";
import { message } from "antd";
import { messageStore } from "../stores";
import { MessageType } from "../types";

const REGEX = /^@(info|warning|error)/i;

// https://stackoverflow.com/questions/31815633/what-does-the-error-jsx-element-type-does-not-have-any-construct-or-call
const WithMessagePopup = (WrappedComponent: typeof Component, messageType: MessageType) => {
  const error = messageStore.getError(messageType);
  return (props: any) => (
    <>
      <WrappedComponent {...props} />
      {error && _showMessage(messageType, error)}
    </>
  );

  function _showMessage(type: MessageType, msg: string): void {
    let method: string = "";
    const matcher: RegExpMatchArray | null  = type!.match(REGEX)
    if (matcher) {
      method = matcher[1].toUpperCase() || "";
    }
    switch (method) {
      case "WARNING":
        message.warning(msg);
        break;
      case "ERROR":
        message.error(msg);
        break;
      case "INFO":
      default:
        message.info(msg);
    }
    messageStore.clearError(type);
  }
};

export default WithMessagePopup;
