import { useEffect, useRef, useState } from 'react';
import type { ImgHTMLAttributes } from 'react';

type ImageProps = {
  onLazyLoad?: () => void;
};

type ImageNative = ImgHTMLAttributes<HTMLImageElement>;

type Props = ImageProps & ImageNative;

function LazyImage({ src, onLazyLoad, ...nativeProps }: Props): JSX.Element {
  const [currentSrc, setCurrentSrc] = useState<string>(
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4='
  );
  const node = useRef<HTMLImageElement>(null);
  const isCallbackCalled = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // the image is visible in the viewport
        if (entry.isIntersecting && src) {
          if (onLazyLoad && !isCallbackCalled.current) {
            onLazyLoad();
            isCallbackCalled.current = true;
          }
          setCurrentSrc(src);
        }
      });
    });

    observer.observe(node.current as HTMLImageElement);

    // on destroy
    return () => {
      observer.disconnect();
    };
  }, [src, onLazyLoad]);

  return <img ref={node} src={currentSrc} {...nativeProps} />;
}

export { LazyImage };
