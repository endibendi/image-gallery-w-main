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
    <div tw="p-16">
      <div tw="uppercase">XYZ Photography</div>
      {galleryItems[0] && <Image width={250} height={250} alt="" layout="fixed" src={galleryItems[0].image} />}
    </div>
  );
};
