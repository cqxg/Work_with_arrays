const App = () => {
    const draw = document.querySelector('.draw');
    const goInput = document.querySelector('.goInput');
    const ctx_content = document.querySelector('.ctx_content');
    const input_content = document.querySelector('.input_content');

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

    const TOOLBOX = {
        EMPTY_SPACE: ' ',
        HOR_LINE: '-',
        VER_LINE: '|',
        FILL_LINE: 'x',
    }


    // ---------------------------------------- UTILS--------------------------------------------------------------
    const request = (data, parse) => {
        fetch(data)
            .then(res => res.text())
            .then(response => {
                parse(response);
            })
            .catch(err => console.log(err));
    };

    const makeNums = ({ x, y }) => ({
        num_x: Number(x),
        num_y: Number(y),
    });

    const inRange = (x, y) => {
        if (x < 0 || x > arrOfArr.length) {
            return false;
        } else if (y < 0 || y > arrOfArr[0].length) {
            return false;
        } else {
            return true;
        }
    }

    const border = ({ x, y }) => {
        const rangedArray = [
            [x - 1, y - 1],
            [x - 1, y],
            [x, y],
            [x - 1, y + 1],
            [x, y + 1],
            [x, y - 1],
            [x + 1, y],
            [x + 1, y + 1],
            [x + 1, y - 1]
        ];

        const filteredArray = rangedArray.filter(([x, y]) => inRange({ x, y }));

        return filteredArray;
    };
    // ------------------------------------------------------------------------------------------------------------


    // ---------------------------------------- GENERAL -----------------------------------------------------------
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
    // ------------------------------------------------------------------------------------------------------------


    // ---------------------------------------- DRAWING -----------------------------------------------------------
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
                    fillColour(command);
                    break;
            };
        };

        ctx_content.innerText += makeFinalString(arrOfArr);
    };

    const drawCanvas = ({ w, h }) => {
        const { HOR_LINE, VER_LINE, EMPTY_SPACE } = TOOLBOX;

        const closeLine = HOR_LINE.repeat(w).split('');
        const contentLine = [];
        for (let i = 0; i <= h - 1; i++) {
            const tempLine = (VER_LINE + EMPTY_SPACE.repeat(w - 2) + VER_LINE).split('');
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
        const { FILL_LINE } = TOOLBOX;

        if (x1 === x2) {
            for (let i = y1; i <= y2; i++) {
                arrOfArr[Number(i)].fill(FILL_LINE, x1 - 1, x1);
            }
        }
        else if (x1 !== x2) {
            arrOfArr[Number(y1)].fill(FILL_LINE, x1 - 1, x2);
        };
    };

    const drawRect = ({ x_top, y_top, x_bottom, y_bottom }) => {
        const { FILL_LINE } = TOOLBOX;

        arrOfArr[Number(y_bottom)].fill(FILL_LINE, x_top - 1, x_bottom);

        arrOfArr[Number(y_top)].fill(FILL_LINE, x_top - 1, x_bottom);

        for (let i = y_top; i <= y_bottom; i++) {
            arrOfArr[Number(i)].fill(FILL_LINE, x_top - 1, x_top);
        };

        for (let j = y_top; j <= y_bottom; j++) {
            arrOfArr[Number(j)].fill(FILL_LINE, x_bottom - 1, x_bottom);
        };
    };

    const fillColour = ({ x, y, color }) => {
        const { EMPTY_SPACE } = TOOLBOX;

        const { num_x, num_y } = makeNums({ x, y });

        if (arrOfArr[num_y][num_x] == EMPTY_SPACE) {
            arrOfArr[num_y][num_x] = 'o';

            const result = border({ x: num_x, y: num_y });

            result.forEach(([x, y]) => fillColour({ x, y, color }));
        };
    };
    // --------------------------------------------------------------------------------------------------


    goInput.addEventListener('click', () => request('input.txt', parseInput));
    draw.addEventListener('click', drawing);
};

document.addEventListener('DOMContentLoaded', App);