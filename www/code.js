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

//initializing
var l = []

for(x=0;x<5;x++) {
	l[x] = [];
	for(y=0;y<5;y++) l[x][y] = 0;
}

function go(i,j) {
	l[i][j] = !l[i][j];
	document.getElementById('c' + i + '' + j).style.webkitTransform  += 'rotate3d(0,1,0,-180deg)';
	for(x=-1;x<2;x+=2) {
		if(0<=i+x && i+x<=4) {
			l[i+x][j] = !l[i+x][j];
			document.getElementById('c' + (i+x) + '' + j).style.webkitTransform  += 'rotate3d(0,1,0,-180deg)';
		}
		if(0<=j+x && j+x<=4) {
			document.getElementById('c' + i + '' + (j+x)).style.webkitTransform  += 'rotate3d(0,1,0,-180deg)';
		}
	}
}