function bgColor() {
    document.body.style.background = `radial-gradient(at top, rgb(${Math.floor((Math.random() * (230 - 130)) + 130)}, ${Math.floor((Math.random() * (230 - 130)) + 130)}, ${Math.floor((Math.random() * (230 - 130)) + 130)}), transparent), radial-gradient(at right, rgb(${Math.floor((Math.random() * (230 - 130)) + 130)}, ${Math.floor((Math.random() * (230 - 130)) + 130)}, ${Math.floor((Math.random() * (230 - 130)) + 130)}), transparent), radial-gradient(at bottom, rgb(${Math.floor((Math.random() * (230 - 130)) + 130)}, ${Math.floor((Math.random() * (230 - 130)) + 130)}, ${Math.floor((Math.random() * (230 - 130)) + 130)}), transparent), radial-gradient(at left, rgb(${Math.floor((Math.random() * (230 - 130)) + 130)}, ${Math.floor((Math.random() * (230 - 130)) + 130)}, ${Math.floor((Math.random() * (230 - 130)) + 130)}), transparent)`;
} // serene color indeed ;)
bgColor();

const screens = [document.getElementById('main'), document.getElementById('first'), document.getElementById('second'), document.getElementById('g1'), document.getElementById('g2'), document.getElementById('g3')];
const buttons = [document.getElementById('changeBg'), document.getElementById('buttonTo1'), document.getElementById('buttonTo2'), document.getElementById('btnG1'), document.getElementById('btnG2'), document.getElementById('btnG3')];
var tttRunned = false;

function menu() {
    screens.slice(1, 6).forEach((e) => {
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

let c = document.getElementsByTagName('canvas');

function cd(canvas) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    ctx.beginPath();
    ctx.moveTo(0, 5);
    ctx.lineTo(canvas.width, 5);
    ctx.stroke();
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
            cd(c[0]);
            cd(c[1]);
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
        let time = new Date(Date());
        let updated = response['updated_at'];
        let text;
        function diffText(x, y, a) {
            if (diff === 0) {
                diff = 'just';
                text = 'now';
            } else if (diff === 1) {
                diff = a;
                text = x;
            } else {
                text = y;
            }
        }
        let diff = Math.round((time.getTime() - Date.parse(updated)) / 60000);
        if (diff >= 60) {
            diff = Math.round(diff / 60);
            if (diff >= 24) {
                diff = Math.round(diff / 24);
                diffText('day ago', 'days ago', 'a');
            } else {
                diffText('hour ago', 'hours ago', 'an');
            }
        } else {
            diffText('minute ago', 'minutes ago', 'a');
        }
        document.getElementById('lastUpdatedTime').innerHTML = `${new Date(updated).toLocaleDateString()} (${diff} ${text})`;
    })
    .catch((error) => {
        document.getElementById('lastUpdatedTime').innerHTML = `ERROR: ${error}`;
        console.log(`Unable to fetch 'updated_at' from GitHub -> Error: ${error}`)
    })
// credit to https://beautifier.io/
