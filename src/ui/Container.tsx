import React from "react";

type ContainerProps = {
  height?: string;
  color?: string;
  backgroundColor?: string;
  children: React.ReactNode;
};

const Container = ({
  height,
  color,
  backgroundColor,
  children,
}: ContainerProps) => {
  return (
    <div
      className="main-container"
      style={{ height, color, background: backgroundColor }}
    >
      {children}
    </div>
  );
};

export default Container;
