import * as React from "react";

interface ILazyImage {
  src: string;
  onLoad?: () => void;
}

const LazyImage: React.FC<ILazyImage> = ({ src }): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const imgRef = React.useRef<HTMLImageElement>(null);
  const observer = React.useRef<IntersectionObserver>();

  React.useEffect(() => {
    observer.current = new IntersectionObserver(intersectionOberserver);
    imgRef.current && observer.current.observe(imgRef.current);
  }, []);

  const intersectionOberserver = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver,
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        setIsLoading(true);
      }
    });
  };

  return <img ref={imgRef} alt='lazyImage' src={isLoading ? src : "/images/loading_spinner.gif"} />;
};

export default LazyImage;
