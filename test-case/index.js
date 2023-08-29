const winnerCheckPatern = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
  ];
let emptyItems = [];

// initially insert board item into board
let turn = 0;
const board = document.getElementById("board");
for (let i=0; i<9; i++) {
  const divTag = elementFactory("div", null);
  divTag.addEventListener("click", mouseClickHandler);
  divTag.id = `item_${i+1}`;
  board.appendChild(divTag);
  emptyItems.push(divTag);
}

// handler for click event on board item
function mouseClickHandler(evt) {
  if (turn%2 === 0) {
    this.textContent = "o";
  } else {
    this.textContent = "x";
  }
  turn++;
  this.removeEventListener("click", mouseClickHandler);
  const newEmptyItems = emptyItems.filter(i => i !== this);
  emptyItems = newEmptyItems;
  const winnerPosition = winnerCheck(this);
  if (winnerPosition) {
    highlighWinner(winnerPosition);
    console.log(winnerPosition);
    for (let i of  emptyItems) {
      i.removeEventListener("click", mouseClickHandler);
    }
  }
}

// Factory function to create board item
function elementFactory(element, textContent) {
  const newElem = document.createElement(element);
  if (textContent) {
    newElem.innerHTML = textContent;
  }
  return newElem;
}

// Check winner each time user click on board item
function winnerCheck(clickedElement) {
  let elemPosition = clickedElement.id.split("_").pop();
  for (let i of winnerCheckPatern) {
    if (i.includes(Number(elemPosition))) {
      let matchCount = 0;
      for (let j of i) {
        let tempElem = document.getElementById(`item_${j}`);
        if(tempElem.textContent === clickedElement.textContent) {
          matchCount++;
          if (matchCount === 3) {
            return i;
          }
        }else {
          break;
        }
      }
    }
  }
}
// Highlight position of winner in board
function highlighWinner(winnerPosition) {
  for(let i of winnerPosition) {
    const tempElem = document.getElementById(`item_${i}`);
    tempElem.classList.add("winner");
  }
}

