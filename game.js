const buttonMain = document.querySelector("#button");
const robot = document.querySelector(".robot");
const dialogue = document.querySelector("#dialogue");
const textOne = document.querySelector("#text-1");
const secondButton = document.querySelector('.button-2');


/// DIALOGUE TWO ///


/// first action - robot comes to life, screen goes dark ///
buttonMain.addEventListener('click', () => {
  robot.classList.toggle("clicked", { once: true });
  setTimeout(() => document.body.style.backgroundColor = "rgb(0, 0, 0)", 2 * 1000);
});

/// 2 ///

secondButton.addEventListener('click', () => {
  document.body.style.backgroundColor = "rgb(60, 179, 113)";
})
 

/// 3 ///

const thirdButton = document.querySelector('#button-3');
const thirdButtonText = document.querySelector('.text');
const popUpText = document.querySelector('.s-3-text');

count = 0;
thirdButton.onclick = () => {
  count += 1;
  thirdButtonText.innerHTML = count * count;
  if (count > 3.5) {
    popUpText.innerHTML = "Too late, slow-poach! I was expecting you to reach 10 faster than that, but alas, you have failed me, and now the counter is disabled.";
    thirdButtonText.innerHTML = 0;
  };
  if (document.body.style.backgroundColor == "rgb(0, 0, 0)") {
    popUpText.style.color = "white";
  } else {
    popUpText.style.color = "rgb(0, 0, 0)";
  }
};


/// 4 ///

const exitButton = document.querySelector('#exit-button');
const exitText = document.querySelector('#exit-text');
let clickCount = 0;
let canChangeBackground = true;
let isTransitioning = false;

handleTransitionEnd = () => {
  isTransitioning = false;
}

document.body.addEventListener('transitionend', handleTransitionEnd);

exitButton.addEventListener('click', () => {
  if (canChangeBackground && !isTransitioning) {
    clickCount++;
    if (clickCount == 1) { 
      document.body.style.backgroundColor = "blue";
    } 
    if (clickCount == 2) {
      document.body.style.backgroundColor = "green";
    }
    if (clickCount == 3) {
      document.body.style.backgroundColor = "red";
    }
    if (clickCount == 4) {
      document.body.style.backgroundColor = "purple";
      exitText.innerHTML = "PURPLE";
      setTimeout(() => {
        exitText.innerHTML = "Nothing else. See ya later, dickhead!!";
      }, 1000 * 3);
      setTimeout(() => {
        exitText.innerHTML = "";
      }, 1000 * 6);
    }
    //// text
    if (document.body.style.backgroundColor == "yellow") {
      exitText.innerHTML = "YELLOW";
    }
    if (document.body.style.backgroundColor == "blue") {
      exitText.innerHTML = "BLUE";
    }
    if (document.body.style.backgroundColor == "red") {
      exitText.innerHTML = "RED";
    }
    if (document.body.style.backgroundColor == "green") {
      exitText.innerHTML = "GREEN";
    }
    canChangeBackground = false;
    isTransitioning = true;
    setTimeout(() => {
      canChangeBackground = true;
    }, 3000); // 1000 milliseconds = 1 second
  }
});


/// 5 ///
const para = document.getElementById('para');
const string = "BOOOOOOOOooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!";
let fontSize = 300;
let a = 0;

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    const interval = setInterval(() => {

      fontSize -= 2;

      para.style.fontSize = fontSize + "px";

      para.innerHTML += string.charAt(a);

      a++;
      
      if (a >= string.length) {
        clearInterval(interval);
        para.innerHTML = "OMG!1!!! Did you just fard? That is SO disgusting!!!!";
        para.style.fontSize = "20px";
        setTimeout(() => {
          para.innerHTML = "";
        }, 1000 * 5);
        observer.unobserve(para);
      }
    }, 100);
  }
}, { threshold: 1 });

observer.observe(para);                                     


/// 6 ///


let input = document.getElementById('input'), // input/output button
  number = document.querySelectorAll('.numbers div'), // number buttons
  operator = document.querySelectorAll('.operators div'), // operator buttons
  result = document.getElementById('result'), // equal button
  clear = document.getElementById('clear'), // clear button
  resultDisplayed = false; // flag to keep an eye on what output is displayed

// adding click handlers to number buttons
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {

    // storing current input string and its last character in variables - used later
    let currentString = input.innerHTML;
    let lastChar = currentString[currentString.length - 1];

    // if result is not diplayed, just keep adding
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      // if result is currently displayed and user pressed an operator
      // we need to keep on adding to the string for next operation
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // if result is currently displayed and user pressed a number
      // we need clear the input string and add the new input to start the new opration
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// adding click handlers to number buttons
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {

    // storing current input string and its last character in variables - used later
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if last character entered is an operator, replace it with the currently pressed one
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      // if first key pressed is an operator, don't do anything
      console.log("enter a number first");
    } else {
      // else just add the operator pressed to the input
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// on click of 'equal' button
result.addEventListener("click", function() {

  // this is the string that we will be processing eg. -10+26+33-56*34/23
  var inputString = input.innerHTML;

  // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
  var numbers = inputString.split(/\+|\-|\×|\÷/g);

  // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
  // first we replace all the numbers and dot with empty string and then split
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  // now we are looping through the array and doing one operation at a time.
  // first divide, then multiply, then subtraction and then addition
  // as we move we are alterning the original numbers and operators array
  // the final element remaining in the array will be the output

  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    // using parseFloat is necessary, otherwise it will result in string concatenation :)
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // displaying the output

  resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
  input.innerHTML = "";
})





