import Image from "next/image";
import { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";

const ImageCard = styled.div`
  ${tw`relative border border-black rounded-[10px] w-[248px] h-[320px] self-end overflow-hidden`}
`;

const PhotoTitle = styled.span`
  ${tw` text-[220px] leading-[176px] tracking-[0.04em] text-center`}
`;

const GhostPhotoTitle = styled(PhotoTitle)`
  -webkit-text-stroke: 1px white;
  color: transparent;
`;

type GalleryData = {
  title: string;
  photographer: string;
  client: string;
  date: string;
  image: string;
};

export const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryData[]>([]);

  const currentItem = galleryItems[0];
  const nextItem = galleryItems[1];
  const prevItem = galleryItems[4];

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
        tw="z-0 absolute w-[115%] h-[115%] -translate-y-1/2 -translate-x-1/2 inset-0 bg-center bg-no-repeat blur-[100px]"
        style={{
          backgroundImage: `url(${currentItem?.image})`,
          backgroundSize: "100%",
          top: "50%",
          left: "50%",
        }}
      />

      <div tw="absolute top-0 left-0 right-0 bottom-0 z-10 p-16 text-white uppercase w-screen h-screen">
        <div tw=" leading-[19px] tracking-[0.08em] z-10">XYZ Photography</div>

        <div tw="absolute p-16 top-0 left-0 right-0 bottom-0 max-h-screen grid grid-cols-3 overflow-hidden ">
          {prevItem && (
            <ImageCard>
              <Image alt="" layout="fill" src={prevItem.image} />
            </ImageCard>
          )}

          <div tw="relative z-[1] self-center place-self-center">
            {currentItem && (
              <ImageCard tw="w-[512px] h-[680px]">
                <Image alt="" layout="fill" src={currentItem?.image} />
              </ImageCard>
            )}

            <div tw="absolute top-[-6px] left-1/2 -translate-x-1/2 h-full w-full flex flex-col justify-center items-center">
              <GhostPhotoTitle>{currentItem?.title}</GhostPhotoTitle>
            </div>

            <div tw="absolute top-0 left-1/2 -translate-x-1/2 h-full w-full flex flex-col justify-center items-center overflow-hidden">
              <PhotoTitle>{currentItem?.title}</PhotoTitle>
              <div tw="flex items-center">
                <span tw="font-inter text-[10px] leading-5 tracking-[0.08em] mr-15">1 of 5</span>
                {galleryItems.map((galleryItem, index) => (
                  <div key={index} tw="border border-white w-[5px] h-8 mr-5 rounded-sm" />
                ))}
              </div>
            </div>
          </div>

          <div tw="justify-self-end flex flex-col justify-between">
            {nextItem && (
              <ImageCard>
                <Image alt="" layout="fill" src={nextItem.image} />
              </ImageCard>
            )}

            <div tw="mb-[77px] flex flex-col gap-10 max-w-[109px] font-inter  text-[10px] leading-5 tracking-[0.08em]">
              <div tw="">
                <div>{currentItem?.photographer}</div>
                <div>for {currentItem?.client}</div>
              </div>
              <div tw="text-right">{currentItem?.date}</div>
              <button tw="text-black  px-10 pt-6 pb-5 bg-white hover:bg-opacity-50 transition-all rounded-3xl font-bold">
                Have a look
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
