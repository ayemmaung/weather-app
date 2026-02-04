import ErrorIcon from "@assets/images/icon-error.svg";
import RetryIcon from "@assets/images/icon-retry.svg";
import Button from "./Button";
import { useWeatherContext } from "@/context/useWeatherContext";

const Error = () => {
  const { location, fetchWeatherData } = useWeatherContext();
  return (
    <div className="error-container">
      <div className="error-body">
        <img
          width={30}
          src={ErrorIcon}
          alt="Error Icon"
          className="error-icon"
        />
        <h1 className="main-title">Something went wrong</h1>
        <p className="error-description">
          We couldn't connect to the server(API error). Please try again in a
          few moments.
        </p>
        <Button
          type="custom"
          className="retry-btn"
          onClick={() => fetchWeatherData(location)}
        >
          <img
            width={15}
            src={RetryIcon}
            alt="retry Icon"
            className="retry-icon"
          />
          <span>Retry</span>
        </Button>
      </div>
    </div>
  );
};

export default Error;
