import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryData = {
  title: string;
  author: string;
  date: string;
  image: string;
};

export const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryData[]>([]);

  useEffect(() => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((jsonData) => {
        const data = jsonData.galleryData;
        setGalleryItems(data);
      });
  }, []);

  return (
    <div tw="relative w-screen h-screen overflow-hidden">
      <div
        tw="z-0 absolute w-[130%] h-[130%] -translate-y-1/2 -translate-x-1/2 inset-0 bg-center bg-no-repeat blur-[100px]"
        style={{
          backgroundImage: `url(${galleryItems[0]?.image})`,
          backgroundSize: "130%",
          top: "50%",
          left: "50%",
        }}
      />
      <div tw="absolute top-0 left-0 right-0 bottom-0 p-16 z-10 w-screen h-screen">
        <div tw="uppercase leading-[19px] text-white">XYZ Photography</div>
        {galleryItems[0] && <Image width={250} height={250} alt="" layout="fixed" src={galleryItems[0]?.image} />}
      </div>
    </div>
  );
};
