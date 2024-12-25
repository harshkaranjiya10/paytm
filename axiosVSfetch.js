

//Axios vs Fetch: 
// Fetch is a method  |  request then .json(s)
// Axios is a library |  automatic transforms of JSON data.

/* function main() {
  fetch("https://www.postb.in/1733823876548-0724689087364?hello=world") // returns promises
    .then(async (res) => {
      const json = await res.json();
      console.log(json);
    });
} */

async function main() {
  const response = await fetch("https://www.postb.in/1733823876548-0724689087364?hello=world", {
    method: "POST"
  });
  const json = await response.json();
  console.log(json);
}

/* async function main() {
  const response = await axios.get("https://www.postb.in/1733823876548-0724689087364?hello=world");
  console.log(response.data); //Dont need to convert it into json
} */

  //axios.get()
  //axios.post()

main();
