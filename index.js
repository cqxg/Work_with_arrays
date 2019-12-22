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

    const makeFinalString = (arrOfArr) => {

        const total = arrOfArr.reduce((tempString, curr) => {
            const string = curr.join('');
            return tempString + string + '\n';
        }, '');

        return total;
    }

    const drawing = () => {
        let arrOfArr = [];

        for (let i = 0; i < newRules.length; i++) {
            const { type, command } = newRules[i];

            if (type === 'C') {
                arrOfArr = drawCanvas(command);
            }

            else if (type === 'L') {

                if (command.x1 === command.x2) {
                    for (let i = command.y1; i <= command.y2; i++) {
                        arrOfArr[Number(i)].fill('x', command.x1 - 1, command.x1);
                    }
                }
                else if (command.x1 !== command.x2) {
                    arrOfArr[Number(command.y1)].fill('x', command.x1 - 1, command.x2);
                };
            }

            else if (type === 'R') {
                arrOfArr[Number(command.y_bottom)].fill('x', command.x_top - 1, command.x_bottom);
                arrOfArr[Number(command.y_top)].fill('x', command.x_top - 1, command.x_bottom);

                for (let i = command.y_top; i <= command.y_bottom; i++) {
                    arrOfArr[Number(i)].fill('x', command.x_top - 1, command.x_top);
                };

                for (let j = command.y_top; j <= command.y_bottom; j++) {
                    arrOfArr[Number(j)].fill('x', command.x_bottom - 1, command.x_bottom);
                };
            }

            else if (type === 'B') {

                if (arrOfArr[command.y][Number(command.x)] === ' ') {
                    // for(let i = 1; i <arrOfArr[1].length; i++ ) {
                    //     if (arrOfArr[2][i] === ' '){
                    //         arrOfArr[2][i].replace(/ /g,'o')
                    //         console.log(arrOfArr[2][5])
                    //     }
                    // }
                    // console.log(arrOfArr);
                    // var arr2 = ['0', '1', '2', '3', '4', '5', '4', '7', '8', '9', '4', '11'];
                    // arrOfArr[arrOfArr.map((x, i) => [i, x]).filter(x => x[1] == ' ')] = 'o'
                    console.log(arrOfArr);
                    // arrOfArr.replace(/ /g, 'o');
                }
                // console.log('Bucket o', command.color);
            };
        };

        ctx_content.innerText += makeFinalString(arrOfArr);
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