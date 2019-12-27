const App = () => {
    const draw = document.querySelector('.draw');
    const goInput = document.querySelector('.goInput');
    const ctx_content = document.querySelector('.ctx_content');
    const input_content = document.querySelector('.input_content');
    const ignore = new Set();

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
    let arrOfArr = [];

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
            const { type, command } = newRules[i];
            switch (type) {
                case 'C':
                    arrOfArr = drawCanvas(command);
                    break;

                case 'L':
                    drawLine(command);
                    break;

                case 'R':
                    drawRect(command);
                    break;

                case 'B':
                    fill(command);
                    break;
            };
        };

        ctx_content.innerText += makeFinalString(arrOfArr);
    };

    const drawCanvas = ({ w, h }) => {
        const closeLine = '-'.repeat(w).split('');
        const contentLine = [];
        for (let i = 0; i <= h - 1; i++) {
            const tempLine = ('|' + ' '.repeat(w - 2) + '|').split('');
            contentLine.push(tempLine);
        };

        const resultLines = [
            closeLine,
            ...contentLine,
            closeLine,
        ];

        return resultLines;
    };

    const drawLine = ({ x1, y1, x2, y2 }) => {
        if (x1 === x2) {
            for (let i = y1; i <= y2; i++) {
                arrOfArr[Number(i)].fill('x', x1 - 1, x1);
            }
        }
        else if (x1 !== x2) {
            arrOfArr[Number(y1)].fill('x', x1 - 1, x2);
        };
    };

    const drawRect = ({ x_top, y_top, x_bottom, y_bottom }) => {
        arrOfArr[Number(y_bottom)].fill('x', x_top - 1, x_bottom);
        arrOfArr[Number(y_top)].fill('x', x_top - 1, x_bottom);

        for (let i = y_top; i <= y_bottom; i++) {
            arrOfArr[Number(i)].fill('x', x_top - 1, x_top);
        };

        for (let j = y_top; j <= y_bottom; j++) {
            arrOfArr[Number(j)].fill('x', x_bottom - 1, x_bottom);
        };
    };

    const inRange = (y, x) => {
        if (y < 0 || y > arrOfArr.length) {
            return false;
        } else if (x < 0 || x > arrOfArr[0].length) {
            return false;
        } else {
            return true;
        }
    };

    const border = (y, x) => [
        [x - 1, y - 1],
        [x, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x, y - 1],
        [x + 1, y],
        [x + 1, y + 1],
        [x + 1, y - 1]
    ].filter(([y, x]) => inRange(y, x));

    const fill = ({ y, x }) => {
        if (arrOfArr[y][x] === ' ') {
            arrOfArr[y][x] = 'o';
            border(y, x).forEach(([x, y]) => fill(x, y));
        };
    };



    const makeFinalString = (arrOfArr) => {
        const total = arrOfArr.reduce((tempString, curr) => {
            const string = curr.join('');
            return tempString + string + '\n';
        }, '');

        return total;
    };

    const parseInput = (response) => {
        const splitResponse = response.split('\n');
        const parsedResponse = splitResponse.map(command => command.split(" "));
        parsedResponse.forEach(element => createRules(element));
        input_content.innerText = response;
    };

    goInput.addEventListener('click', () => request('input.txt', parseInput));
    draw.addEventListener('click', drawing);
};

document.addEventListener('DOMContentLoaded', App);