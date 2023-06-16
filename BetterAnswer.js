var carFleet = function(target, position, speed) {

    //Sort helper
    let sortValues = (positionArr, timeToGoalArr) => {
        //Keep track of location : startingIndex
        let temp = [];
        let outputPositionArr = [];
        let outputTimeToGoalArr = [];
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
            outputTimeToGoalArr.push(timeToGoalArr[temp[i][1]])
        }
        return [outputPositionArr,outputTimeToGoalArr];
    }

    //All we care about is if a car can possibly beat others to the goal.
    let timeToGoal = [];

    //Fill up time to goal
    for(let i = 0; i < position.length; i++){
        timeToGoal.push((target - position[i]) / speed[i]);
    }


    //sort time to goal by position
    [position,timeToGoal] = sortValues(position,timeToGoal);
    for(let i = timeToGoal.length; i > 0; i--){
        //Catches up? merge.
        if(timeToGoal[i] <= timeToGoal[i - 1]){
            timeToGoal.splice(i,1);
            i++;
        }

    }
    //Any unmerged values are different car fleets
    return timeToGoal.length;
};
