import { useState } from "react";

export default function Booklist({ data }) {
  const [modalOn, setModalOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const clickBook = () => {
    setModalOn(true);
    setIsOpen(true);
  };
  return (
    <>
      <div
        onClick={clickBook}
        className="flex max-md:flex-col flex-row w-full p-10 border border-4 border-black items-center max-md:items-center group  mb-4 dark:border-white"
      >
        <p className=" w-4/5 text-ellipsis break-keep text-xl pr-10 max-md:pr-0 group-hover:underline dark:group-hover:decoration-orange-400 underline-offset-4 decoration-emerald-400  ">
          {data.properties.Name.title[0].plain_text}
        </p>
        <div className="max-md:mt-10 max-md:w-full  w-1/5 mt-0 text-left line-2 ">
          <p className="text-sm leading-loose truncate ;">
            {/* {data.properties.Author.id} */}
            작가
          </p>
          <p className="text-sm leading-loose truncate ;">출판사</p>
        </div>
      </div>
      <>
        <div
          onClick={() => {
            setIsOpen(true);
            setModalOn(modalOn == true);
          }}
        ></div>
        {/* <Modal data={data} open={isOpen} /> */}
      </>
    </>
  );
}
