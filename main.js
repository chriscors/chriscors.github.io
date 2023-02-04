//Vars
let total = 0; //Number that tracks running total
let displayNum = 0; //Number displayed on the calc
let calculations = 0; //# Calculations performed in this calculation
let computation = "base"; //Computation state

let newEntry_flag = true; //If the number being entered is ongoing, ie, not just calculated, build the number, otherwise start a new value
let computed_flag = false; //Was the equals operater the last button clicked
let operating_flag = false; //Was an operator button pushed
let decimaled_flag = false; //Is there a decimal in the equation

//Update display content
let output = document.querySelector("#output");
function updateDisplay() {
  let numTypeDN = Number(displayNum);
  if (Math.abs(numTypeDN) < 1000000000) {
    output.textContent = numTypeDN.toLocaleString("en-US");
  } else {
    output.textContent = numTypeDN.toExponential(4);
  }
}

//Num behavior
let nums = document.querySelectorAll(".num");

for (let num of nums) {
  num.setAttribute("data-number", num.innerText);
  num.addEventListener("click", function (event) {
    if (!newEntry_flag) {
      displayNum = "".concat(displayNum, num.getAttribute("data-number"));
    } else {
      displayNum = Number(num.getAttribute("data-number"));
      newEntry_flag = false;
      if (computed_flag) {
        total = 0;
        calculations = 0;
        computed_flag = false;
        computation = "base";
      }
    }
    operating_flag = false;
    updateDisplay();
  });
}

//clear behavior
let c = document.querySelector("#clear");
c.addEventListener("click", function (event) {
  clear();
});

function clear() {
  total = 0;
  displayNum = 0;
  calculations = 0;
  computation = "base";
  newEntry_flag = true;
  operating_flag = false;
  decimaled_flag = false;
  updateDisplay();
  deactivate();
  console.log("total:", total, "Display:", displayNum);
}

//decimal behavior
let dec = document.querySelector("#decimal");
dec.addEventListener("click", function (event) {
  decimal();
});

function decimal() {
  if (decimaled_flag) {
    return;
  }

  if (!newEntry_flag) {
    displayNum = "".concat(displayNum + ".");
  } else {
    displayNum = "0.";
    newEntry_flag = false;
  }
  decimaled_flag = true;
  updateDisplay();
  console.log("total:", total, "Display:", displayNum);
}

//Plus behavior
let plus = document.querySelector("#plus");
plus.addEventListener("click", function (event) {
  add();
});

function add() {
  computed_flag = false;
  operate();
  computation = "add";
  calculations++;
  compute();
  plus.classList.add("active");
}

//Minus behavior
let minus = document.querySelector("#minus");
minus.addEventListener("click", function (event) {
  subtract();
});
function subtract() {
  computed_flag = false;
  operate();
  computation = "subtract";
  calculations++;
  compute();
  minus.classList.add("active");
}

//Times behavior
let times = document.querySelector("#times");
times.addEventListener("click", function (event) {
  multiply();
});

function multiply() {
  computed_flag = false;
  operate();
  computation = "multiply";
  calculations++;
  compute();
  times.classList.add("active");
}

//Divide behavior
let slash = document.querySelector("#divide");
slash.addEventListener("click", function (event) {
  divide();
});
function divide() {
  computed_flag = false;
  operate();
  computation = "divide";
  calculations++;
  compute();
  slash.classList.add("active");
}

function compute() {
  displayNum = total;
  newEntry_flag = true;
  updateDisplay();
  console.log("total:", total, "Display:", displayNum);
}

//Equals behavior
let eq = document.querySelector("#equals");
eq.addEventListener("click", function (event) {
  equals();
});

function equals() {
  operate();
  displayNum = total;
  newEntry_flag = true;
  computed_flag = true;
  computation = "base";
  updateDisplay();
  deactivate();
  console.log("total:", total, "Display:", displayNum);
}

function operate() {
  deactivate();
  if (!computed_flag) {
    switch (computation) {
      case "add":
        if (!operating_flag) {
          total += Number(displayNum);
        }
        break;
      case "subtract":
        if (!operating_flag) {
          total -= Number(displayNum);
        }
        break;
      case "divide":
        if (!operating_flag) {
          total /= Number(displayNum);
        }
        break;
      case "multiply":
        if (!operating_flag) {
          total *= Number(displayNum);
        }
        break;
      case "base":
        if (!operating_flag) {
          total = Number(displayNum);
        }
        break;
      default:
        break;
    }
    total = +Number(total).toFixed(8);
    operating_flag = true;
    decimaled_flag = false;
  }
}

document.addEventListener("keyup", function (event) {
  console.log("Key pressed:", event.key);

  input = event.key;
  if (Number.isNaN(Number(input)) === false) {
    if (!newEntry_flag) {
      displayNum = "".concat(displayNum, input);
    } else {
      displayNum = Number(input);
      newEntry_flag = false;
      if (computed_flag) {
        total = 0;
        calculations = 0;
        computed_flag = false;
        computation = "base";
      }
    }
    operating_flag = false;
    updateDisplay();
  } else if (input === "Backspace") {
    clear();
  } else if (input === "+") {
    add();
  } else if (input === "-") {
    subtract();
  } else if (input === "x" || input === "*") {
    multiply();
  } else if (input === "/") {
    divide();
  } else if (input === "=" || input === "Enter") {
    equals();
  }
});

function deactivate() {
  plus.classList.remove("active");
  minus.classList.remove("active");
  times.classList.remove("active");
  slash.classList.remove("active");
}
