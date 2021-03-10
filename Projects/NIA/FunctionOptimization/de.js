

function callDE(){

var bestFitnessGraph=[];
var avgFitnessGraph=[];
var xlabels=[0];

// var  inertiaWeight=0.05;
// var  c1=1.5;
// var  c2=1.5;

var beta_min=0.2;   // Lower Bound of Scaling Factor
var beta_max=0.8;   // Upper Bound of Scaling Factor
var pCR=0.2;        // Crossover Probability


// var pBestPos =new Array(popSize).fill(0).map(() => new Array(dims).fill(0));
// var pBestVal =new Array(popSize).fill(Infinity);
var gBestPos =new Array(dims).fill(0);
var gBestVal=Infinity;
var bestFitness = new Array(maxItr);

var population=new Array(popSize);

for (let i = 0; i < popSize; i++) {
	let individual=[];
	for (let j=0; j< dims; j++) {
	individual[j]=lb+Math.random()*(ub-lb);
	}
	population[i]=individual;

}

// var velocity=new Array(popSize).fill(0).map(() => new Array(dims).fill(0));;

var fitness =new Array(popSize);
for (let i = 0; i < popSize; i++) {
	fitness[i]=calcFitness(population[i],1);
	// pBestVal[i]=fitness[i];
	// pBestPos[i]=population[i];

	if (fitness[i]<gBestVal) {
		gBestVal=fitness[i];
		gBestPos=population[i];
	}

}

    var avgFitness = 0;
    for (let i = 0; i < popSize; i++) {
      avgFitness += fitness[i];
    }
    avgFitness /= popSize;


bestFitness[0]=gBestVal;
console.log(bestFitness[0].toString());

bestFitnessGraph.push(gBestVal);
avgFitnessGraph.push(avgFitness);




for (let itr= 1; itr < maxItr; itr++) {
	for (let i = 0; i < popSize; i++) {

		temp = population[i];

		let a=0;

		while(1){
			a=Math.floor(Math.random()*(popSize));
			if (a==i){
			}
			else{
				break;
			}
		}

		let b=0;

		while(1){
			b=Math.floor(Math.random()*(popSize));
			if (b==i || b==a){
			}
			else{
				break;
			}
		}

		let c=0;

		while(1){
			c=Math.floor(Math.random()*(popSize));
			if (c==i || c==a || c==b){
			}
			else{
				break;
			}
		}

        let difVar =new Array(dims).fill(0);
        let z =new Array(dims).fill(0);
		
		for (let j=0; j< dims; j++) {

			// Mutation
			let beta=0;
			beta = Math.random() * (beta_max - beta_min) + beta_min;
			difVar[j]=population[a][j]+beta*(population[b][j]-population[c][j]);
			difVar[j]=Math.max(difVar[j],lb);
			difVar[j]=Math.min(difVar[j],ub);

			// Crossover
			if(Math.random() <= pCR){
				z[j]=difVar[j];
			}
			else{
				z[j]=population[i][j];	
			}

		}

		let tempfit=Infinity;


		tempfit=calcFitness(z,1);
		if (tempfit < fitness[i]){
			population[i]=z;
			fitness[i]=tempfit;
			if (fitness[i]<gBestVal) {
				gBestVal=fitness[i];
				gBestPos=population[i];
			}

		}

	}

	bestFitness[itr]=gBestVal;


    avgFitness = 0;
    for (let i = 0; i < popSize; i++) {
      avgFitness += fitness[i];
    }
    avgFitness /= popSize;

   

	displayInfo(population, gBestPos, bestFitness[itr], avgFitness, itr);

 xlabels.push(itr);
 bestFitnessGraph.push(gBestVal);
avgFitnessGraph.push(avgFitness);

	}

	displayGraph(xlabels, bestFitnessGraph, avgFitnessGraph);

	finalResultDiv.innerHTML = "<hr><br><b>Best Individual:</b>&nbsp" + gBestPos.toString() + " &nbsp <b>with Fitness Value:</b>&nbsp" + gBestVal.toString();

}

function displayInfo(population, gBestPos, bestCost, avgFitness, itr) {
	console.log(bestCost.toString());
var everything="";

 for (let i = 0; i < popSize; i++) {
      everything += population[i].toString() + "<br>";
    }
	resultDiv.innerHTML = "<b>All individuals:</b><br>" + everything;	

	let statstext = "<br> <b>Total generations:</b>&nbsp     " + (itr+1).toString() + "<br>";
  statstext += "<b>Average fitness:</b>       " + avgFitness.toString();
avgFitDiv.innerHTML=statstext;

}


function displayGraph(xlabels, bestFitnessGraph, avgFitnessGraph) {

	var trace1 = {
x: xlabels,
  y: bestFitnessGraph,
  name: 'Best Fitness',
  type: 'scatter',
};

var trace2 = {
  x: xlabels,
  y: avgFitnessGraph,
  name: 'Average Fitness',
  type: 'scatter'
};

var data = [trace1, trace2];

var layout = {

  yaxis: {
    type: 'log',
    autorange: true
  }
};

Plotly.newPlot('displayGraphDiv', data, layout);

}
