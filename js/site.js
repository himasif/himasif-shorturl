var numColoursCreated = 0;
var numColoursDisplayed = 0;
var coloursIDs = [];
var lastColour = '#246655';

var animationName = 'AnimationName';

var maxSpeed 		= 60;
var minSpeed 		= 0;
var currentSpeed 	= 30;

var degOffset 		= 90;
var scrollAngle 	= 40; // for trig
var gradientAngle	= 230; // for css animation

var startX 	= 0; 
var startY 	= 50;
var endX 	= 100; 
var endY 	= 50;

var entityMap = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': '&quot;',
	"'": '&#39;',
	"/": '&#x2F;'
};

function escapeHtml(string) {
	return String(string).replace(/[&<>"'\/]/g, function (s) {
	  return entityMap[s];
	});
}

/* Mobile (iOS) is taking on extra whitespace to the bottom */

function setContainerHeight() {
	if ($('body').height() > $('#container').height()) {
		$('body').height($('#container').height());
		$('html').height($('#container').height());
	}
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function mod(n, m) {
        return ((m % n) + n) % n;
}

function resetCSS()
{
	coloursIDs.forEach(function(elementID) {
		if (elementID !== null) 
		{
			$(elementID).spectrum("destroy");
			$(elementID).remove();
	    }
	});

	numColoursCreated 		= 0;
	numColoursDisplayed 	= 0;
	coloursIDs 				= [];

	lastColour 		= '#246655';
	animationName 	= 'AnimationName';

	maxSpeed 		= 61;
	minSpeed 		= 1;
	currentSpeed 	= 30;

	degOffset 		= 90;
	scrollAngle 	= 40; // for trig
	gradientAngle	= 230; // for css animation

	$("#speed").slider('value', currentSpeed);

	$('#scrollAngle').anglepicker("value", 0);
	$('#gradientAngle').anglepicker("value", 0);
	$('#container').css('animation', 'none'); //reset it
	$('#container').css('background-size', 'auto');
	setTimeout(function(){
		$('#container').css('background', 'linear-gradient(230deg, #4bcf93, #4b79cf, #a24bcf)');
		$('#container').css('background-size', '300% 300%');
		$('#container').css('animation', 'MoveBG 60s ease infinite');

		$.keyframe.define([{
		    name: 'MoveBG',
		    '0%': {'background-position': startX + '% ' + startY + '%'},
		    '50%': {'background-position': endX + '% ' + endY + '%'},
		    '100%': {'background-position': startX + '% ' + startY + '%'}
		}]);
	});

	startX 	= 0; 
	startY 	= 50;
	endX 	= 100; 
	endY 	= 50;

	updateOutputCSS();
	setContainerHeight();
}

function applyCSS()
{
	if (numColoursDisplayed < 2)
	{		
		$('#error').slideDown(300);
		return;
	}

	scrollAngle 	= mod(360, $('#scrollAngle').anglepicker("value") ); // for trig
	gradientAngle 	= mod(360, (-1 * ($('#gradientAngle').anglepicker("value") + degOffset))); // for css animation

	var colours 		= [];


	coloursIDs.forEach(function(elementID) {
		if (elementID !== null) 
		{
	    	colours.push($(elementID).spectrum("get").toHexString());
	    }
	});

	var background 		= 'linear-gradient('+gradientAngle+'deg, ' + colours.join(',') + ')';
	var backgroundSize 	= (colours.length * 100) + '% ' + (colours.length * 100) +  '%';
	var animation 		= 'CustomAnimation '+(currentSpeed)+'s ease infinite';

	$('#container').css('animation', 'none'); //reset it
	$('#container').css('background-size', 'auto');
	setTimeout(function(){
		$('#container').css('background', background);
		$('#container').css('background-size', backgroundSize);
	    $('#container').css('animation', animation); //set it back

		$.keyframe.define([{
		    name: 'CustomAnimation',
		    '0%': {'background-position': startX + '% ' + startY + '%'},
		    '50%': {'background-position': endX + '% ' + endY + '%'},
		    '100%': {'background-position': startX + '% ' + startY + '%'}
		}]);		
	});
}

function handleScrollAngleChange(newAngle)
{
	scrollAngle 	= mod(360, newAngle); // for trig

	if ((scrollAngle < 45) || ((135 < scrollAngle) && (scrollAngle < 225)) || (315 < scrollAngle))
	{
		var mathStuff = Math.tan(toRadians(180-scrollAngle));

		startX 	= 0;
		startY 	= 100 - parseInt((50 * mathStuff) + 50);
		endX	= 100;
		endY 	= 100 - parseInt(50 - (50 * mathStuff));
	}
	else
	{
		var mathStuff = Math.tan(toRadians(scrollAngle-90));

		startX 	= 100 - parseInt((50 * mathStuff) + 50);
		startY 	= 0;
		endX 	= 100 - parseInt(50 - (50 * mathStuff));
		endY 	= 100;
	}

	startX 	= Math.min(100, startX); 
	startY 	= Math.min(100, startY);
	endX 	= Math.min(100, endX); 
	endY 	= Math.min(100, endY);
}

function updateOutputCSS() 
{
	scrollAngle 	= mod(360, $('#scrollAngle').anglepicker("value") ); // for trig
	gradientAngle 	= mod(360, (-1 * ($('#gradientAngle').anglepicker("value") + degOffset))); // for css animation

	var backgroundSize 	= (2 * numColoursDisplayed * 100) + '% ' + (2 * numColoursDisplayed * 100) +  '%';
    var colourString 	= "";
	coloursIDs.forEach(function(elementID) {
		if (elementID !== null) 
		{
	    	colourString += ', ' + $(elementID).spectrum("get").toHexString();
	    }
	});

	if (numColoursDisplayed > 1)
	{
		$('#output-colour-section').fadeIn();
		$('#error').slideUp(300);
	}
	else
	{
		$('#output-colour-section').hide();
	}

	$('.output-name').html(animationName);
	$('.output-speed').html(currentSpeed+'s');
  	$('.output-gradient-angle').html(gradientAngle+'deg');
	$('.output-bg-size').html(backgroundSize);
    $('.output-bg-start').html(startX + '% ' + startY + '%');
    $('.output-bg-end').html(endX + '% ' + endY + '%');
	$('.output-colours').html(colourString);
}


/* 
 * Listeners for user input
 */

$('#preview').click(function(e) {
	e.preventDefault();

	$('#error').slideUp(300);
	applyCSS();

	// TODO: fix
	// Gross hack because IE only works if you click 'Preview' > 1 times
	applyCSS();
});


$('#reset').click(function(e) {
	e.preventDefault();
	$('#error').slideUp(300);
	resetCSS();
	
	$('html').css('height', $('#container').css('height') - 50);
});

$('#name').change(function(e) {
	var value = escapeHtml($('#name').val());
	animationName = value.replace(/ /g,'');
	updateOutputCSS();
});

$('#name').keyup(function(e) {
	var value = escapeHtml($('#name').val());
	animationName = value.replace(/ /g,'');
	updateOutputCSS();
});

$('#toggleWebKit').change(function(e) {
	$('.output-webkit-section').toggle();
});

$('#toggleGecko').change(function(e) {
	$('.output-gecko-section').toggle();
});

$('#toggleOpera').change(function(e) {
	$('.output-opera-section').toggle();
});

$('#newColour').click(function(e) {
	e.preventDefault();

	numColoursDisplayed = 0;
	coloursIDs.forEach(function(elementID) {
		if (elementID !== null) 
		{
			lastColour = $(elementID).spectrum("get").toHexString();
			numColoursDisplayed ++;
	    }
	});

	var colorBox = '<input type="text" name="colours[]" id="colours__'+numColoursCreated+'" />';
	$("#colours").append(colorBox);

	$("#colours__"+numColoursCreated).spectrum({
    	showInput: true,
  		preferredFormat: "hex",
	    color: lastColour,
	    cancelText: 'Remove',
	    chooseText: 'Select',
	    clickoutFiresChange: true,
	    containerClassName: 'numColoursCreated__'+numColoursCreated,
	    change: function(color) {
		    updateOutputCSS(); 
		}
	});


	$('.numColoursCreated__'+numColoursCreated + ' .sp-cancel').click(function(e) {
		var temp = e.target.parentNode.parentNode.parentNode.className; // ugh
		temp = temp.substring(temp.indexOf('numColoursCreated__'));
		temp = temp.substring(0, temp.indexOf(' '));
		var colourIndex = temp.substring (temp.indexOf('__')+2);

		coloursIDs[colourIndex] = null;

		$('#colours__'+colourIndex).spectrum("destroy");
		$('#colours__'+colourIndex).remove();

		numColoursDisplayed --;

		updateOutputCSS();
	});

	coloursIDs[numColoursCreated] = "#colours__"+numColoursCreated;

	$("#colours__"+numColoursCreated).spectrum('show');

	numColoursCreated ++;
	numColoursDisplayed ++;

	updateOutputCSS();

	return false;
});

$('#gist-save').click(function(e) {
	e.preventDefault();

	if (numColoursDisplayed < 2)
	{		
		$('#error').slideDown(300);
		return;
	}

	var domElement = $('#output').get(0);
	var text = domElement.textContent || domElement.innerText || "";
	text = text.replace(/\s\s*$/gm, "");
	text = text.toString().replace(/\t/g, '').replace('\n', '');

   	var newtab = window.open( '', '_blank' );

	var data = {
	    "description": "CSS Gradient Animation",
	    "public": true,
	    "files": {
	      "my.css": {
	        "content": text
	      }
	    }
	  }
	$.ajax({
		url: 'https://api.github.com/gists',
		type: 'POST',
		dataType: 'json',
		async: false,
		data: JSON.stringify(data)
	})
	.success( function(e) {
		newtab.location = e.html_url;
		newtab.focus();
	})
	.error( function(e) {
		console.log("Gist save error", e);
	});

  return false;
});


/* 
 * Create angle pickers and sliders 
 */

$("#scrollAngle").anglepicker({
    start: function(e, ui) {
    },
    change: function(e, ui) {
        handleScrollAngleChange(ui.value);
		updateOutputCSS();
    },
    stop: function(e, ui) {
    },
    value: 0
});


$("#gradientAngle").anglepicker({
    start: function(e, ui) {
    },
    change: function(e, ui) {
		gradientAngle = mod(360, (-1 * (ui.value + degOffset))); // for css animation
		updateOutputCSS();
    },
    stop: function(e, ui) {
    },
    value: 0
});


$("#speed").slider({
	animate: 'fast',
	min: minSpeed,
	max: maxSpeed,
	value: currentSpeed,
	slide: function( event, ui ) {
		currentSpeed = Math.max((maxSpeed - ($("#speed").slider("value") + 1)), minSpeed);
		updateOutputCSS();
	},
	change: function( event, ui ) {
		currentSpeed = Math.max((maxSpeed - ($("#speed").slider("value") + 1)), minSpeed);
		updateOutputCSS();
	}
});

/* Mobile (iOS) is taking on extra whitespace to the bottom */
$( window ).resize(function() {
	setContainerHeight();
});

setContainerHeight();