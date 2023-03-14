import Head from "next/head";
import Booklist from "./components/booklist";
import DarkModeBtn from "./components/darkModeBtn";
import { TOKEN, DATABASE_ID } from "../config";

export default function Home({ books }) {
  let thisMonth = new Date().getMonth() + 1;
  let thisYear = new Date().getFullYear();
  let MonthlyReading = 0;
  let YearlyReading = 0;
  books.results.map((abookday, key) => {
    const doneDays = new Date(abookday.properties.doneDate.date.start);
    const doneDaysMonth = doneDays.getMonth() + 1;
    if (thisMonth === doneDaysMonth) {
      MonthlyReading += 1;
    }
  });
  books.results.map((abookday, key) => {
    const doneDays = new Date(abookday.properties.doneDate.date.start);
    const doneDaysYear = doneDays.getFullYear();
    if (thisYear === doneDaysYear) {
      YearlyReading += 1;
    }
  });

  return (
    <div className="home-wrap h-screen ">
      <Head>
        <title>Book Check</title>
        <meta name="개인적 독서노트" content="읽은 책을 기록한다" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-10">
        <h1 className="text-6xl font-bold">i Read it.</h1>
        <h2 className="text-xs font-bold py-4 break-keep">
          노션에서 제 개인적인 독서 DB에 글을 작성하면 노션 API를 이용해서 이
          북책(Book Check) 웹페이지에 자동으로 업로드됩니다.
        </h2>
        <div className="flex">
          <div className="w-fit my-6 relative mr-6">
            <div className="flex m-auto p-4 rounded-lg bg-black dark:bg-white">
              <div className="my-auto text-center text-white dark:text-black">
                <p className="text-sm  text-white dark:text-black">
                  한 달 동안 읽은 책
                </p>
                <span className="text-4xl font-bold  text-white dark:text-black">
                  {MonthlyReading}
                </span>
                권
              </div>
            </div>
            <div className="absolute -top-4 -right-3 font-bold text-xs px-1 py-2  bg-white rounded-full border border-2 border-black dark:border-white dark:bg-black">
              NEW
            </div>
          </div>
          <div className="w-fit my-6 relative">
            <div className="flex m-auto p-4 rounded-lg bg-black dark:bg-white">
              <div className="my-auto text-center text-white dark:text-black">
                <p className="text-sm  text-white dark:text-black">
                  한 해 동안 읽은 책
                </p>
                <span className="text-4xl font-bold  text-white dark:text-black">
                  {YearlyReading}
                </span>
                권
              </div>
            </div>
            <div className="absolute -top-4 -right-3 font-bold text-xs px-1 py-2  bg-white rounded-full border border-2 border-black dark:border-white dark:bg-black">
              NEW
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-200 dark:border-gray-700" />
        <div className="booklist">
          {/* <div className="text-base my-10">TAP (탭 들어간다고쳐^^) </div> */}
          {books.results.map((abook) => (
            <Booklist key={abook.id} data={abook} />
          ))}
        </div>
      </div>
      <section className="footer">
        <div
          className="w-full bg-black
            left-0 bottom-0
            flex  justify-between 
            text-white text-xs p-4 px-10 fixed z-10 "
        >
          <div>
            <a
              target="_blank"
              href="https://github.com/yunjoa/bookcheck"
              className=" mr-4 hover:underline"
              rel="noopener noreferrer"
            >
              Git
            </a>
            <a
              target="_blank"
              href="https://joayun.notion.site/faabbf36bcce41dc805ba4b9d42ddf7b"
              className=" mr-4 hover:underline"
              rel="noopener noreferrer"
            >
              Book Club
            </a>
          </div>
          <DarkModeBtn />
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  //notion API에서
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Notion-Version": "2022-06-28",
      "content-type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      sorts: [
        {
          property: "doneDate",
          direction: "descending",
        },
      ],
      filter: {
        property: "Done",
        status: {
          equals: "다 읽었어 🎉",
        },
      },
      page_size: 100,
    }),
  };

  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    options
  );

  const books = await res.json();

  return {
    props: { books },
  };
}
