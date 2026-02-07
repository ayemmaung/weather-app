import { useWeatherContext } from "@/context/useWeatherContext";
import BodyLeftSide from "@/layout/BodyLeftSide";
import BodyRightSide from "@/layout/BodyRightSide";
import Header from "@/layout/Header";
import Body from "@/ui/Body";
import Container from "@/ui/Container";
import Error from "@/ui/Error";
import SearchBar from "@/ui/SearchBar";
import Loading from "@/ui/Loading";
import LoadingIcon from "@assets/images/icon-loading.svg";

const Main = () => {
  const { initialLoading, loading, retrying, weatherData, error } =
    useWeatherContext();

  if (initialLoading) {
    return (
      <Container color="var(--white-color)" backgroundColor="var(--bg-color)">
        <Loading
          size="lg"
          className="flex-1"
          icon={LoadingIcon}
          placeholder="Loading... "
        />
      </Container>
    );
  }

  if ((loading && !weatherData) || retrying) {
    return (
      <Container color="var(--white-color)" backgroundColor="var(--bg-color)">
        <Header />
        <main>
          <h1 className="main-title">How's the sky looking today?</h1>
          <SearchBar placeholder="Search for a place..." />
          <Body>
            <Loading
              size="md"
              className="flex-1"
              icon={LoadingIcon}
              placeholder={retrying ? "Retrying..." : "Loading weather..."}
            />
          </Body>
        </main>
      </Container>
    );
  }

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
