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
	for(y=0;y<5;y++) l[x][y] = 1;
}

function render() {
	for(x=0;x<5;x++) {
		for(y=0;y<5;y++) {
			if(l[x][y]==1) {

				document.getElementById('c' + x + '' + y).className  = 'c changed';
			}
		}
	}
}