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
lvl[0] = '0000000100011100010000000';

var l = []
for(x=0;x<5;x++) {
	l[x] = [];
	for(y=0;y<5;y++) {
		l[x][y] = 0;
	}
}

function load(k) {
	for(x=0;x<5;x++) for(y=0;y<5;y++) {
		if(l[x][y] != lvl[k].charAt(0)) {
			console.log(x + ' ' + y);
			document.getElementById('c' + x + '' + y).style.webkitTransform  += 'rotateY(180deg) ';
		}

		l[x][y] = lvl[k].charAt(0);
		lvl[k] = lvl[k].substring(1);
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
			document.getElementById('c' + i + '' + (j+x)).style.webkitTransform  += 'rotateX(' + (-180*x) + 'deg) ';
		}
	}
}

load(0);