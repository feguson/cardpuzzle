window.addEventListener('load', function() {FastClick.attach(document.body);}, false);
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
//resizing
var wW = $(window).width();
var wH = $(window).height();
var size = 0;

if(wW > wH) {
	size = wH;
} else {
	size = wW;
}

main = document.getElementById('main');
main.style.width = size + 'px';
main.style.height = size + 'px';
main.style.marginLeft = (wW - size)/2 + 'px';
main.style.marginTop = (wH - size)/2 + 'px';
main.style.webkitPerspective = size + 'px';

//initializing
var currentlevel = 1;
var record = 1;
var clicks = 0;

var lvl = [];
lvl[1] = '0000000100011100010000000';
lvl[2] = '0001100001010001110001000';
lvl[3] = '0100011100010100011100010';
lvl[4] = '1110001010001111001011000';
lvl[5] = '0000000000001001111111111';
lvl[6] = '0000001110101010111000000';
lvl[7] = '0010000100111110101000000';
lvl[8] = '1101110101011101010011000';
lvl[9] = '0100011100010101011111010';
lvl[10] = '0101011011000001101101010';
lvl[11] = '1101101010000000101011011';
lvl[12] = '0110010010010100100100110';
lvl[13] = '0000100010001000100010000';
lvl[14] = '0010000100110110010000100';
lvl[15] = '0101001010000000101001010';
lvl[16] = '0111011111110111111101110';
lvl[17] = '0101010001000001000101010';
lvl[18] = '0111011011101011101101110';
lvl[19] = '0101001110111111010100000';
lvl[20] = '1000101110001000000001110';
lvl[21] = '0111011011111110000011111';
lvl[22] = '0101111110010011011101111';
lvl[23] = '0001101110001100010000110';
lvl[24] = '0100111001110001110101101';
lvl[25] = '1000101101111000111101010';
lvl[26] = '0000101111101101111000110';
lvl[27] = '1011100100110100101010001';
lvl[28] = '1100001101100010000111011';
lvl[29] = '1011110010001011001001110';
lvl[30] = '1100110110111100101100011';
var originallevels = lvl.length;

//is this a new record?
if(localStorage["maxrecord"] > 0) {
	record = parseInt(localStorage["maxrecord"],10);
	currentlevel = record;

	document.getElementById("msj-title").innerHTML = "Bienvenido de nuevo";
	document.getElementById("msj-txt").innerHTML = "Continua en el nivel " + record + ".";

	for(x=originallevels;x<=record;x++) lvl[x] = localStorage["lvl"+x];
} else {
	localStorage["maxrecord"] = 0;
}

var l = []
for(x=0;x<5;x++) {
	l[x] = [];
	for(y=0;y<5;y++) {
		l[x][y] = 0;
	}
}

function load(k) {
	if(k > record) {
		record = k;
		localStorage["maxrecord"] = parseInt(record,10);
	}
	buttons(k);

	clicks = 0;
	last = Date.now();

	document.getElementById("level").innerHTML = (k);

	if(k<lvl.length) {

		if(k>20) main.className = "max";
		else main.className = "normal";

		newlevel = lvl[k];

		for(y=0;y<5;y++) for(x=0;x<5;x++) {
			if(l[x][y] != newlevel.charAt(0)) {
				document.getElementById('c' + x + '' + y).style.webkitTransform  += 'rotateY(180deg) ';
			}

			l[x][y] = parseInt(newlevel.charAt(0));
			newlevel = newlevel.substring(1);

			currentlevel = k + 1;
			last = Date.now();
		}
	} else {
		lastlevel = lvl.length;
		lvl[lastlevel] = "";
		for(x=0;x<25;x++) lvl[lastlevel] += (Math.random()+.5)|0;
		localStorage["lvl"+lastlevel] = lvl[lastlevel];
		load(lastlevel);
	}
}

//ui constrols
function msjhide() {
	document.getElementById('msj').className = "hide";
	load(currentlevel);
}

function back() {
	if(currentlevel>2) load(currentlevel-2);
}

function restart() {
	load(currentlevel-1);
}

function next() {
	if(currentlevel<=record) load(currentlevel);
}

function buttons(k) {
	if(k<=1) document.getElementById("icon-back").style.opacity = "0";
	else document.getElementById("icon-back").style.opacity = "1";

	if(k>record-1) document.getElementById("icon-next").style.opacity = "0";
	else document.getElementById("icon-next").style.opacity = "1";
}

//manage click
function go(i,j) {
	clicks++;
	l[i][j] = !l[i][j];
	document.getElementById('c' + i + '' + j).style.webkitTransform  += 'rotateY(180deg) ';

	for(x=-1;x<2;x+=2) {
		if(0<=i+x && i+x<=4) {
			l[i+x][j] = !l[i+x][j];
			document.getElementById('c' + (i+x) + '' + j).style.webkitTransform  += 'rotateY(' + (180*x) + 'deg) ';
		}
		if(0<=j+x && j+x<=4) {
			l[i][j+x] = !l[i][j+x];
			document.getElementById('c' + i + '' + (j+x)).style.webkitTransform  += 'rotateX(' + (-180*x) + 'deg) ';
		}
	}

	if( check() ) nextlevel();
}

function check() {
	for(x=0;x<5;x++) for(y=0;y<5;y++) {
		if(l[x][y]==1) return 0;
	}
	return 1;
}

function generate() {
	var cache = "";

	for(y=0;y<5;y++) {
		for(x=0;x<5;x++) {
			if(l[x][y]) cache+='1';
			else cache+='0';
		}
	}

	console.log(cache);
}

function nextlevel() {
	now = Date.now();
	passed = (((now-last)/100)|0)/10;
	document.getElementById('msj-title').innerHTML = "Felicidades, pasaste al nivel " + (currentlevel);
	document.getElementById('msj-txt').innerHTML = "Solo te tomó " + clicks + " click";
	if(clicks>1) document.getElementById('msj-txt').innerHTML += "s";
	document.getElementById('msj-txt').innerHTML += " y " + passed + " segundos.<br/><br/><a href='https://www.facebook.com/sharer/sharer.php?u=http://javierbyte.com/card-puzzle/' class='facebook'><span class='fontawesome'></span> compartir</a><a href='https://twitter.com/home?status=Card%20Puzzle%20on%20Google%20Play%20https://www.facebook.com/sharer/sharer.php?u=http://javierbyte.com/card-puzzle/' class='twitter'><span class='fontawesome'></span> twittear</a>";
	document.getElementById('msj').className = "";
}

} //onDeviceReady