// I didn't know the existence of the event 'click'
function bgColor() {
    document.body.style.background = `radial-gradient(at top, rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}), transparent), radial-gradient(at right, rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}), transparent), radial-gradient(at bottom, rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}), transparent), radial-gradient(at left, rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}), transparent)`;
}
bgColor();

document.documentElement.addEventListener('keydown', (event) => {
    if (event.key == 'Tab') {
        event.preventDefault(); // no tab selecting
    }
});

const screens = [document.getElementById('main'), document.getElementById('first'), document.getElementById('second'), document.getElementById('g1'), document.getElementById('g2'), document.getElementById('g3')];
const buttons = [document.getElementById('buttonTo1'), document.getElementById('buttonTo2'), document.getElementById('changeBg'), document.getElementById('return1'), document.getElementById('btnG1'), document.getElementById('btnG2'), document.getElementById('return2'), document.getElementById('return3'), document.getElementById('return4'), document.getElementById('btnG3'), document.getElementById('return5'), document.getElementById('copyBg')];
var tttRunned = false;

screens.slice(1, 5).forEach((e) => {
    e.style.display = 'none';
});
screens[0].style.display = 'flex';

function btnEvents(e) {
    if (e.target === buttons[0]) {
        screens.forEach((s, i) => {
            if (i !== 1) {
                s.style.display = 'none';
            }
        });
        screens[1].style.display = 'flex';
    }
    if (e.target === buttons[1]) {
        screens.forEach((s, i) => {
            if (i !== 2) {
                s.style.display = 'none';
            }
        });
        screens[2].style.display = 'flex';
    }
    if (e.target === buttons[2]) {
        bgColor();
    }
    if (e.target === buttons[4]) {
        screens.forEach((s, i) => {
            if (i !== 3) {
                s.style.display = 'none';
            }
        });
        screens[3].style.display = 'flex';
    }
    if (e.target === buttons[5]) {
        screens.forEach((s, i) => {
            if (i !== 4) {
                s.style.display = 'none';
            }
        });
        screens[4].style.display = 'flex';
    }
    if (e.target === buttons[10]) {
        screens.forEach((s, i) => {
            if (i !== 5) {
                s.style.display = 'none';
            }
        });
        screens[5].style.display = 'flex';
    }
    if (e.target === buttons[11]) {
        navigator.clipboard.write(document.body.style.background);
    }
    if (e.target === buttons[3] || e.target === buttons[6] || e.target === buttons[7] || e.target === buttons[8] || e.target === buttons[10]) {
        screens.forEach((s, i) => {
            if (i !== 0) {
                s.style.display = 'none';
            }
        });
        screens[0].style.display = 'flex';
    }
}

Array.from(buttons).forEach((e) => {
    e.addEventListener('mousedown', btnEvents);
    e.addEventListener('touchstart', btnEvents);
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

Array.from(document.getElementsByTagName('button')).forEach((e) => {
    e.addEventListener('touchend', () => {
        e.disabled = 'true';
    });
});
