import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { message } from "antd";
import { MessageType } from "../types";

const REGEX = /^@(info|warning|error)/i;

// https://stackoverflow.com/questions/31815633/what-does-the-error-jsx-element-type-does-not-have-any-construct-or-call
const WithMessagePopup = (WrappedComponent: any, messageType: MessageType) => {
  return inject("messageStore")(
    observer(({ messageStore, ...props }) => {
      const error = messageStore.messages.get(messageType);
      return (
        <>
          <WrappedComponent {...props} />
          {error && _showMessage(messageType, error)}
        </>
      );

      function _showMessage(type: MessageType, msg: string): void {
        let method: string = "";
        const matcher: RegExpMatchArray | null = type!.match(REGEX);
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
    })
  );
};

export default WithMessagePopup;
