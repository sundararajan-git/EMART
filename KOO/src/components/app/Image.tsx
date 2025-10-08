"use client";

type ImageType = {
  path: string;
  w?: number;
  h?: number;
  alt: string;
  className?: string;
  tr?: boolean;
};

// const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

// if (!urlEndpoint) {
//   throw new Error("Error: Please add urlEndpoint to .env or .env.local");
// }

const Image = ({ path, w, h, alt, className, tr }: ImageType) => {
  console.log(alt);
  return (
    <>
      <img src={path} width={w} height={h} alt={alt} className={className} />
      {tr}
    </>
    // <IKImage
    //   urlEndpoint={urlEndpoint}
    //   path={path}
    //   {...(tr
    //     ? { transformation: [{ width: `${w}`, height: `${h}` }] }
    //     : { width: w, height: h })}
    //   lqip={{ active: true, quality: 20 }}
    //   alt={alt}
    //   className={className}
    // />
  );
};

export default Image;
