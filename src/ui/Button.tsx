type ButtonProps = {
  type?: "custom";
  className?: string;
  placeholder?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const Button = ({
  type,
  className,
  placeholder,
  onClick,
  children,
}: ButtonProps) => {
  if (type === "custom") {
    return (
      <button className={`btn ${className || ""}`} onClick={onClick}>
        {children}
      </button>
    );
  }
  return (
    <button className={`btn ${className || ""}`} onClick={onClick}>
      {placeholder}
    </button>
  );
};

export default Button;
