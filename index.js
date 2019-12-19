const App = () => {
    const goInput = document.querySelector('.goInput');
    const goOutput = document.querySelector('.goOutput');
    const ctx_wrapper = document.querySelector('.ctx_wrapper');
    const ctx_content = document.querySelector('.ctx_content');
    const draw = document.querySelector('.draw');


    const rules = {
        C: {
            w: '',
            h: '',
        },

        L: {
            x1: '',
            y1: '',
            x2: '',
            y2: '',
        },

        R: {
            x_top: '',
            y_top: '',
            x_bottom: '',
            y_bottom: '',
        },

        B: {
            x: '',
            y: '',
            color: '',
        }
    };

    const newRules = [];

    const request = (data, parse) => {
        fetch(data)
            .then(res => res.text())
            .then(response => {
                parse(response);
            })
            .catch(err => console.log(err));
    };

    const createRules = element => {
        const arr = [...element];
        const type = arr.shift().toUpperCase();
        const rule = rules[type];

        const newRule = { ...rule };

        console.log('--------------------')
        console.log('Type: ', type);
        console.log('Rule: ', rule);
        console.log('Rest: ', arr);

        Object.keys(newRule).forEach((e, index) => {
            newRule[e] = arr[index];
        });

        newRules.push({
            type,
            command: newRule,
        });
    };

    const drawing = () => {
        for (let i = 0; i < newRules.length; i++) {
            if (newRules[i].type === 'C') {
                ctx_content.innerHTML = '-'.repeat(newRules[i].command.w);
                ctx_content.innerHTML = '-'.repeat(newRules[i].command.h);
                // 
                //     `<div style="width:${newRules[i].command.w}px;height:${newRules[i].command.h}px;"></div>`;
                console.log('canvas: w', newRules[i].command.w);
                console.log('canvas: h', newRules[i].command.h);
            }
            else if (newRules[i].type === 'L') {
                console.log('line x1', newRules[i].command.x1);
                console.log('line y1', newRules[i].command.y1);
                console.log('line x2', newRules[i].command.x2);
                console.log('line y2', newRules[i].command.y2);
            }
            else if (newRules[i].type === 'R') {
                console.log('rec x1', newRules[i].command.x_top);
                console.log('rec y1', newRules[i].command.y_top);
                console.log('rec x2', newRules[i].command.x_bottom);
                console.log('rec y2', newRules[i].command.y_bottom);
            }
            else if (newRules[i].type === 'B') {
                console.log('Bucket x', newRules[i].command.x);
                console.log('Bucket y', newRules[i].command.y);
                console.log('Bucket o', newRules[i].command.color);
            };
        };
    };

    const parseInput = (response) => {
        const splitResponse = response.split('\n');
        const parsedResponse = splitResponse.map(command => command.split(" "));
        parsedResponse.forEach(element => createRules(element));
    };

    const parseOutput = (response) => console.log(response);

    const s1 = 'xxxxxx';
    const s2 = 'x    x';
    const s3 = 'x    x';
    const s4 = 'xxxxxx';

    //const result = s1 + '\n' + s2 + '\n' + s3 + '\n' + s4;
    const result = `
    ----------------------
    |oooooooooooooooxxxxx|
    |xxxxxxooooooooox   x|
    |     xoooooooooxxxxx|
    |     xoooooooooooooo|
    ----------------------
    `

    ctx_content.innerHTML = result;

    goInput.addEventListener('click', () => request('input.txt', parseInput));
    goOutput.addEventListener('click', () => request('output.txt', parseOutput));
    draw.addEventListener('click', drawing);
};

document.addEventListener('DOMContentLoaded', App);