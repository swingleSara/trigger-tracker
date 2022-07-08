const deleteText = document.querySelectorAll(".fa-trash");
const arrowText = document.querySelectorAll(".fa-arrow-up");

Array.from(deleteText).forEach((element) => {
  element.addEventListener("click", deleteDrink);
});

Array.from(arrowText).forEach((element) => {
  element.addEventListener("click", addOneUnit);
});

async function deleteDrink() {
  const name = this.parentNode.childNodes[1].innerText;
  const type = this.parentNode.childNodes[3].innerText;
  const subtype = this.parentNode.childNodes[5].innerText;
  const content = this.parentNode.childNodes[7].innerText;
  const measurement = this.parentNode.childNodes[9].innerText;
  try {
    const response = await fetch("deleteDrink", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nameS: name,
        typeS: type,
        subtypeS: subtype,
        conentS: content,
        measurementS: measurement,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function addOneUnit() {
  const name = this.parentNode.childNodes[1].innerText;
  const type = this.parentNode.childNodes[3].innerText;
  const subtype = this.parentNode.childNodes[5].innerText;
  const content = Number(this.parentNode.childNodes[7].innerText);
  const measurement = this.parentNode.childNodes[9].innerText;
  const aUnits = Number(this.parentNode.childNodes[11].innerText);
  try {
    const response = await fetch("addOneUnit", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nameS: name,
        typeS: type,
        subtypeS: subtype,
        contentS: content,
        measurementS: measurement,
        unitsS: aUnits,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
