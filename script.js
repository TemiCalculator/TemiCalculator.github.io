let inputRecorder = "";
let question = [];
let resultScreen = null;
let inputScreen = null;

document.addEventListener("DOMContentLoaded", function(ev) {
    resultScreen = document.getElementById("result-screen");
    inputScreen = document.getElementById("input-screen");

    forEach(document.querySelectorAll(".calc-buttons button"), function(element){
        if(element.id.search("sym_equal") < 0 && element.id.search("action") < 0){
            element.addEventListener("click", evaluateButtonAction);
        }
    });

    document.getElementById("sym_equal").addEventListener("click", equalButtonAction);
    document.getElementById("action_clear").addEventListener("click", resetButtonAction);
    document.getElementById("action_del").addEventListener("click", deleteInputAction);

    console.log("done")
});

const forEach = function(array, callback) {
    for (let index = 0; index < array.length; index++) {
        (callback)(array[index]);
    }
};

const displayInput = function(input) {
    const values = {
        "sym_add": "+",
        "sym_sub": "-",
        "sym_mul": "*",
        "sym_div": "/"
    };

    if(input.search("sym") > -1){
        inputScreen.textContent += ` ${values[input]} `;
    }else{
        inputScreen.textContent += `${input}`;
    }
};

const solve = function() {
    debugger;
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
        },
        "sym_div": function(a, b) {
            return a / b;
        }
    };

    if(inputRecorder != ""){
        question.push(inputRecorder);
    }

    if (question.length >= 3) {
        let leftOperand = parseFloat(question[0]);
        let operator = question[1];
        let rightOperand = parseFloat(question[2]);

        result = `${operation[operator](leftOperand, rightOperand)}`;
        console.log(result);

        question = [result].concat(question.slice(3));
    }

    resultScreen.textContent = result;
    return result;
};

const evaluateButtonAction = function({target}) {
    // debugger;
    const input = target.id;

    // If a symbol was pressed...
    if(input.search("sym") > -1){
        question.push(inputRecorder, input);
        inputRecorder = "";
        solve();

    }else{
        inputRecorder += input;
    }

    displayInput(input);
};

const equalButtonAction = function(ev) {
    inputRecorder = solve();
};

const resetButtonAction = function(ev) {
    inputRecorder = "";
    question = [];

    inputScreen.textContent = "";
    resultScreen.textContent = "";
};

const deleteInputAction = function(ev) {
    alert("deleting...");
};