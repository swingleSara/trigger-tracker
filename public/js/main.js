document.querySelector("button").addEventListener("click", apiRequest);

async function apiRequest() {
  const drinkName = document.querySelector("input").value;
  try {
    const response = await fetch(
      `https://drinks-trigger-tracker.herokuapp.com/api/${drinkName}`
    );
    const data = await response.json();

    console.log(data);
    document.querySelector("h2").innerText = data.type;
  } catch (error) {
    console.log(error);
  }
}
