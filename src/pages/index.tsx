import { NextSeo } from "next-seo";
import { type NextPageWithLayout } from "~/pages/_app";
import { DefaultPage } from "~/layouts/DefaultPage";
import { GalleryPage } from "~/components/gallery-page";

interface Props {}

const Index: NextPageWithLayout<Props> = () => {
  return (
    <>
      <NextSeo title="Index" />
      <GalleryPage />
    </>
  );
};

Index.getLayout = (page) => {
  return <DefaultPage>{page}</DefaultPage>;
};

export default Index;
