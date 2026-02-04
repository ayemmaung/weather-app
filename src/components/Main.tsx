import { useWeatherContext } from "@/context/useWeatherContext";
import BodyLeftSide from "@/layout/BodyLeftSide";
import BodyRightSide from "@/layout/BodyRightSide";
import Header from "@/layout/Header";
import Body from "@/ui/Body";
import Container from "@/ui/Container";
import Error from "@/ui/Error";
import SearchBar from "@/ui/SearchBar";

const Main = () => {
  const { weatherData, error } = useWeatherContext();
  return (
    <Container color="var(--white-color)" backgroundColor="var(--bg-color)">
      <Header />
      {error ? (
        <Error />
      ) : (
        <main>
          <h1 className="main-title">How's the sky looking today?</h1>
          <SearchBar placeholder="Search for a place..." />
          {weatherData && (
            <Body>
              <BodyLeftSide />
              <BodyRightSide />
            </Body>
          )}
        </main>
      )}
    </Container>
  );
};

export default Main;
