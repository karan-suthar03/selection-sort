let values = [];
let states = [];
let num = 100;
let ls = 10;

function setup() {
    var canvas = createCanvas(windowWidth, 400);
    canvas.parent("canvas-container");
    for (let i = 0; i < num; i++) {
        values.push(random());
        states.push(-1);
    }
    selectionSort(values);
}

async function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        states[i] = 1;

        for (let j = i + 1; j < arr.length; j++) {
            states[j] = 1;

            if (arr[j] < arr[minIndex]) {
                states[minIndex] = -1;
                minIndex = j;
                states[minIndex] = 1;
            }

            await sleep(ls);
            states[j] = -1;
        }

        if (i !== minIndex) {
            await swap(arr, i, minIndex);
        }

        states[i] = -1;
    }
}

async function swap(arr, a, b) {
    await sleep(ls);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function draw() {
    background(255);
    noStroke();
    for (let i = 0; i < values.length; i++) {
        if (states[i] == 1) {
            fill(255, 0, 0);
        } else if (states[i] == 0) {
            fill(0, 0, 255);
        } else {
            fill(0);
        }
        rect(i * width / num, height, width / num, -values[i] * height);
    }
}

let inputs = document.getElementById("inputs");
inputs.addEventListener("input", function (event) {
    if (inputs.value != 0 && inputs.value != "") {
        ls = inputs.value;
    }
});
inputs.value = ls;

function speed(x) {
    ls = ls + x;
    inputs.value = ls;
}