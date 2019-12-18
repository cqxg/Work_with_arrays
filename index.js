const App = () => {
    const go = document.querySelector('.go');

    const reqest = () => {
        fetch('../input.txt')
            .then(res => res.text())
            .then(response => {
                console.log(response);
            })
            .catch(err => console.log(err));
    };

    go.addEventListener('click', reqest);
};

document.addEventListener('DOMContentLoaded', App);