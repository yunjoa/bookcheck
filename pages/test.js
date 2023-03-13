export default function Test() {
  const options = {
    method: "GET",
    headers: { accept: "application/json", "Notion-Version": "2022-06-28" },
  };

  fetch(
    "https://api.notion.com/v1/pages/Book-Publisher-DB-c15a2855478a4e51909617be1156c6a8/properties/%5C%5EUJ",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
  return <> </>;
}
