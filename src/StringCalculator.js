var stringCalculator = function () {
    var delimiters = [',', '\n'];
    return {
        add: function (stringToAdd) {
            if(stringToAdd === '')
                return 0;
            if(isNumeric(stringToAdd))
                return parseInt(stringToAdd, 10);

            stringToAdd = handleDelimiters(stringToAdd);

            return AddNumbersTogether(stringToAdd);
        }
    };

    function handleDelimiters (stringToAdd) {
        if(hasCustomDelimiters(stringToAdd))
            stringToAdd = getAndStripDelimiters(stringToAdd);

        return replaceNonCommaDelimitersWithComma(stringToAdd);
    }

    /**
     * @return {number}
     */
    function AddNumbersTogether (stringToAdd) {
        var numbersToAdd = stringToAdd.split(',');
        var i, sum = 0, negatives = [];

        for(i = 0; i < numbersToAdd.length; i +=1) {
            if(isAddable(numbersToAdd[i]))
                sum = addToSum(numbersToAdd[i]);
            else if(isNegative(numbersToAdd[i]))
                negatives.push(numbersToAdd[i]);
        }
        handleNegatives();

        return sum;

        function handleNegatives () {
            if(negatives.length > 0)
                throw 'negatives not allowed [' + negatives.join(',') + ']';
        }

        function isAddable (number) {
            return isNumeric(number) && isPositive(number) && isUnder1000(number);
        }

        function addToSum (number) {
            return sum += parseInt(number, 10);
        }

        function isPositive (numberToAdd) {
            return(numberToAdd > 0);
        }

        function isNegative (numberToAdd) {
            return numberToAdd < 0;
        }

        function isUnder1000 (numberToAdd) {
            return (numberToAdd < 1000);
        }
    }

    function getAndStripDelimiters (stringToAdd) {
        addCustomDelimiters(stringToAdd);
        return stripFirstLine(stringToAdd);
    }

    function isNumeric (num) {
        return !isNaN(num);
    }

    function hasCustomDelimiters (stringToAdd) {
        return /^\/\//.test(stringToAdd);
    }

    function addCustomDelimiters (stringToAdd) {
        if(hasMultiCharDelimiter(stringToAdd)){
            var re = /\[[^\[\]]+\]/g;
            var match;
            while(match = re.exec(stringToAdd))
                delimiters.push(match[0].substr(1, match[0].indexOf(']') - 1));
        }
        else
            delimiters.push(stringToAdd.charAt(2));
    }

    function hasMultiCharDelimiter (stringToAdd) {
        return stringToAdd.charAt(2) == '[';

    }

    function stripFirstLine (stringToAdd) {
        return stringToAdd.slice(stringToAdd.indexOf('\n') +1);
    }

    function replaceNonCommaDelimitersWithComma (stringToAdd) {
        for(var i = 0; i < delimiters.length; i +=1) {
            stringToAdd = stringToAdd.replaceAll(delimiters[i], ',');
        }
        return stringToAdd;
    }
};

String.prototype.replaceAll = function (findWith, replaceWith) {
    var c = this;
    return c.split(findWith).join(replaceWith);
};





