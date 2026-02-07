type LoadingProps = {
  className?: string;
  icon?: string;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
};

const iconSize = {
  sm: 15,
  md: 30,
  lg: 50,
};

const Loading = ({ icon, size, placeholder, className }: LoadingProps) => {
  const loadingCircleWidth = size ? iconSize[size] + "px" : "15px";
  const loadingCircleStyle = {
    width: loadingCircleWidth,
    height: loadingCircleWidth,
  };

  return (
    <div className={`loading-container ${className ? className : ""}`}>
      {icon ? (
        <img
          width={size ? iconSize[size] : 15}
          src={icon}
          alt="loading Icon"
          className="loading-icon"
        />
      ) : (
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, index) => {
            const delayTime = 50 * (index + 1);
            return (
              <div
                className="loading-circle"
                style={{
                  animationDelay: `${delayTime}ms`,
                  ...loadingCircleStyle,
                }}
              />
            );
          })}
        </div>
      )}
      <p className={size ? `text-${size}` : "text-sm"}>
        {placeholder || "Loading..."}
      </p>
    </div>
  );
};

export default Loading;
