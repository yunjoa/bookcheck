import Image from "next/image";
import React, { useState } from "react";

export default function Modal({ data, open }) {
  if (!open) return null;

  const date = new Date(data.properties.doneDate.date.start);
  const imgSrc = data.properties.책표지.files[0].external.url;

  // const [modalOn, setModalOn] = useState(true);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll); //clean up
  //   };
  // }, []);

  // const handleScroll = () => {
  //   if (window.scrollY >= 1) {
  //     clickOverlay();
  //   }
  // };

  const clickOverlay = () => {
    setModalOn(false);
  };

  return (
    <>
      <div
        className="modal__overlay w-full h-full absolute top-0 left-0 bg-neutral-800/80  z-20"
        // onClick={onClose}
        // onClose={() => setIsOpen(false)}
      >
        <div className="modal">
          <div className="modal__content w-4/5 h-4/5 shadow-md bg-white dark:bg-zinc-900 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 overflow-y-auto z-30 ">
            <div className="flex max-md:flex-col">
              <div className="w-2/4 h-80 mr-20 max-md:w-full max-md:mb-10 ">
                <div className=" w-full h-full relative">
                  <Image
                    src={imgSrc}
                    alt="책표지"
                    width="200"
                    height="250"
                    className="border border-1 w-200px h-200px"
                  />
                </div>
              </div>
              <div className="text-right w-2/4 justify-items-end max-md:w-full max-md:text-left max-md:flex ">
                <span className="text-6xl font-bold">{date.getDate()}</span>
                <p className="text-sm mr-1 mb-10 max-md:mr-10">
                  {date.toLocaleString("en-US", { month: "short" })}{" "}
                  {date.getFullYear().toString().substring(2, 4)}
                </p>
                <div className="text-base leading-7 ">
                  <p>{data.properties.Name.title[0].plain_text} </p>
                  <p>작가 / 출판</p>
                  <p>{data.properties.발행일.date.start} 출간</p>
                  <p>{data.properties.전체페이지.number}p</p>
                  <p>
                    {data.properties.startDate.date.start} ~{" "}
                    {data.properties.doneDate.date.start} (
                    {data.properties.읽은기간.formula.string})
                  </p>
                  <p>{data.properties.즐겨찾기.select.name}</p>
                </div>
              </div>
            </div>
            <hr className="my-8 border-gray-200 dark:border-gray-700" />
            <div className="phrase text-left flex pb-20">
              <p className="text-xs font-bold underline underline-offset-4 mr-4">
                0p
              </p>
              -
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
