describe('A string calculator, when add is called, ', function() {
    var calculator;

    beforeEach(function() {
        calculator = stringCalculator();
    });

    it('returns 0 if empty string is passed', function() {
        expect(calculator.add('')).toEqual(0);
    });

    it('returns the same integer if just one integer is passed in', function() {
        expect(calculator.add('1')).toEqual(1);
        expect(calculator.add('123')).toEqual(123);
    });

    it('adds two numbers together when separated with a comma', function() {
        expect(calculator.add('1,2')).toEqual(3);
        expect(calculator.add('10,23')).toEqual(33);
    });

    it('adds any number of numbers together when separated with commas', function() {
        expect(calculator.add('1,2,3')).toEqual(6);
        expect(calculator.add('1,2,3,6,8,22')).toEqual(42);
    });

    it('treats any new line characters as another delimiter', function() {
       expect(calculator.add('1\n2,3')).toEqual(6);
    });

    it('allows defining other delimiters', function(){
       expect(calculator.add('//;\n1;2;3')).toEqual(6);
    });

    it('throws an exception if any numbers are negatives', function() {
        expect(function() {calculator.add('1,2,-3')}).toThrow('negatives not allowed [-3]');
        expect(function() {calculator.add('1,-2,-3')}).toThrow('negatives not allowed [-2,-3]');
    });

    it('ignores numbers over 999', function() {
        expect(calculator.add('1,2,1001')).toEqual(3);
    });

    it('can handle delimiters with more than one character', function() {
        expect(calculator.add('//[***]\n1***2***3')).toEqual(6);
    });

    it('can handle multiple delimiters', function () {
        expect(calculator.add('//[*][%]\n1*2%3')).toEqual(6);
    });

    it('can handle multiple delimiters of more than one character', function() {
        expect(calculator.add('//[**][%]\n1**2%3')).toEqual(6);
    });
});