const uri = "https://pod3blvj54.execute-api.eu-west-2.amazonaws.com/prod/";
export async function search(query) {
  try {
    const res = await fetch(`${uri}${query}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
