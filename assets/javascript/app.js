//Game starts on a intro page. Clicking the startButton starts the quiz and resets the page
$("#startButton").on("click", function () {
  $("#startButton").remove();
  $("#instructions").remove();
  quiz.loadQuestion();
})

$(document).on("click", ".option-button", function (e) {
  quiz.clicked(e);
})

$(document).on("click", "#reset", function () {
  quiz.reset();
})

// --------------------------Question & Answers Array----------------------------------
var questions = [
  {
    question: "When was Walt Disney born?",
    options: ["A: December 5, 1901", "B: March 30, 1900", "C: July 17 1899", "D: February 5, 1894"],
    answer: "A: December 5, 1901",
    image: "assets/images/tinkerbell.gif"
  },
  {
    question: "Walt's character, Oswald, was a:",
    options: ["A: Cat", "B: Rabbit", "C: Frog", "D: Dog"],
    answer: "B: Rabbit",
    image:"assets/images/oswald.gif"
  },
  {
    question: "Walt Disney's partner, Ub Iwerks, is known for creating which of these five characters?",
    options: ["A: Goofy", "B: Dumbo", "C: Pinocchio", "D: Mickey"],
    answer: "D: Mickey",
    image:"assets/images/mickey.gif"
  },
  {
    question: "What was Walt Disney's first full length film?",
    options: ["A: Dumbo", "B: Pinocchio", "C: Snow White", "D: Cinderella"],
    answer: "C: Snow White",
    image:"assets/images/snow_white.gif"
  },
  {
    question: "Which of the following are not a Walt Disney quote?",
    options: ["A: It's kind of fun to do the impossible.",
      "B: To succeed, you must first realize the dream.",
      "C: I believe in being an innovator.",
      "D: If you can dream it, you can do it."],
    answer: "B: To succeed, you must first realize the dream.",
    image:"assets/images/tinkerbell.gif"
  },
  {
    question: "When did Disneyland open?",
    options: ["A: August 1, 1961", "B: May 30, 1959", "C: July 17, 1955", "D: June 14, 1949"],
    answer: "C: July 17, 1955",
    image:"assets/images/tinkerbell.gif"
  },
  {
    question: "Which of these celebrities did not host at least part of the opening day Disneyland broadcast?",
    options: ["A: Art Linkletter", "B: Ronald Reagan", "C: Kirk Douglas", "D: Irene Dunne"],
    answer: "C: Kirk Douglas",
    image:"assets/images/kirk_douglas.gif"
  },
  {
    question: "Which was not one of the opening day rides at Disneyland?",
    options: ["A: Autopia", "B: Mad Tea Party", "C: Dumbo the Flying Elephant", "D: The Jungle Cruise"],
    answer: "C: Dumbo the Flying Elephant",
    image:"assets/images/dumbo.gif"
  },
  {
    question: "What terminal illness did Walt Disney suffer from",
    options: ["A: Lung Cancer", "B: Heat Stroke", "C: Pneumonia", "D: Brain Cancer"],
    answer: "A: Lung Cancer",
    image:"assets/images/lungs.gif"
  }];

// ----------------------------------------Functions------------------------------------

var quiz = {
  questions: questions,
  currentQuestion: 0,
  currentImage: 0,
  counter: 30,
  correct: 0,
  incorrect: 0,
  unanswered: 0,


  countdown: function () {
    quiz.counter--;
    $("#counter").html(quiz.counter);
    if (quiz.counter <= 0) {
      console.log("TIME UP!");
      quiz.timeUp();
    }
  },

  loadQuestion: function () {
    timer = setInterval(quiz.countdown, 1000);
    $("#gameDisplay").html("<h2> Time remaining <span id='counter'> 30 </span> seconds</h2>");
    $("#gameDisplay").append("<h2>" + questions[quiz.currentQuestion].question + "</h2>");
    //For loop to dynamically create buttons equal to the options.
    for (var i = 0; i < questions[quiz.currentQuestion].options.length; i++) {
      $("#gameDisplay").append("<button class='option-button' id='button-" + i + "' data-name='" + questions[quiz.currentQuestion].options[i] + "' >" +
        questions[quiz.currentQuestion].options[i] + "</button>");
    }
  },

  displayImage: function () {
    $("#imageDisplay").append("<img src=" + questions[quiz.currentQuestion].image + ">");
  },

  nextQuestion: function () {
    quiz.counter = 30;
    $("#counter").html(quiz.counter);
    quiz.currentQuestion++;
    quiz.loadQuestion();
    $("#imageDisplay").empty();
  },

  timeUp: function () {
    clearInterval(timer);
    quiz.unanswered++;
    $("#gameDisplay").html("<h2>You're out of time!</h2>");
    $("#gameDisplay").append("<h3>The answer you were looking for is " +
      questions[quiz.currentQuestion].answer + "</h3>");
    quiz.displayImage();

    if (quiz.currentQuestion == questions.length - 1) {
      $("#imageDisplay").empty();
      setTimeout(quiz.results, 3 * 1000);
      
    }
    else {
      setTimeout(quiz.nextQuestion, 3 * 1000);
    }
  },
  results: function () {
    clearInterval(timer);
    $("#gameDisplay").html("<h2>All done!</h2>");
    $("#gameDisplay").append("<h3>Correct answers: " + quiz.correct + "</h3>");
    $("#gameDisplay").append("<h3>Incorrect answers: " + quiz.incorrect + "</h3>");
    $("#gameDisplay").append("<h3>Unaswered: " + quiz.unanswered + "</h3>");
    $("#gameDisplay").append("<button id='reset'> RESET</button>");
    $("#imageDisplay").empty();
  },

  clicked: function (e) {
    clearInterval(timer);
    if ($(e.target).data("name") == questions[quiz.currentQuestion].answer) {
      quiz.answeredCorrectly();
    }
    else {
      quiz.answeredIncorrectly();
    }
  },

  answeredCorrectly: function () {
    clearInterval(timer);
    quiz.correct++;
    $("#gameDisplay").html("<h2>You got it right!</h2>");
    //append image at current index
    quiz.displayImage();

    if (quiz.currentQuestion == questions.length - 1) {
      setTimeout(quiz.results, 3 * 1000);
    }
    else {
      setTimeout(quiz.nextQuestion, 3 * 1000);
    }
  },

  answeredIncorrectly: function () {
    clearInterval(timer);
    quiz.incorrect++;
    $("#gameDisplay").html("<h2>Wrong answer!</h2>");
    $("#gameDisplay").append("<h3>The answer you were looking for is " +
      questions[quiz.currentQuestion].answer + "</h3>");
    quiz.displayImage();

    if (quiz.currentQuestion == questions.length - 1) {
      setTimeout(quiz.results, 3 * 1000);
    }
    else {
      setTimeout(quiz.nextQuestion, 3 * 1000);
    }
  },


  reset: function () {
    $("#imageDisplay").empty();
    quiz.currentQuestion = 0;
    quiz.counter = 30;
    quiz.correct = 0;
    quiz.incorrect = 0;
    quiz.unanswered = 0;
    quiz.loadQuestion();
  }

}


