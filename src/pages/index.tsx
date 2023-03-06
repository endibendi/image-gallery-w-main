import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { styled } from "twin.macro";
import { type NextPageWithLayout } from "~/pages/_app";
import { DefaultPage } from "~/layouts/DefaultPage";
import { GalleryPage } from "~/components/gallery-page";
import { GalleryDataInterface } from "~/types/gallery-data";

interface LoadingWrapperProps {
  isLoading: boolean;
}

const LoadingWrapper = styled.div<LoadingWrapperProps>`
  cursor: ${(props) => (props.isLoading ? "url('/svg/cursor.svg'), auto" : "auto")};
`;

interface Props {}

const Index: NextPageWithLayout<Props> = () => {
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <>
      <LoadingWrapper isLoading={isLoading}>
        <NextSeo title="Index" />
        {!isLoading && <GalleryPage galleryItems={galleryItems} />}
      </LoadingWrapper>
    </>
  );
};

Index.getLayout = (page) => {
  return <DefaultPage>{page}</DefaultPage>;
};

export default Index;
