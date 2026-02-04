import Main from "./components/Main";
import { SearchContextProvider } from "./context/useSearchContext";
import { WeatherContextProvider } from "./context/useWeatherContext";

function App() {
  return (
    <WeatherContextProvider>
      <SearchContextProvider>
        <Main />
      </SearchContextProvider>
    </WeatherContextProvider>
  );
}

export default App;
