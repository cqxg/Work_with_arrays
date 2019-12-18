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

    const parseOutput = (response) => console.log(response);

    goInput.addEventListener('click', () => reqest('output.txt', parseInput));
    goOutput.addEventListener('click', () => reqest('output.txt', parseOutput));
};

document.addEventListener('DOMContentLoaded', App);