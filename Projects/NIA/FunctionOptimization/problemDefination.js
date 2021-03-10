

function squaredFunction (position){
    let score = 0;//Math.exp(-20);
    	for(let j = 0; j < dims; j++) {
      score=score+Math.pow(position[j],2);
    }

    return score;
  }