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

//initializing
var lvl = [];
lvl[0] = '0100000100011100010000000';

var l = []
for(x=0;x<5;x++) {
	l[x] = [];
	for(y=0;y<5;y++) {
		l[x][y] = 0;
	}
}

function load(k) {
	newlevel = lvl[k];

	for(y=0;y<5;y++) for(x=0;x<5;x++) {
		if(l[x][y] != newlevel.charAt(0)) {
			document.getElementById('c' + x + '' + y).style.webkitTransform  += 'rotateY(180deg) ';
		}

		l[x][y] = parseInt(newlevel.charAt(0));
		newlevel = newlevel.substring(1);
	}
}

function go(i,j) {
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
}

load(0);