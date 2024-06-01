//your JS code here. If required.
function Startgame() {
	 var inputDiv = document.getElementById("inputdiv");
    if (inputDiv) {
        inputDiv.remove();
		
    }
	var gamePage = document.createElement("div");
    gamePage.className = "gamepage";
    document.body.appendChild(gamePage);
}