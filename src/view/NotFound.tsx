import React from "react";
import { observer, inject } from "mobx-react";

const NotFound = ({ auth }: any) => {
  return <div>404 Page Not Found. {auth}</div>;
};

export default NotFound;
