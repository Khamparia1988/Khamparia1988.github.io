var algo;
var popSize;
var maxItr;
var dims;
var ub;
var lb;
var resultDiv = document.getElementById('resultDiv');
var finalResultDiv = document.getElementById('finalResultDiv');
var avgFitDiv = document.getElementById('avgFitDiv');
// var displayGraphDiv1 = document.getElementById('displayGraphDiv');



var xlabels = [];


function mainInit() {
if (document.getElementById('pso').checked){
algo = 'pso';
}else if (document.getElementById('de').checked){
algo = 'de';
}

 popSize=parseInt(document.getElementById('popSize').value);

//  var query=document.getElementById('popSize').value;
//  var isNumeric=query.match(/^\d+$/);
//  if(isNumeric){
//  popSize = parseInt(document.getElementById('popSize').value);
// }else{
// alert('Enter a number');
// window.location.reload(true);
// }


maxItr = parseInt(document.getElementById('maxItr').value);
dims = parseInt(document.getElementById('dims').value);
ub = parseFloat(document.getElementById('ub').value);
lb = parseFloat(document.getElementById('lb').value);

	// console.log(algo);
	// console.log(popSize);
	// console.log(maxItr);
	// console.log(dims);
	// console.log(ub);
	// console.log(lb);


if (algo == 'pso') {
	callPSO();
}else if (algo == 'de') {
	callDE();
}




}

