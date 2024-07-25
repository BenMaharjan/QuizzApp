console.log("Quiz App");

const questionScreen = document.getElementsByClassName("quizScreen");
const failScreen = document.getElementsByClassName("failScreen");
const passScreen = document.getElementsByClassName("passScreen");
const quizForm = document.querySelector('.quizForm')
const screen = document.querySelectorAll(".screen");
const question = document.querySelector(".questions");
const answerLabel = document.querySelectorAll(".answerLabel");

let answerID = 3 // plans to use (Math.round(Math.random() * 4)) to randomize correct answer
const correctAnswer = `answer`+answerID;

quizForm.addEventListener("submit", function(event){
    event.preventDefault();
    
    // after submit hide all screens
    screen.forEach(screen => screen.classList.add("hide"));
    screen.forEach(screen => screen.classList.remove("show"));

    //selectedAnswer is equal to the radio button selected
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    //Show passScreen if selected answer is correct else show failscreen
    if (selectedAnswer.value === correctAnswer) {
        passScreen[0].classList.add("show");
        passScreen[0].classList.remove("hide");
    } else {
        failScreen[0].classList.add("show");
        failScreen[0].classList.remove("hide");
    }
})

//fetch data from API
fetch ("https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple")
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        //Replaces textContent of radio button with incorrect answers.
        function answerReplace(){
            let x=0;

                //Checks to see if the current answerLabel in the loop is the same as the correct answer (currently set to 3) and if not replaces textContent of answeLabel(the four answers in the form) with the incorrect answers from the API
                for(let i = 0; i < answerLabel.length; i++) {
                    if(answerLabel[i] === answerLabel[(answerID - 1)]) {
                        continue;
                    } else {
                        answerLabel[i].textContent = (data.results[0].incorrect_answers[x])
                        x++;        
                    }
                }
        }

        // Replaces the textContent of the form legend element with the question data from the API
        question.textContent = (data.results[0].question);

        //Replaces the textContent of the answerLabel 3(currently set to 3) with the correct_answer data from the API
        answerLabel[(answerID - 1)].textContent = (data.results[0].correct_answer);

        //Calls function that will fill the rest of the answerLabels with the incorrect_answers data from the API
        answerReplace();
    })
    .catch(function(error) {
        console.error("ERROR : ", error);
    })

