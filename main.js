function bgColor() {
    document.body.style.background = `radial-gradient(at top, rgb(${Math.floor((Math.random() * (230 - 130)) + 130)}, ${Math.floor((Math.random() * (230 - 130)) + 130)}, ${Math.floor((Math.random() * (230 - 130)) + 130)}), transparent), radial-gradient(at right, rgb(${Math.floor((Math.random() * (230 - 130)) + 130)}, ${Math.floor((Math.random() * (230 - 130)) + 130)}, ${Math.floor((Math.random() * (230 - 130)) + 130)}), transparent), radial-gradient(at bottom, rgb(${Math.floor((Math.random() * (230 - 130)) + 130)}, ${Math.floor((Math.random() * (230 - 130)) + 130)}, ${Math.floor((Math.random() * (230 - 130)) + 130)}), transparent), radial-gradient(at left, rgb(${Math.floor((Math.random() * (230 - 130)) + 130)}, ${Math.floor((Math.random() * (230 - 130)) + 130)}, ${Math.floor((Math.random() * (230 - 130)) + 130)}), transparent)`;
}
bgColor();

const screens = [document.getElementById('main'), document.getElementById('first'), document.getElementById('second'), document.getElementById('g1'), document.getElementById('g2'), document.getElementById('g3')];
const buttons = [document.getElementById('changeBg'), document.getElementById('buttonTo1'), document.getElementById('buttonTo2'), document.getElementById('btnG1'), document.getElementById('btnG2'), document.getElementById('btnG3')];
var tttRunned = false;

function menu() {
    screens.slice(1, 5).forEach((e) => {
        e.style.display = 'none';
    });
    screens[0].style.display = 'flex';
}
menu();

document.documentElement.addEventListener('keydown', (event) => {
    if (event.key == 'Tab') {
        event.preventDefault();
    }
});

function hide() {
    screens.forEach((s) => {
        s.style.display = 'none';
    });
}

Array.from(buttons).forEach((b, i) => {
    b.addEventListener('click', (e) => {
        if (e.target === buttons[0]) {
            bgColor();
        } else {
            hide();
            screens.forEach((s, sI) => {
                if (i === sI) {
                    s.style.display = 'flex';
                }
            });
        }
    });
});

Array.from(document.getElementsByTagName('div')).forEach((e) => {
    if (e.getAttribute('name') === 'title') {
        e.style.fontSize = '35px';
        e.style.fontWeight = 'bold';
    }
    if (e.getAttribute('name') === 'tiny') {
        e.style.fontSize = '15px';
    }
});

fetch('https://api.github.com/repos/nuhuhname/n')
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        document.getElementById('lastUpdatedTime').innerHTML = response['updated_at'].slice(0, 10);
    })
    .catch((error) => {
        document.getElementById('lastUpdatedTime').innerHTML = 'unknown';
        console.log(`Unable to fetch "updated_at" from GitHub -> Error: ${error}`);
    })
// credit to https://beautifier.io/ 