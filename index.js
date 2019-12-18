const App = () => {
    const goInput = document.querySelector('.goInput');
    const goOutput = document.querySelector('.goOutput');

    const reqest = (data, parse) => {
        fetch(data)
            .then(res => res.text())
            .then(response => {
                parse(response);
            })
            .catch(err => console.log(err));
    };

    const parseInput = (response) => {
        const splitResponse = response.split('\n');
        const parsedResponse = splitResponse.map(command => command.split(' '))
        console.log(parsedResponse);
    };

    const parseOutput = (response) => console.log(response);

    goInput.addEventListener('click', () => reqest('input.txt', parseInput));
    goOutput.addEventListener('click', () => reqest('output.txt', parseOutput));
};

document.addEventListener('DOMContentLoaded', App);