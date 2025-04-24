let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-Container");
let message = document.querySelector("#msg");
let turnO = true; // for writing O

// WIN Patterns (array of arrays)
const winPtns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBtns();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Play O or X
    if (turnO) {
      box.innerText = "O";
      box.classList.add("o-style");
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.add("x-style");
      turnO = true;
    }

    box.disabled = true;
    checkWinner();
  });
});

const disableBtns = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBtns = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("o-style", "x-style"); // Remove both classes
  }
};

const showWinner = (winner) => {
  message.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBtns();
};

// Check if there is a winner or if the game is a draw
const checkWinner = () => {
  // Check for winner
  for (let pattern of winPtns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return; // Exit the function if a winner is found
    }
  }

  // Check for draw (if all boxes are filled and no winner)
  let isDraw = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      isDraw = false;
      break;
    }
  }

  if (isDraw) {
    message.innerText = "Ah, the game has ended in a draw.";
    msgContainer.classList.remove("hide");
    disableBtns();
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);