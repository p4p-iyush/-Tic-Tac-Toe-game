let boxes = document.querySelectorAll(".square");
let button = document.querySelector(".reset");
let winner_name = document.querySelector(".winner_name");

let turnO = true;
let gameActive = true;
const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const winnerName = (player) => {
    winner_name.innerText = "Winner is " + player;
};

const resetButton = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.classList.remove("x", "o");
    });
    turnO = true;
    gameActive = true;
    winner_name.innerText = "";
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        const [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            boxes[a].classList.add("winner");
            boxes[b].classList.add("winner");
            boxes[c].classList.add("winner");
            winnerName(boxes[a].innerText);
            gameActive = false;
            setTimeout(resetButton, 1000); // Reset the game after 2 seconds
            return;
        }
    }
    if ([...boxes].every(box => box.innerText)) {
        winner_name.innerText = "It's a draw!";
        gameActive = false;
        setTimeout(resetButton, 1000); // Reset the game after 2 seconds
    }
};

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (gameActive && !box.innerText) {
            box.innerText = turnO ? "X" : "O";
            box.classList.add(turnO ? "x" : "o");
            turnO = !turnO;
            checkWinner();
        }
    });
});

button.addEventListener("click", resetButton);
