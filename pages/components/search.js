import { TOKEN, DATABASE_ID } from "../../config";

export default function Search({ test }) {
  test.results.map((atest, key) => {
    console.log(atest);
  });

  return <></>;
}
export async function getStaticProps() {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Notion-Version": "2022-06-28",
      "content-type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ page_size: 100 }),
  };

  const res = await ("https://api.notion.com/v1/search", options);
  const test = await res.json();
  return {
    props: { test },
  };
}
