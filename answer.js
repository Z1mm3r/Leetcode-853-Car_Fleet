var carFleet = function(target, position, speed) {

    //Sort Helper
    let sortValues = (positionArr, speedArr) => {
        //Keep track of location : startingIndex
        let temp = [];
        let outputPositionArr = [];
        let outputSpeedArr = [];
        for(let i = 0; i < positionArr.length; i++){
            temp.push([positionArr[i],i]);
        }

        //Sort based on location, then update arrays.
        temp.sort((a,b) => {
            if(a[0] < b[0]){
                return 1;
            }
            if(a[0] > b[0]){
                return -1;
            }

            if(a[0] == b[0]){
                return 0;
            }
        })

        for(let i = 0; i < temp.length; i++){
            outputPositionArr.push(temp[i][0]);
            outputSpeedArr.push(speedArr[temp[i][1]])
        }
        return [outputPositionArr,outputSpeedArr];
    }

    let tick = (position, speed) => {
        //Update all positions
        for(let i = 0; i < position.length; i++){
            position[i] += speed[i];
        }

        //Check for merges
        for(let i = 0; i < position.length; i++){
            position[i] += speed[i];
            if(i > 0){
                //Did this catch up to car fleet in front?
                if(position[i] >= position[i - 1]){

                    //have both cars reached target, if so see if[i-1] got there first,
                    //if it did, dont merge.
                    if(position[i-1] >= target){
                        let val1 = (target - position[i-1]) / speed[i-1];
                        let val2 = (target - position[i]) / speed[i];
                        if(val1 < val2){
                            continue;
                        }
                    }

                    //'merge' car fleet.
                    //Remove the car that has caught up, we use the speed from the slower fleet.
                    //console.log("merge",position)
                    position.splice(i,1);
                    speed.splice(i,1);
                    //console.log("after",position)
                    i--;
                }
            }
        }
    }

    let removeFinishedFleets = (position, speed) => {
        let output = 0;
        for(let i = 0; i < position.length; i++){
            if(position[i] >= target){
                position.splice(i,1);
                speed.splice(i,1);
                output++;
                i--;
            }
            else{
                break;
            }
        }
        return output;
    }

    let output = 0;
    [position,speed] = sortValues(position,speed);
    while(position.length > 0){
        tick(position,speed);
        output += removeFinishedFleets(position,speed);
    }

    return output;
    //Organize our target / position array once.

};
