function resizeImage()
{
	var ecompass_size = Math.min(screen.width, screen.height) * 0.75;
	var ecompass_bg_size = Math.min(screen.width, screen.height) * 0.75;
	document.getElementById("ecompass").style.width = ecompass_size + "px";
	document.getElementById("ecompass").style.height = ecompass_size + "px";
	document.getElementById("ecompass").style.backgroundSize = ecompass_bg_size + "px " +  ecompass_bg_size + "px";
}

window.setTimeout(function () {
	var direction_integer = 0;
	
	if (window.DeviceOrientationEvent) {
		window.addEventListener("deviceorientation", function(e) {
			var direction, compass_heading;
			var compass_direction = "";

			/* http://dev.w3.org/geo/api/spec-source-orientation.html#deviceorientation */
			direction = 360 - e.alpha;

			/* if window.orientation is not undefine, set as offset */
			if ( window.orientation != undefined ) {
				direction += window.orientation;
			}
			
			direction_integer = Math.round(direction);

			compass_heading = direction;
			while (compass_heading >= 360) {
				compass_heading -= 360;
			}
			while (compass_heading < 0) {
				compass_heading += 360;
			}
			compass_heading = Math.round(compass_heading);
			
			if (compass_heading >= 338 || compass_heading <= 22) // 0 +- 22
				compass_direction = "N"
			else if (compass_heading >= 23 && compass_heading <= 67)
				compass_direction = "NE"
			else if (compass_heading >= 68 && compass_heading <= 112) // 90 +- 22
				compass_direction = "E"
			else if (compass_heading >= 113 && compass_heading <= 157)
				compass_direction = "SE"
			else if (compass_heading >= 158 && compass_heading <= 202) // 180 +- 22
				compass_direction = "S"
			else if (compass_heading >= 203 && compass_heading <= 247)
				compass_direction = "SW"
			else if (compass_heading >= 248 && compass_heading <= 292) // 270 +- 22
				compass_direction = "W"
			else if (compass_heading >= 293 && compass_heading <= 337) // 270 +- 22
				compass_direction = "NW"

			document.getElementById("ecompass_info").textContent = compass_direction + " " + compass_heading + "\u00b0";
			document.getElementById("debug").textContent = "alpha: " + Math.round(e.alpha) + " beta: " + Math.round(e.beta) + " gamma : " + Math.round(e.gamma) + ", orientation: " + window.orientation;
			
			var rotate = -direction_integer;
			document.getElementById("ecompass").style.transform = "rotate(" + rotate + "deg)";
			document.getElementById("ecompass").style.MozTransform = "rotate(" + rotate + "deg)";
			document.getElementById("ecompass").style.webkitTransform = "rotate(" + rotate + "deg)";
		});
	} else {
		document.getElementById("ecompass_info").textContent = "Device orientation not supported.";
		document.getElementById("ecompass_info").style.color = "red";
	}
}, 200);