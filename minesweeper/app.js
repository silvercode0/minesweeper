document.addEventListener("DOMContentLoaded", () => {
    // this is used fot the conent of page to be loaded first before the javascript //
    const grid = document.querySelector(".grid");
    const pumpkinsLeft = document.querySelector("#pumpkins-left");
  
    // this will not change throughout the code //
    let width = 10;
    let ghostsAmount = 20;
    let pumpkins = 0;
    let isGameOver = false;
    let squares = [];
    //   create an empty array called squares
    //   Create Board
    function createBoard() {
      pumpkinsLeft.innerHTML = ghostsAmount;
      // get bombs on the grid by random everytime you start a new game //
      const ghostsArray = Array(ghostsAmount).fill("ghost");
      // create a variable that puts the bombs on the grid randomly - this is what the bombs will be called //
      const emptyArray = Array(width * width - ghostsAmount).fill("k");
      // create an empty array for the other squares that arent filled with bombs //
      const gameArray = emptyArray.concat(ghostsArray);
      //  this will represent the acual game array that we will be playing with //
      const shuffleArray = gameArray.sort(() => Math.random() - 0.5);
      // use math random to get everything randomized so you can play a new game //
      // create another array to shuffle the gameArray that you used to join the bomb and the empty array together to form the new game //
      for (let i = 0; i < width * width; i++) {
        const square = document.createElement("div");
        // creating a div for the squares
        square.setAttribute("id", i);
        // creating the id for the squares
        square.classList.add(shuffleArray[i]);
        // add a class name to your square
        grid.appendChild(square);
        // now need to add it in your div and do this by using an inbuilt method of apend child //
        // which will pass through the square as a parameter //
        squares.push(square);
        // use array squares to take the square you just created and puch it into it //
  
        // ADD EVENT LISTENERS //
        // Normal Click //
        square.addEventListener("click", function (e) {
          // click is the event (what will trigger the code to run)
          click(square);
        });
        // control button and the left click //
        square.oncontextmenu = function (e) {
          e.preventDefault();
          // do not the default to happen -- use preventDefault method //
          // add a control and left click to each square //
          addPumpkin(square);
        };
      }
      // add numbers to the squares surrounding a bomb or bombs //
      for (let i = 0; i < squares.length; i++) {
        let total = 0;
        //
        // check it 100 times
        // if there is a bomb on the right hand side of grid, we don't want to check the right side for squares of the bomb just where bomb is touching //
        // if there is a bomb on the left side of grid (touching the wall) then only count the squares that it touches //
        // create a for loop to check the squares surrounding the bombs and total the number of bombs it is touching //
        const isLeftEdge = i % width === 0;
        // example if 10(i) is divisible by the width(10) then leaves a remainder of 0 // makes it true
        // this will only work if i is divisible by the width and leaves a remainder of 0 //
        const isRightEdge = i % width === width - 1;
        // example 19 % 10 === 9, and width(10) - 1 = 9 // this is true
        // takes the module of i and 10(width) and equals it to width - 1 //
        // if it doesn't equal this then its false for a bomb //
        // NOW WE WANT TO CHECK THE VALID //
        if (squares[i].classList.contains("k")) {
          // if the square we are looping over contains valid (not a bomb), I want to >>> add 1 to the total //
          if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("ghost"))
            total++;
          //   only add 1 if all three of those statements are true ^^^ //
          if (
            i > 9 &&
            !isRightEdge &&
            squares[i + 1 - width].classList.contains("ghost")
          )
            total++;
          // checking around if there are squares touching a bomb and if there are then it adds 1 to the total //
  
          if (i > 10 && squares[i - width].classList.contains("ghost")) total++;
          // checking above the squares to see if it touches a bomb or the bomb touches a square //
          // if touches add 1 to the total //
          if (
            i > 11 &&
            !isLeftEdge &&
            squares[i - 1 - width].classList.contains("ghost")
          )
            total++;
          // checking above the squares to see if it touches a bomb or the bomb touches a square //
          // if touches add 1 to the total //
          if (
            i < 98 &&
            !isRightEdge &&
            squares[i + 1].classList.contains("ghost")
          )
            total++;
          //  add one to tatal if there is a bomb touching a square and you click on it //
          if (
            i < 90 &&
            !isLeftEdge &&
            squares[i - 1 + width].classList.contains("ghost")
          )
            total++;
          //  add one to the toatal if these conditions are met ^^^ //
          if (
            i < 88 &&
            !isRightEdge &&
            squares[i + 1 + width].classList.contains("ghost")
          )
            total++;
          //  add 1 to the total if i is less than 88 and is not on the right edge and if there is a bomb //
          if (i < 89 && squares[i + width].classList.contains("ghost")) total++;
          // if these conditions are met add 1 to the total // i is less than 89 and square contains bomb //
  
          squares[i].setAttribute("data", total);
          console.log(squares[i]);
        }
      }
    }
    createBoard();
  
    // Add FLAG with RIGHT CLICK //
    function addPumpkin(square) {
      if (isGameOver) return;
      // if game is over return // break the function //
      if (!square.classList.contains("checked") && pumpkins < ghostsAmount);
      // if the square contains checked and has flags then take away the bombamount //
      {
        if (
          !square.classList.contains("pumpkin") &&
          // !square.classList.contains("valid") &&
          !square.classList.contains("checked") &&
          !square.classList.contains("one") &&
          !square.classList.contains("two") &&
          !square.classList.contains("three") &&
          !square.classList.contains("four") &&
          !square.classList.contains("five") &&
          !square.classList.contains("six")
        ) {
          // the square doesn't contain flag //
          square.classList.add("pumpkin");
          // add the flag to that square // class //
          square.innerHTML = "🎃";
          // add the flag on the square //
          pumpkins++;
          // add 1 to the pumpkin total //
          pumpkinsLeft.innerHTML = ghostsAmount - pumpkins;
          checkWin();
        } else {
          if (square.classList.contains("pumpkin")) {
            square.classList.remove("pumpkin");
            square.innerHTML = "";
            pumpkins--;
            pumpkinsLeft.innerHTML = ghostsAmount - pumpkins;
          }
        }
        // } else {
        //   // If flag is already there in that square //
        //   square.classList.remove("pumpkin");
        //   // removes the flag from the square //
        //   square.innerHTML = "";
        //   // return the square's print back to empty //
        //   pumpkins--;
        //   // decrease the pumpkins and add 1 back to the pumpkin total //
        //   pumpkinsLeft.innerHTML = ghostsAmount - pumpkins;
        // }
      }
    }
  
    // CLICK FUNCTION // SQUARE ACTIONS // RECURSION //
    function click(square) {
      let currentId = square.id;
      // got to define the variable we will use to get the id of the square //
      if (isGameOver) return;
      // if game is over --- break out of function //
      if (
        square.classList.contains("checked") ||
        square.classList.contains("pumpkin")
      )
        return;
      // if square is checked or a flag break the function //
  
      if (square.classList.contains("ghost")) {
        gameOver(square);
        // If you click on a bomb you will loose // when a bomb is clicked on alret to user they have lost //
      } else {
        let total = square.getAttribute("data");
        //  if we click on a square thats not a bomb, I want the data to show // how many bombs the squares are touching //
        if (total != 0) {
          // if the toatal doesn't equal zero -- grab square again //
          square.classList.add("checked");
          // add the class of checked to the square ^^ //
          if (total == 1) square.classList.add("one");
          // if total is 1 add 1
          if (total == 2) square.classList.add("two");
          // if total is 2 add 2
          if (total == 3) square.classList.add("three");
          //  if total is 3 add 3
          if (total == 4) square.classList.add("four");
          //  if total is 4 add 4
          if (total == 5) square.classList.add("five");
          if (total == 6) square.classList.add("six");
          square.innerHTML = total;
          // you want to input a number from the data on to the page //
          return;
        }
        checkNearSquare(square, currentId);
        // Want to look at the square and square id to mark as checked when you click on a square // only checks(marks) the squares that have no bombs //
        // would also stop at squares that have totals //
      }
      square.classList.add("checked");
    }
  
    // Checking the squares that are near the one you clicked // Stops when it doesn't hit any more blank squares //
    // Function Check Near Squares //
    function checkNearSquare(square, currentId) {
      // I want to take in the square and its ID state //
      const isLeftEdge = currentId % width === 0;
      // Have to check if the square is on the left edge //
      const isRightEdge = currentId % width === width - 1;
      // Check to see if the squareis on the right edge //
      // Add some time difference so it looks nice //
      setTimeout(() => {
        if (currentId > 0 && !isLeftEdge) {
          // we want to get the ID of the sqaure directly left of the square you clicked on //
          const newId = squares[parseInt(currentId) - 1].id;
          // Name a new variable that takes the sqaure and the array and then gets the id of that square thats left of the square you clicked //
          const newSquare = document.getElementById(newId);
          // Take the newId and put it as a new square //
          click(newSquare);
          // JS will know to take the first parameter so the newID will just get ignored // you don't need it // the main function click(square) only takes in one parameter //
          // pass the new square back through the click function to be checked again //
          // if gets returned on click function then it stops passing it through the function //
        }
        if (currentId > 9 && !isRightEdge) {
          // if these conditions are met run code below // current ID is greater then 9 and isnt on the right edge run this //
          const newId = squares[parseInt(currentId) + 1 - width].id;
          // Get the new Id of the square thats directly to right //
          const newSquare = document.getElementById(newId);
          // I have this new square and its ID, I can then pass it through the click function //
          click(newSquare);
        }
        if (currentId > 10) {
          // checking the sqaure above //
          const newId = squares[parseInt(currentId - width)].id;
          // Get the new Id of the square thats directly to right //
          const newSquare = document.getElementById(newId);
          // I have this new square and its ID, I can then pass it through the click function //
          click(newSquare);
        }
        if (currentId > 11 && !isLeftEdge) {
          // if the currentid is bigger then 11 and isn't on the left edge then run this code //
          const newId = squares[parseInt(currentId) - 1 - width].id;
          // Get the new Id of the square thats directly 1 to the left of it and up //
          const newSquare = document.getElementById(newId);
          // I have this new square and its ID, I can then pass it through the click function //
          click(newSquare);
        }
        if (currentId < 98 && !isRightEdge) {
          // if the currentid is bigger then 98 and isn't on the right edge then run this code //
          const newId = squares[parseInt(currentId) + 1].id;
          // get the Id of the sqaure
          const newSquare = document.getElementById(newId);
          // I have this new square and its ID, I can then pass it through the click function //
          click(newSquare);
        }
        if (currentId < 90 && !isLeftEdge) {
          // if the currentid is bigger then 98 and isn't on the left edge then run this code //
          const newId = squares[parseInt(currentId) - 1 + width].id;
          // getting the id of the sqaures around the sqaure you clicked on//
          const newSquare = document.getElementById(newId);
          // I have this new square and its ID, I can then pass it through the click function //
          click(newSquare);
        }
        if (currentId < 88 && !isRightEdge) {
          // if the currentid is bigger then 88 and isn't on the right edge then run this code //
          const newId = squares[parseInt(currentId) + 1 + width].id;
          // gets the new ID of the squares around the one you clicked on < add 1
          const newSquare = document.getElementById(newId);
          // I have this new square and its ID, I can then pass it through the click function //
          click(newSquare);
        }
        if (currentId < 89) {
          // checking the square below and making sure the current id of that sqaure is less than 89 //
          const newId = squares[parseInt(currentId) + width].id;
          // gets the new id of the squares surrounding the square that clicked on //
          // ParseInt makes sure that the thing you are grabbing is a number //
          const newSquare = document.getElementById(newId);
          // I have this new square and its ID, I can then pass it through the click function //
          click(newSquare);
        }
      }, 10);
    }
  
    // function for when the game is over or you lost //
    function gameOver(square) {
      alert("You have LOST. Game Over.");
      isGameOver = true;
      // alerts you that you have lost and that the game is over so isGameOver is true //
      // I want all the bombs to show themselves when a bomb is clicked on and the function gameOver runs //
      squares.forEach((square) => {
        // goes throuh each square and searches for the bombs
        if (square.classList.contains("ghost")) {
          square.innerHTML = "👻";
          // shows a ghost where all bombs are if you click a bomb and it announces game over //
          square.classList.remove("ghost");
          square.classList.add("checked");
        }
      });
    }
  
    // Win function //
  
    function checkWin() {
      let spiderWebs = 0;
      for (let i = 0; i < squares.length; i++) {
        // create a loop so it can loop though the grid to figure out if you have won //
        if (
          squares[i].classList.contains("pumpkin") &&
          squares[i].classList.contains("ghost")
        ) {
          // if the square contain pumpkin and ghost are true ^^^^ then proceed //
          spiderWebs++;
        }
        if (spiderWebs === ghostsAmount) {
          // you have won the game //
          alert("Nice Work. You Win. 🕸️ ");
          isGameOver = true;
        }
      }
    }
    document.querySelector("#restartBtn").addEventListener("click", function (e) {
      window.location.reload();
    });
  });