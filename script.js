let inputRecorder = "";
let question = [];
let result_screen = null;
let input_screen = null;

document.addEventListener("DOMContentLoaded", function(ev) {
    result_screen = document.getElementById("result-screen");
    input_screen = document.getElementById("input-screen");

    forEach(document.querySelectorAll(".calc-buttons button"), function(element){
        if(element.id.search("sym_equal") < 0 && element.id.search("action") < 0){
            element.addEventListener("click", evaluateButtonAction);
        }
    });

    document.getElementById("sym_equal").addEventListener("click", equalButtonAction);
    document.getElementById("action_clear").addEventListener("click", resetButtonAction);
    document.getElementById("action_del").addEventListener("click", resetButtonAction);

    console.log("done")
});

const evaluateButtonAction = function({target}) {
    // debugger;
    const input = target.id;

    // If a symbol was pressed...
    if(input.search("sym") > -1){
        question.push(inputRecorder, input);
        inputRecorder = "";
        inputRecorder = solve();

    }else{
        inputRecorder += input;
    }

    displayInput(input);
};

const displayInput = function(input) {
    const values = {
        "sym_add": "+",
        "sym_sub": "-",
        "sym_mul": "*"
    };

    if(input.search("sym") > -1){
        input_screen.textContent += ` ${values[input]} `;
    }else{
        input_screen.textContent += `${input}`;
    }
};

const equalButtonAction = function() {
    inputRecorder = solve();
};

const solve = function() {
    // debugger;
    let result = "";
    const operation = {
        "sym_add": function(a, b) {
            return a + b;
        },
        "sym_sub": function(a, b) {
            return a - b;
        },
        "sym_mul": function(a, b) {
            return a * b;
        }
    };

    if(inputRecorder != ""){
        question.push(inputRecorder);
    }

    if (question.length == 3) {
        let left_operand = parseFloat(question[0]);
        let operator = question[1];
        let right_operand = parseFloat(question[2]);

        result = operation[operator](left_operand, right_operand);
        console.log(result);

        question = [result];
    }

    result_screen.textContent = `${result}`;
    return `${result}`;
};

const resetButtonAction = function(ev) {
    alert("resetting...")
};
 
const forEach = function(array, callback) {
    for (let index = 0; index < array.length; index++) {
        (callback)(array[index]);
    }
};