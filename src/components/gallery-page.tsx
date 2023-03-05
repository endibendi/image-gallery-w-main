import Image from "next/image";
import { useState } from "react";
import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";
import { GalleryDataInterface } from "~/types/gallery-data";

const ImageCard = styled(motion.div)`
  ${tw`relative border border-black rounded-[10px] w-[248px] h-[320px] self-end overflow-hidden hover:cursor-pointer hover:scale-[1.005] transition-all`}
`;

const PhotoTitle = styled(motion.span)`
  ${tw` text-[220px] leading-[176px] tracking-[0.04em] text-center min-w-[860px]`}
`;

const GhostPhotoTitle = styled(PhotoTitle)`
  -webkit-text-stroke: 1px white;
  color: transparent;
`;

type IndexIconProps = {
  current: boolean;
};

const IndexIcon = styled.div<IndexIconProps>`
  ${tw`border border-white w-[5px] h-8 mr-5 rounded-sm`}
  background-color: ${(props) => (props.current ? "white" : "transparent")}
`;

type Props = {
  galleryItems: GalleryDataInterface[];
};

export const GalleryPage = ({ galleryItems }: Props) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [isHandlingWheel, setIsHandlingWheel] = useState(false);

  const backgroundAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 1 },
  };

  const imageAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.7 },
  };

  const textAnimation = {
    initial: { opacity: 0, y: "-20%" },
    animate: { opacity: 1, y: "0%" },
    exit: { opacity: 0 },
    transition: { duration: 1 },
  };

  const nextItem = currentItem === galleryItems.length - 1 ? 0 : currentItem + 1;
  const prevItem = currentItem === 0 ? galleryItems.length - 1 : currentItem - 1;

  const prevItemImage = galleryItems[prevItem]?.image;
  const nextItemImage = galleryItems[nextItem]?.image;
  const currentItemImage = galleryItems[currentItem]?.image;

  const onPrevClick = () => {
    setCurrentItem(prevItem);
  };

  const onNextClick = () => {
    setCurrentItem(nextItem);
  };

  const handleWheel = (e: { deltaY: number }) => {
    if (!isHandlingWheel) {
      setIsHandlingWheel(true);
      if (e.deltaY > 0) {
        setCurrentItem(nextItem);
      } else {
        setCurrentItem(prevItem);
      }

      setTimeout(() => {
        setIsHandlingWheel(false);
      }, 300); // set scroll delay
    }
  };

  return (
    <div tw="relative w-screen h-screen overflow-hidden" onWheel={handleWheel}>
      {currentItemImage && (
        <motion.div
          key={currentItem}
          tw="z-0 absolute w-[115%] h-[115%] -translate-y-1/2 -translate-x-1/2 inset-0 bg-center bg-no-repeat blur-[100px]"
          style={{
            backgroundImage: `url(${currentItemImage})`,
            backgroundSize: "100%",
            top: "50%",
            left: "50%",
          }}
          {...backgroundAnimation}
        />
      )}

      <div tw="absolute top-0 left-0 right-0 bottom-0 z-10 p-16 text-white uppercase w-screen h-screen">
        <div tw="leading-[19px] tracking-[0.08em] z-10">XYZ Photography</div>

        <div tw="absolute p-16 top-0 left-0 right-0 bottom-0 max-h-screen grid grid-cols-3 overflow-hidden ">
          {prevItemImage && (
            <ImageCard key={currentItem} {...imageAnimation} onClick={onPrevClick}>
              <Image alt="" layout="fill" src={prevItemImage} />
            </ImageCard>
          )}

          <div tw="relative z-[1] self-center place-self-center">
            {currentItemImage && (
              <ImageCard key={currentItem} {...imageAnimation} tw="w-[512px] h-[680px] hover:cursor-auto">
                <Image alt="" layout="fill" src={currentItemImage} />
              </ImageCard>
            )}

            <div tw="absolute top-[-6px] left-1/2 -translate-x-1/2 h-full w-full flex flex-col justify-center items-center">
              <GhostPhotoTitle key={currentItem} {...textAnimation}>
                {galleryItems[currentItem]?.title}
              </GhostPhotoTitle>
            </div>
            <div tw="absolute top-0 left-1/2 -translate-x-1/2 h-full w-full flex flex-col justify-center items-center overflow-hidden">
              <PhotoTitle key={currentItem} {...textAnimation}>
                {galleryItems[currentItem]?.title}
              </PhotoTitle>
              <div tw="flex items-center">
                <span tw="font-inter text-[10px] leading-5 tracking-[0.08em] mr-15">{`${galleryItems[currentItem]?.id} of ${galleryItems.length}`}</span>

                {galleryItems.map(({ id }) => (
                  <IndexIcon key={id} current={id === galleryItems[currentItem]?.id} />
                ))}
              </div>
            </div>
          </div>

          <div tw="justify-self-end flex flex-col justify-between">
            {nextItemImage && (
              <ImageCard key={currentItem} {...imageAnimation} onClick={onNextClick}>
                <Image alt="" layout="fill" src={nextItemImage} />
              </ImageCard>
            )}

            <div tw="mb-[77px] flex flex-col gap-10 max-w-[109px] font-inter text-[10px] leading-5 tracking-[0.08em]">
              <div>
                <div>{galleryItems[currentItem]?.photographer}</div>
                <div>for {galleryItems[currentItem]?.client}</div>
              </div>
              <div tw="text-right">{galleryItems[currentItem]?.date}</div>
              <button tw="text-black px-10 pt-6 pb-5 bg-white hover:bg-opacity-50 transition-all rounded-3xl font-bold">
                Have a look
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
