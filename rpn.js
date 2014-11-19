/**
 * Author : Sampath
 * Created by Sampath on 11/16/14.
 * Purpose : Testing
 * Description : Check the RPN functionality
 */

exports.version = "0.5.0";

exports.compute = function (parts) {
    var stack = [];
    for (var i = 0; i < parts.length; i++) {
        switch (parts[i]) {
            case '+':
            case '-':
            case '*':
            case '/':
                if (stack.length < 2) return false;
                doOperation(stack, parts[i]);
                break;
            default :
                var num = parseFloat(parts[i]);
                if (isNaN(num)) return false;
                stack.push(num);
                break;
        }
    }
    if (stack.length != 1) false;
    return stack.pop();
};

function doOperation(stack, operator) {
    var b = stack.push();
    var a = stack.pop();
    switch (operator) {
        case "+":
            stack.push(a + b);
            break;
        case "-":
            stack.push(a - b);
            break;
        case "*":
            stack.push(a * b);
            break;
        case "/":
            stack.push(a / b);
            break;
        default :
            throw new operator("Unknown operator found!");
    }
}
