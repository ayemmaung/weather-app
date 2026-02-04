type CardProps = {
  className?: string;
  showBgImage?: boolean;
  children: React.ReactNode;
};

const Card = ({ className, showBgImage, children }: CardProps) => {
  const classes = showBgImage
    ? `card-container ${className} bg-[url(/bg-today-small.svg)] sm:bg-[url(/bg-today-large.svg)]`
    : `card-container ${className}`;
  return <div className={classes}>{children}</div>;
};

export default Card;
