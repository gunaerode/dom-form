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
  content ? (newElement.innerText = content) : null;
  return newElement;
}

function createFormInputElement(
  inputType,
  divClass,
  labelContent = false,
  attributeValue
) {
  let divElement = createElement("div", divClass);
  let labelElement = createElement("label", false, labelContent, [
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
  type
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
  form.append(divElement);
  divElement.append(labelElement, inputElement);
}

function createCheckBoxElement(foodArray) {
  for (let value of foodArray) {
    let divElement = createElement("div", "form-check-inline");
    let labelElement = createElement("label", false, value, ["for", value]);
    let inputElement = createElement("input", "form-check-input", false, [
      "name",
      "food[]",
    ]);
    inputElement.setAttribute("type", "checkbox");
    inputElement.setAttribute("id", value);
    inputElement.setAttribute("value", value);
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
  firstName,
  lastName,
  address,
  pincode,
  clearElementRadio,
  genderMale,
  genderFemale,
  clearElementCheck,
  choiceOfFood = ["sweet", "spicy", "bitter", "salty", "sour"],
  State,
  Country,
  submitButton;

form = createElement("form", "formElement", false, ["method", "POST"]);
title = createElement("h2", "title text-center", "Fill the form");
colOne.append(title, form);

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
genderMale = createFormRadioElement("input", "Male", "male", "radio");
genderFemale = createFormRadioElement("input", "Female", "female", "radio");
clearElementCheck = createElement("div", "clearfix");
form.append(clearElementCheck);
choiceOfFood = createCheckBoxElement(choiceOfFood);
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
  let table, thead, tbody, tr1, tr2, th1, th2;

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
    tr2 = createElement("tr");
    tbody.append(tr2);
    th2 = createElement("th", false, key);
    td3 = createElement("td", false, value);
    tr2.append(th2, td3);
  }
  form.reset();
});
