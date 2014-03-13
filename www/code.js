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

function render() {

}