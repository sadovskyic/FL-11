let minNumber = 0,
    initialMaxNumber = 8,
    maxNumber,
    rangeIncreasing = 4,
    attempts = 3,
    reductionPrizeCoefficient = 2,
    increasePriseCoefficient = 2,
    totalPrize,
    initialMaxAttemptPrize = 100,
    maxAttemptPrize,
    currentPrize,
    wantPlay = true,
    wantContinue = true,
    pocketNumber,
    selectedNumber;
while(wantPlay) {
    wantPlay = confirm('Do you want to play a game?');
    if (!wantPlay) {
        alert('You did not become a billionaire, but can.');
    } else {
        totalPrize = 0;
        maxAttemptPrize = initialMaxAttemptPrize;
        currentPrize = maxAttemptPrize;
        maxNumber = initialMaxNumber;
        for (let i = attempts; i > 0; i--) {  
            selectedNumber = prompt(
`Choose a roulette pocket number from ${minNumber} to ${maxNumber}
Attempts left: ${i}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${currentPrize}$`, `0`
            );
            if (selectedNumber === null || selectedNumber.match(/\D/)) {
                alert(`Enter an integer in the range ${minNumber} - ${maxNumber}`)
                ++i;
            } else {
                selectedNumber = Number(selectedNumber);
                if (selectedNumber > maxNumber) {
                    alert(`Enter an integer in the range ${minNumber} - ${maxNumber}`)
                    ++i;
                    continue;
                }
                pocketNumber = Math.floor(Math.random() * (maxNumber + 1));
                if (selectedNumber !== pocketNumber) {
                    currentPrize /= reductionPrizeCoefficient;
                    if (i === 1) {
                        totalPrize = 0;
                        alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
                    }
                } else {
                    totalPrize += currentPrize;
                    wantContinue = confirm(
`Congratulation, you won!
Your prize is ${currentPrize}$.
Do you want to continue?`
                    );
                    if(!wantContinue) {
                        alert(`Thank you for your participation. Your prize is: ${totalPrize} $`);
                        break;
                    } else {
                        maxNumber += rangeIncreasing;
                        maxAttemptPrize *= increasePriseCoefficient;
                        currentPrize = maxAttemptPrize;
                        i = attempts + 1;
                    }
                }
            } 
        }
    }
}
