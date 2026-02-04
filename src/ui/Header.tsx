import Logo from "@assets/logo.svg";

type HeaderProps = {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="header">
      <div className="header--left">
        <img width={150} src={Logo} alt="Weather App Logo" />
      </div>
      <div className="header--right">{children}</div>
    </div>
  );
};

export default Header;
