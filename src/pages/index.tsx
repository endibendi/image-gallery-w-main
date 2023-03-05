import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { type NextPageWithLayout } from "~/pages/_app";
import { DefaultPage } from "~/layouts/DefaultPage";
import { GalleryPage } from "~/components/gallery-page";
import { GalleryDataInterface } from "~/types/gallery-data";

interface Props {}

const Index: NextPageWithLayout<Props> = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryDataInterface[]>([]);

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
    <>
      <NextSeo title="Index" />
      {galleryItems && <GalleryPage galleryItems={galleryItems} />}
    </>
  );
};

Index.getLayout = (page) => {
  return <DefaultPage>{page}</DefaultPage>;
};

export default Index;
