// ----------------------------------------------- Main Process of the quiz ---------------------------------------------------------//
$(document).ready(function () {
    
    $("#start-button").on("click", function () {
        console.log("start")
        $("#start-button").remove();
        timeRemaining();
        loadQuestion(currentQuestion);
    })
    function loadQuestion(questionIndex) {
        var q = questions[questionIndex];
        questionEl.textContent = (questionIndex + 1) + ' ' + q.question;
        opt1.textContent = q.option1;
        opt2.textContent = q.option2;
        opt3.textContent = q.option3;
        opt4.textContent = q.option4;
    };

    $(".next-btn").on("click", function () {
        console.log("next")
        timeRemaining();
        loadNextQuestion();
        
    })
    

    //Create the time remaining countdown
    function timeRemaining() {
        clearInterval(intervalId)
        intervalId = setInterval(thirtySeconds, 1000);
        
    }


    // End quiz if counter gets to 0 and display results
    function thirtySeconds() {
        counter--;
        $("#timer").html(counter);
        if (counter === 0) {
            stop();
            displayResults()
        }

    }

    function stop() {
        clearInterval(intervalId);
    }

    function displayResults() {
        $(".results").append("<h3> You got " + correctAnswers + " correct </h3>");
        $(".results").append("<h3> You got " + incorrectAnswers + " wrong </h3>");
        console.log("displayResults")
    }

    function loadNextQuestion() {
        var selectedOption = document.querySelector('input[type=radio]:checked');
        if (!selectedOption) {
            alert('Please select your answer');
            return;
        }
        var answer = selectedOption.value;
        if (questions[currentQuestion].answer == answer) {
            correctAnswers++;
        }
        selectedOption.checked = false;
        currentQuestion++;
        if (currentQuestion == totalQuestions - 1) {
            nextButton.textContent = 'Finish';
        }
        if (currentQuestion == totalQuestions) {
            grid.style.display = 'none';
            result.textContent = "<h3> You got " + correctAnswers + " correct </h3>";
            result.textContent = "<h3> You got " + incorrectAnswers + " incorrect </h3>";
            return;
        }

    }







    // ------------------------------------  Q&A Array  -------------------------------------//
    var questions = [

        {
            "question": "When was Walt Disney born?",
            "option1": "December 5, 1901",
            "option2": "March 30, 1900",
            "option3": "July 17 1899",
            "option4": "February 5, 1894",
            "answer": "December 5, 1901"
        },
        {

            "question": "Walt's character, Oswald, was a:",
            "option1": "Cat",
            "option2": "Rabbit",
            "option3": "Frog",
            "option4": "Dog",
            "answer": "Rabbit"
        },
        {
            "question": "Walt Disney's partner, Ub Iwerks, is known for creating which of these five characters?",
            "option1": "Goofy",
            "option2": "Dumbo",
            "option3": "Pinocchio",
            "option4": "Mickey",
            "answer": "Mickey"
        },
        {
            "question": "What was Walt Disney's first full length film?",
            "option1": "Dumbo",
            "option2": "Pinocchio",
            "option3": "Snow White",
            "option4": "Cinderella",
            "answer": "Snow White"

        },
        {
            "question": "Which of the following are not a Walt Disney quote?",
            "option1": "It's kind of fun to do the impossible.",
            "option2": "To succeed, you must first realize the dream.",
            "option3": "I believe in being an innovator.",
            "option4": "If you can dream it, you can do it.",
            "answer": "To succeed, you must first realize the dream."

        },
        {
            "question": "When did Disneyland open?",
            "option1": "August 1, 1961",
            "option2": "May 30, 1959",
            "option3": "July 17, 1955",
            "option4": "June 14, 1949",
            "answer": "July 17, 1955"
        },
        {
            "question": "Which of these celebrities did not host at least part of the opening day Disneyland broadcast?",
            "option1": "Art Linkletter",
            "option2": "Ronald Reagan",
            "option3": "Kirk Douglas",
            "option4": "Irene Dunne",
            "answer": "Kirk Douglas"

        },
        {
            "question": "Which was not one of the opening day rides at Disneyland?",
            "option1": "Autopia",
            "option2": "Mad Tea Party",
            "option3": "Dumbo the Flying Elephant",
            "option4": "The Jungle Cruise",
            "answer": "Dumbo the Flying Elephant"

        },
        {
            "question": "What terminal illness did Walt Disney suffer from",
            "option1": "Lung Cancer",
            "option2": "Heat Stroke",
            "option3": "Pneumonia",
            "option4": "Brain Cancer",
            "answer": "Lung Cancer"

        },
        {
            "question": "Last Question! You're a trooper! When did Walt Disney World open?",
            "option1": "November 19, 1980",
            "option2": "July 17, 1970",
            "option3": "June 3, 1981",
            "option4": "October 1, 1971",
            "answer": "October 1, 1971"

        },
    ]

    //All other variables to keep track of time, questions, and scores

    var currentQuestion = 0;
    var counter = 31;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var totalQuestions = questions.length;
    var intervalId;
    var selectedOption;
    var grid = document.getElementById('grid');
    var questionEl = document.getElementById('question');
    var opt1 = document.getElementById('opt1');
    var opt2 = document.getElementById('opt2');
    var opt3 = document.getElementById('opt3');
    var opt4 = document.getElementById('opt4');
    var nextButton = document.getElementById('nextButton')
    result = document.getElementById('results');
    var correctSound = new Audio("assets/sounds/fairy.mp3");
    var incorrectSound = new Audio("assets/sounds/womp-womp.mp3");



})

