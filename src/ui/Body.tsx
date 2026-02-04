import React from "react";

type BodyProps = {
  children: React.ReactNode;
};

const Body = ({ children }: BodyProps) => {
  return <div className="body">{children}</div>;
};

export default Body;
