var triviaObject = [
    {
        question: "What is the most popular race/class combination in the game?",
        answerIndex: 2,
        answers: ["Goblin Rogue", "High-Elf Wizard", "Human Fighter", "Aasimar Paladin"],
        image: "assets/images/humanFighter.gif"
    },
    {
        question: "Who was the creator of the original Dungeons & Dragons game?",
        answerIndex: 3,
        answers: ["Dan Harmon", "Matthew Mercer", "Jeremy Crawford", "Gary Gygax"],
        image: "assets/images/gygax.gif"
    },
    {
        question: "What is the name of the company that publishes and owns the game?",
        answerIndex: 2,
        answers: ["Paizo", "Parker Brothers", "Wizards of the Coast", "Hasbro"],
        image: "assets/images/wizards.gif"
    },
    {
        question: "Which standard two-handed weapon has the highest average damage?",
        answerIndex: 0,
        answers: ["Greatsword", "Quarterstaff", "Greataxe", "Maul"],
        image: "assets/images/greatsword.gif"
    },
    {
        question: "What is the most essential mental attribute for a Sorcerer?",
        answerIndex: 3,
        answers: ["Sanity", "Intelligence", "Wisdom", "Charisma"],
        image: "assets/images/sorcerer.gif"
    },
    {
        question: "What is the common term for a person who argues excessively over rules in Dungons & Dragons?",
        answerIndex: 1,
        answers: ["Rules Ninny", "Rules Lawyer", "Rule Tool", "Armstrong"],
        image: "assets/images/lawyer.gif"
    },
    {
        question: "What is the latest edition of Dungeons & Dragons?",
        answerIndex: 0,
        answers: ["5e", "3.5", "6e", "AD&D"],
        image: "assets/images/5e.gif"
    },
    {
        question: "Which class gets the 'Sneak Attack' feature?",
        answerIndex: 1,
        answers: ["Fighter", "Rogue", "Paladin", "Ranger"],
        image: "assets/images/sneakAttack.gif"
    }
]

var gameStarted = false;
var questionTimer = 15;
var triviaIndex = 0;
var intervalHolder;
var numberOfQuestions = 4;
var numRight = 0;
var numWrong = 0;
$(document).ready(function () {

    $("body").on("click", "#timer-text", function () {
        if (!gameStarted) {
            populateQuestions(triviaIndex);
        }
    })

    $("body").on("click", ".incorrect", function () {
        numWrong++;
        loser();
        window.setTimeout(function () { populateQuestions(triviaIndex) }, 5000)
    })

    $("body").on("click", ".correct", function () {
        console.log("Clicked correct");
        numRight++;
        loser();
        window.setTimeout(function () { populateQuestions(triviaIndex) }, 5000)
    })
})

function loser() {
    clearInterval(intervalHolder);
    if (triviaIndex === 8) {
        console.log("Hooray we finished");
        $("#question").html("You've Completed the Trivia! Wait for your results!");
    }
    else
        $("#question").html(`The answer was: 
            ${triviaObject[triviaIndex - 1].answers[triviaObject[triviaIndex - 1].answerIndex]}. 
            Question #${(triviaIndex + 1)} is coming right up.`);

    for (var i = 0; i < numberOfQuestions; i++) {
        $(`#answer-${i + 1}`).empty();
    }
    $("#timer-text").html(`<img src="${triviaObject[triviaIndex - 1].image}">`);
}


function populateQuestions(index) {
    if (index === 8) {
        $("#answer-1").text(`Guesses Right: ${numRight}   Guesses Wrong: ${numWrong}`);
        $("#answer-2").append("Click on the sneaky cat to restart!");
        questionTimer = 0;
        triviaIndex = 0;
        numRight = 0;
        numWrong = 0;
        gameStarted = false
    }
    else {
        questionTimer = 15;
        $("#timer-text").html("Time Remaining: <span id='seconds'>15</span>");
        $("#question").text(triviaObject[index].question);

        for (var i = 0; i < numberOfQuestions; i++) {
            var answer = $(`#answer-${i + 1}`).text(triviaObject[index].answers[i]);

            if (triviaObject[index].answerIndex === i)
                answer.attr("class", "correct");
            else
                answer.attr("class", "incorrect");

        }
        gameStarted = true;
        triviaIndex++;

        intervalHolder = setInterval(function () {
            $("#seconds").text(questionTimer--);
            if (questionTimer === -1) {
                clearInterval(intervalHolder);
                numWrong++;
                loser();
                window.setTimeout(function () { populateQuestions(triviaIndex) }, 5000)
            }
        }, 1000);

    }
}


