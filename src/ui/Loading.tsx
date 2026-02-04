type LoadingProps = {
  className?: string;
  icon?: string;
  placeholder?: string;
};

const Loading = ({ icon, placeholder, className }: LoadingProps) => {
  return (
    <div className={`loading-container ${className}`}>
      {icon ? (
        <img
          width={15}
          src={icon}
          alt="loading Icon"
          className="loading-icon"
        />
      ) : (
        <div className="flex gap-2">
          <div className="loading-circle" style={{ animationDelay: "50ms" }} />
          <div
            className="loading-circle -translate-y-1"
            style={{ animationDelay: "150ms" }}
          />
          <div className="loading-circle" style={{ animationDelay: "250ms" }} />
        </div>
      )}
      {placeholder || "Loading..."}
    </div>
  );
};

export default Loading;
