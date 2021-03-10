

function callPSO(){

var bestFitnessGraph=[];
var avgFitnessGraph=[];
var xlabels=[0];

var  inertiaWeight=0.05;
var  c1=1.5;
var  c2=1.5;

var pBestPos =new Array(popSize).fill(0).map(() => new Array(dims).fill(0));
var pBestVal =new Array(popSize).fill(Infinity);
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

var velocity=new Array(popSize).fill(0).map(() => new Array(dims).fill(0));;


var fitness =new Array(popSize);
for (let i = 0; i < popSize; i++) {
	fitness[i]=calcFitness(population[i],1);
	pBestVal[i]=fitness[i];
	pBestPos[i]=population[i];

	if (pBestVal[i]<gBestVal) {
		gBestVal=pBestVal[i];
		gBestPos=pBestPos[i];
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
		for (let j=0; j< dims; j++) {

		velocity[i][j]=inertiaWeight*velocity[i][j] + c1*Math.random()*(pBestPos[i][j]-population[i][j]) + c2*Math.random()*(gBestPos[j]-population[i][j]);
		population[i][j]=population[i][j] + velocity[i][j];

		population[i][j]=Math.max(population[i][j],lb);
		population[i][j]=Math.min(population[i][j],ub);		

		}

		fitness[i]=calcFitness(population[i],1);
		if (fitness[i] < pBestVal[i]){
			pBestPos[i] = population[i];
			pBestVal[i] = fitness[i];
			if (pBestVal[i]<gBestVal) {
				gBestVal=pBestVal[i];
				gBestPos=pBestPos[i];
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

	let statstext = "<br> <b>Total iterations:</b>&nbsp     " + (itr+1).toString() + "<br>";
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
