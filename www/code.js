//resizing
var wW = window.innerWidth;
var wH = window.innerHeight;
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

// UI functions

function msjhide() {
	document.getElementById('msj').className = "hide";
	load(currentlevel-1);
}

//initializing
var currentlevel = 1;
var clicks = 0;

var lvl = [];
lvl[0] = '0000000100011100010000000';
lvl[1] = '0001100001010001110001000';
lvl[2] = '0100011100010100011100010';
lvl[3] = '1110001010001111001011000';
lvl[4] = '0000000000001001111111111';
lvl[5] = '0000001110101010111000000';
lvl[6] = '0010000100111110101000000';
lvl[7] = '1101110101011101010011000';
lvl[8] = '0100011100010101011111010';
lvl[9] = '0101011011000001101101010';
lvl[10] = '1101101010000000101011011';
lvl[11] = '0110010010010100100100110';
lvl[12] = '0000100010001000100010000';
lvl[13] = '0010000100110110010000100';
lvl[14] = '0101001010000000101001010';
lvl[15] = '0111011111110111111101110';
lvl[16] = '0101010001000001000101010';
lvl[17] = '0111011011101011101101110';
lvl[18] = '0101001110111111010100000';
lvl[19] = '1000101110001000000001110';
lvl[20] = '0111011011111110000011111';

var l = []
for(x=0;x<5;x++) {
	l[x] = [];
	for(y=0;y<5;y++) {
		l[x][y] = 0;
	}
}

function load(k) {

	if(k<3) {
		newlevel = lvl[k];
	
		for(y=0;y<5;y++) for(x=0;x<5;x++) {
			if(l[x][y] != newlevel.charAt(0)) {
				document.getElementById('c' + x + '' + y).style.webkitTransform  += 'rotateY(180deg) ';
			}
	
			l[x][y] = parseInt(newlevel.charAt(0));
			newlevel = newlevel.substring(1);
		}
	} else {
		main.className = "max";
		for(x=0;x<5;x++) for(y=0;y<5;y++) l[x][y] = 0;

		for(x=0;x<(1+Math.sqrt(Math.sqrt(k)))|0;x++) {
			i = ( Math.random()*5 ) | 0;
			j = ( Math.random()*5 ) | 0;
			if(l[i][j]!=1) go(i,j);
		}
	}
}

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

	if( check() ) next();
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

function next() {
	document.getElementById('msj-title').innerHTML = "Felicidades, pasaste al nivel " + (currentlevel+1);
	document.getElementById('msj-txt').innerHTML = "Solo te tomó " + clicks + " click";
	if(clicks>1) document.getElementById('msj-txt').innerHTML += "s";
	document.getElementById('msj').className = "";
	currentlevel++;
	clicks = 0;
}

load(0);