const API_URL = 'http://localhost:3000/history';
let result = document.getElementById("inputBox");
let calculatorType = document.getElementById("calculator-type");
let currentBase = 10;
let currentHighlightedButton = null;
let history = [];
function insertValue(value) {
  if (currentBase === 10 || currentBase === 16) {
    if ((value >= '0' && value <= '9') ||
        (value.toUpperCase() >= 'A' && value.toUpperCase() <= 'F')) {
      result.value += value;
    } else if (['+', '-', '*', '/', '%'].includes(value)) {
      result.value += value;
    }
  } else if (currentBase === 8) {
    if ((value >= '0' && value <= '7') || ['+', '-', '*', '/', '%'].includes(value)) {
      result.value += value;
    }
  } else if (currentBase === 2) {
    if ((value === '0' || value === '1') || ['+', '-', '*', '/', '%'].includes(value)) {
      result.value += value;
    }
  }
}
function clearResult() {
  result.value = '';
}
function deleteResult() {
  result.value = result.value.slice(0, -1);
}
// function calculate() {
//   try {
//     let calculation = result.value + ' = ' + eval(result.value);
//     history.push(calculation);
//     saveHistory(calculation);
//     result.value = eval(result.value);
//   } catch (error) {
//     result.value = 'Error';
//   }
// }

function calculate() {
  try {
      let calculation = result.value + ' = ' + eval(result.value);
      saveHistory(calculation);
      result.value = eval(result.value);
  } catch (error) {
      result.value = 'Error';
  }
}
function changeCalculatorType() {
  if (calculatorType.value === 'basic') {
    document.getElementById("basic-calculator").style.display = "block";
    document.getElementById("program-calculator").style.display = "none";
  } else {
    document.getElementById("basic-calculator").style.display = "none";
    document.getElementById("program-calculator").style.display = "block";
  }
}
function highlightButton(button) {
  if (currentHighlightedButton) {
    currentHighlightedButton.classList.remove("highlight");
  }
  button.classList.add("highlight");
  currentHighlightedButton = button;
}
function convertToBinary() {
  if (currentBase === 10) {
    result.value = parseInt(result.value, 10).toString(2);
  } else if (currentBase === 16) {
    result.value = parseInt(result.value, 16).toString(2);
  } else if (currentBase === 8) {
    result.value = parseInt(result.value, 8).toString(2);
  }
  currentBase = 2;
  highlightButton(document.getElementById('binaryButton'));
}
function convertToOctal() {
  if (currentBase === 10) {
    result.value = parseInt(result.value, 10).toString(8);
  } else if (currentBase === 16) {
    result.value = parseInt(result.value, 16).toString(8);
  } else if (currentBase === 2) {
    result.value = parseInt(result.value, 2).toString(8);
  }
  currentBase = 8;
  highlightButton(document.getElementById('octalButton'));
}
function convertToDecimal() {
  if (currentBase === 2) {
    result.value = parseInt(result.value, 2).toString(10);
  } else if (currentBase === 16) {
    result.value = parseInt(result.value, 16).toString(10);
  } else if (currentBase === 8) {
    result.value = parseInt(result.value, 8).toString(10);
  }
  currentBase = 10;
  highlightButton(document.getElementById('decimalButton'));
}
function convertToHexadecimal() {
  if (currentBase === 10) {
    result.value = parseInt(result.value, 10).toString(16).toUpperCase();
  } else if (currentBase === 2) {
    result.value = parseInt(result.value, 2).toString(16).toUpperCase();
  } else if (currentBase === 8) {
    result.value = parseInt(result.value, 8).toString(16).toUpperCase();
  }
  currentBase = 16;
  highlightButton(document.getElementById('hexadecimalButton'));
}
function calculateAndConvert() {
  calculate();
  if (currentBase === 2) convertToBinary();
  else if (currentBase === 8) convertToOctal();
  else if (currentBase === 10) convertToDecimal();
  else if (currentBase === 16) convertToHexadecimal();
}
function leftShift() {
  result.value = parseInt(result.value, currentBase) << 1;
  updateResultBasedOnBase();
}
function rightShift() {
  result.value = parseInt(result.value, currentBase) >> 1;
  updateResultBasedOnBase();
}
function updateResultBasedOnBase() {
  if (currentBase === 2) result.value = parseInt(result.value).toString(2);
  else if (currentBase === 8) result.value = parseInt(result.value).toString(8);
  else if (currentBase === 10) result.value = parseInt(result.value).toString(10);
  else if (currentBase === 16) result.value = parseInt(result.value).toString(16).toUpperCase();
}
// function toggleHistory() {
//   const historyContainer = document.getElementById("history-container");
//   historyContainer.style.display = historyContainer.style.display === "none" ? "block" : "none";
// }
// function updateHistory() {
//   const historyList = document.getElementById("history-list");
//   historyList.innerHTML = '';
//   history.forEach(item => {
//     const li = document.createElement("li");
//     li.textContent = item;
//     li.onclick = function() {
//       result.value = item.split(' = ')[0];
//     };
//     historyList.appendChild(li);
//   });
// }
// function saveHistory(calculation) {
//   fetch(API_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ calculation }),
//   })
//   .then(response => response.text())
//   .then(() => updateHistory())
//   .catch(error => console.error('Error:', error));
// }
// function loadHistory() {
//   fetch(API_URL)
//     .then(response => response.json())
//     .then(data => {
//       history = data;
//       updateHistory();
//     })
//     .catch(error => console.error('Error:', error));
// }
// window.onload = function () {
//   loadHistory();
// };
function toggleHistory() {
  const historyContainer = document.getElementById("history-container");
  historyContainer.style.display = historyContainer.style.display === "none" ? "block" : "none";
}

function updateHistory() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = '';
  history.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item.calculation;
      li.onclick = function() {
          result.value = item.calculation.split(' = ')[0];
      };
      historyList.appendChild(li);
  });
}

function saveHistory(calculation) {
  fetch(API_URL, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ calculation }),
  })
  .then(response => response.text())
  .then(() => loadHistory())
  .catch(error => console.error('Error:', error));
}

function loadHistory() {
  fetch(API_URL)
      .then(response => response.json())
      .then(data => {
          history = data;
          updateHistory();
      })
      .catch(error => console.error('Error:', error));
}

window.onload = function () {
  loadHistory();
};