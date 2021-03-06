function createElement(
  element,
  className = false,
  content = false,
  attribute = false
) {
  let newElement = document.createElement(element);
  className ? (newElement.className = className) : null;
  Array.isArray(attribute)
    ? newElement.setAttribute(attribute[0], attribute[1])
    : null;
  content ? (newElement.innerHTML = content) : null;
  let spanExcludeArray = [
    "Male",
    "Female",
    "Sweet",
    "Spicy",
    "Salty",
    "Bitter",
    "Sour",
  ];
  element === "label"
    ? !spanExcludeArray.includes(content)
      ? (newElement.innerHTML += " <span>*</span>")
      : null
    : null;
  return newElement;
}

function createFormInputElement(
  inputType,
  divClass,
  labelContent = false,
  attributeValue
) {
  let divElement = createElement("div", divClass);
  let labelElement = createElement("label", "label", labelContent, [
    "for",
    attributeValue,
  ]);
  let inputElement = createElement(inputType, "form-control", false, [
    "id",
    attributeValue,
  ]);
  form.append(divElement);
  inputElement.setAttribute("name", attributeValue);
  inputElement.setAttribute("placeholder", `Enter your ${labelContent}`);
  inputElement.setAttribute("required", "required");
  divElement.append(labelElement, inputElement);
}

function createFormRadioElement(
  inputType,
  labelContent = false,
  attributeValue,
  type,
  checked
) {
  let divElement = createElement("div", "form-check-inline");
  let labelElement = createElement("label", false, labelContent, [
    "for",
    attributeValue,
  ]);
  let inputElement = createElement(inputType, "form-check-input", false, [
    "name",
    "gender",
  ]);
  inputElement.setAttribute("type", type);
  inputElement.setAttribute("id", attributeValue);
  inputElement.setAttribute("value", attributeValue);
  checked ? inputElement.setAttribute("checked", true) : null;
  form.append(divElement);
  divElement.append(labelElement, inputElement);
}

function capitalize(string) {
  return string[0]
    ? string[0].toUpperCase() + string.substr(1, string.length)
    : string;
}

function createCheckBoxElement(foodArray) {
  for (let value of foodArray) {
    let valueCaps = capitalize(value);
    let divElement = createElement("div", "form-check-inline");
    let labelElement = createElement("label", false, valueCaps, ["for", value]);
    let inputElement = createElement("input", "form-check-input", false, [
      "name",
      "food",
    ]);
    inputElement.setAttribute("type", "checkbox");
    inputElement.setAttribute("id", value);
    inputElement.setAttribute("value", value);
    // value === "sweet" ? inputElement.setAttribute("required", true) : null;
    form.append(divElement);
    divElement.append(labelElement, inputElement);
  }
}

// ============ Common Elements =========

let container, row, colOne, colTwo;

container = createElement("div", "container");
document.body.append(container);

row = createElement("div", "row");
container.append(row);

colOne = createElement("div", "col-lg-6");
colTwo = createElement("div", "col-lg-6");
row.append(colOne, colTwo);

// =========== Form Elements ==============
let form,
  title,
  required,
  firstName,
  lastName,
  address,
  pincode,
  clearElementRadio,
  genderLabel,
  genderMale,
  genderFemale,
  clearElementCheck,
  foodLabel,
  choiceOfFood = ["sweet", "spicy", "bitter", "salty", "sour"],
  foodError,
  State,
  Country,
  submitButton;

form = createElement("form", "formElement", false, ["method", "POST"]);
title = createElement("div", "title text-center", "Personal Details");
required = createElement(
  "div",
  "text-center",
  "<span>*</span> These fields are required"
);
colOne.append(title, required, form);

firstName = createFormInputElement(
  "input",
  "form-group",
  "First Name",
  "firstName"
);
lastName = createFormInputElement(
  "input",
  "form-group",
  "Last Name",
  "lastName"
);
address = createFormInputElement(
  "textarea",
  "form-group",
  "Address",
  "address"
);
pincode = createFormInputElement("input", "form-group", "Pincode", "pincode");
clearElementRadio = createElement("div", "clearfix");
form.append(clearElementRadio);
genderLabel = createElement("label", "label", "Select gender");
form.append(genderLabel);
genderMale = createFormRadioElement("input", "Male", "male", "radio", true);
genderFemale = createFormRadioElement(
  "input",
  "Female",
  "female",
  "radio",
  false
);
clearElementCheck = createElement("div", "clearfix");
form.append(clearElementCheck);
foodLabel = createElement("label", "label", "Choice of food");
form.append(foodLabel);
choiceOfFood = createCheckBoxElement(choiceOfFood);
foodError = createElement("div", "foodError");
form.append(foodError);
state = createFormInputElement("input", "form-group", "State", "state");
country = createFormInputElement("input", "form-group", "Country", "country");
submitButton = createElement(
  "button",
  "btn btn-success btn-block",
  "Submit",
  "submit"
);
form.append(submitButton);

// ===========Table Elements =============
let formDom = document.querySelector(".formElement");
formDom.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  let table,
    thead,
    tbody,
    food = [];
  let tempTable = document.querySelector(".table");
  tempTable ? tempTable.remove() : null;
  let foodSelectCount = document.querySelectorAll(
    "[name='food']:checked"
  ).length;
  let foodError = document.querySelector(".foodError");
  if (foodSelectCount < 2) {
    foodError.innerText = "Select atleast 2 foods";
    tempTable ? tempTable.remove() : null;
    return false;
  } else {
    foodError.innerText = " ";
  }

  table = createElement("table", "table table-dark");
  colTwo.append(table);

  thead = createElement("thead");
  tbody = createElement("tbody");
  table.append(thead, tbody);

  tr1 = createElement("tr");
  thead.append(tr1);

  th1 = createElement("th", "text-center", "Form Data", ["colspan", 2]);
  tr1.append(th1);

  for (const arrayValue of formData) {
    let [key, value] = arrayValue;
    if (key === "food") {
      food.push(capitalize(value));
      continue;
    } else {
      key === "state" ? createRow(tbody, "food", food.join()) : null;
    }
    createRow(tbody, key, value);
  }
  form.reset();
});

function createRow(tbody, key, value) {
  let tr1, th1, td1;
  tr1 = createElement("tr");
  tbody.append(tr1);
  th1 = createElement("th", false, capitalize(key));
  td1 = createElement("td", false, capitalize(value));
  tr1.append(th1, td1);
}
