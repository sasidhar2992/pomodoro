
var Pomodoro = function(name) {

  var target = $("#timeLeft");
  var session = $("#sessionTime").text();
  var breakTime = $("#breakTime").text();
  var audio = new Audio('http://soundbible.com/grab.php?id=1377&type=mp3');
  var intervalId = false;
  var whatsOn = $("#whatsOn");
  var activity;

  this.default = function() {
    this.reset();
  }

  this.init = function() {

    if (!intervalId) {
      intervalId = setInterval(name + '.Tick()', 1000);
    }

  }

  this.stop = function() {
    clearInterval(intervalId);
    intervalId = null;
  }

  this.reset = function() {
    this.minutes = parseInt($("#sessionTime").text());
    this.seconds = 00;
    this.update_target();
    this.stop();
    whatsOn.html("Session");
    activity = "Session";
  }

  this.Tick = function() {

    if (this.seconds == 0 && this.minutes == 0) {
      this.switch();
    } else if (this.seconds > 0 || this.minutes > 0) {

      if (this.seconds == 0) {
        this.minutes = this.minutes - 1;
        this.seconds = 59;
      } else {
        this.seconds = this.seconds - 1;
      }

      this.update_target();

    }
  }

this.getTime = function(time) {
	this.minutes = parseInt(time);
    this.seconds = 00;
}

  this.switch = function() {

    if (activity == "Session") {
      this.beep();
      this.getTime($("#breakTime").text());
      this.update_target();
      whatsOn.html("Break!");
      activity = "Break";
    } else {
      this.beep();
      this.getTime($("#sessionTime").text())
      this.update_target();
      whatsOn.html("Session");
      activity = "Session";
    }
    
  }

  this.update_target = function() {
    seconds = this.seconds;
    if (this.seconds < 10) this.seconds = "0" + seconds;
    target.html(this.minutes + ":" + this.seconds);
  }

  this.beep = function() {
    audio.play();
  }

	
}

$(".ctrl .plus").on("click", addMin)

$(".ctrl .minus").on("click", minusMin)

function addMin() {
	var thisBtn = $(this);
	var timeBox = thisBtn.siblings(".time");
	var time = parseInt(timeBox.text());
	time++;
	timeBox.text(time);
	pomo.reset();

}

function minusMin() {
	var thisBtn = $(this);
	var timeBox = thisBtn.siblings(".time");
	var time = parseInt(timeBox.text());
	if(time > 0) {
		time--;
		timeBox.text(time);
		pomo.reset();
	}
}

$("#timerButton").on("click", function() {

  if ($(this).hasClass("timerStart")) {
    pomo.init();
    $(this).removeClass("timerStart").addClass("timerStop").text("Stop");
  } else {
    pomo.stop();
    $(this).removeClass("timerStop").addClass("timerStart").text("Start");
  }

});

$("#timerReset").on("click", function() {
  pomo.reset();
});


var pomo = new Pomodoro("pomo");
pomo.default();