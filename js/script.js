'use strict';

function reverse(number) {
    const strNumber = String(number);
    let reverseNumber = '';
    const end = strNumber.charAt(0) === '-' ? 1 : 0;
    for (let i = strNumber.length - 1; i >= end; i--) {
        reverseNumber += strNumber[i];
    }
    return end === 1 ? +reverseNumber * -1 : +reverseNumber;
}


function walk(array) {
    if (array.length !== 10) {
        return false;
    }

    const direction = {
        'n': 's',
        's': 'n',
        'w': 'e',
        'e': 'w'
    };

    const trip = Array.prototype.splice.call([].concat(array), 0, 5);

    const returnTrip = Array.prototype.splice.call([].concat(array), 5);

    for (let i = 0; i < trip.length; i++) {
        if (direction[trip[i]] !== returnTrip[i]) {
            return false;
        }
    }
    return true;
}


let maxProfit = function (prices) {
    let max = 0;
    for (let i = 0; i < prices.length - 1; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            if (prices[j] - prices[i] > max) {
                max = prices[j] - prices[i];
            }
        }
    }
    return max;
};


