var circle = document.getElementById("bouncingBall");

var copy = circle.cloneNode();
copy.style.top = "100px";
copy.style.backgroundColor = "#00ff00";
document.body.appendChild(copy);

var copy1 = circle.cloneNode();
copy1.style.top = "200px";
copy1.style.backgroundColor = "#0000ff";
document.body.appendChild(copy1);

move(circle, 0, window.innerWidth - 50, 5);
moveTimed(copy, 0, window.innerWidth - 50, 8000);
moveTimedEasing(copy1, 0, window.innerWidth - 50, 8000, quadEasing);

function move(elem, from, to, inc) {
	console.log("Moving from " + from + " to " + to);

	var left = from;

	function frame() {
		left = left + inc;
		elem.style.left = left + 'px';
		if (left >= to) {
			clearInterval(id);
		}
	}

	var id = setInterval(frame, 1000 / 60);
}

function moveTimed(elem, from, to, duration) {
	console.log("Moving from " + from + " to " + to);
	var left = from;
	var start = new Date();

	function frame() {
		var current = new Date();
		var progress = (current - start) / duration;
		console.log(progress);
		left = from + (to - from) * progress;
		elem.style.left = left + 'px';
		if (left >= to) {
			clearInterval(id);
		}
	}

	var id = setInterval(frame, 1000 / 60);
}

function moveTimedEasing(elem, from, to, duration, easing) {
	console.log("Moving from " + from + " to " + to);
	var left = from;
	var start = new Date();

	function frame() {
		var current = new Date();
		var progress = (current - start) / duration;

		left = from + (to - from) * easing(progress);
		elem.style.left = left + 'px';
		if (left >= to) {
			clearInterval(id);
		}
	}

	var id = setInterval(frame, 1000 / 60);
}

function linearEasing(p) {
	return p;
}

function quadEasing(p) {
	return Math.pow(p, 2);
}

//квадратики
var jsAnimation = document.querySelector('.js-animation');

jsAnimation.animate(
  [
    {
      offset: 0,
      transform: 'none'
    },
    {
      offset: 0.25,
      transform: 'translate(200px, 0)'
    },
    {
      offset: 0.5,
      transform: 'translate(200px, 200px)'
    },
    {
      offset: 0.75,
      transform: 'translate(0, 200px)'
    },
    {
      offset: 1,
      transform: 'none'
    }
  ],
  {
    delay: 500,
    endDelay: 0,
    fill: 'both',
    iterationStart: 0,
    iterations: 50,
    duration: 1000,
    direction: 'normal',
    easing: 'cubic-bezier(.6, 0, 1, .6)'
  }
);


//зигзаги
var path = document.getElementById('zigzag');
var length = path.getTotalLength();

//столбик
document.addEventListener('DOMContentLoaded', function() {
	var container = document.body.querySelector('.container');
	var inner = container.querySelector('.inner');
	var children_length = inner.querySelectorAll('div').length;
	var first_child_clone = inner.querySelector('div:first-child').cloneNode(true);
	inner.appendChild(first_child_clone);
	var second_unit = first_child_clone.offsetHeight; // 300px
	var circle = children_length * second_unit; //3div * 300px
	var second = circle / 1000 * children_length; // (3div * 300px / 1000ms) * 3div

	var speed = 2;

	var push = Array.prototype.push;
	function channel() {
		var values = [];
		var	callbacks = Array.apply(null, arguments);
		return function channel(first) {
			if (typeof first !== 'function') values.push(arguments);
			else push.apply(callbacks, arguments);
			while (values.length && callbacks.length)
				try {
					callbacks.shift().apply(channel, values.shift());
				}
			catch (err) {
				values.unshift([err]);
			}
			return channel;
		};
	}

	channel(function() {
		// console.log('ready');
		setPosition();
		setTimeout(this, 0, null);
	}, function() {
		yMove();
		setTimeout(this, 0, null);
	}());

	function setPosition() {
		var y = -circle;
		inner.style.transform = 'translateY(' + y + 'px)';
	}
	function yMove() {
		var y = -circle;
		setInterval(function() {
			if (y >= 0) y = -circle;
			y += second / speed;
			inner.style.transform = 'translateY(' + y + 'px)';
		}, 1);
	}
});
