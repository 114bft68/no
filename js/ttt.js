function ttt() {
    tttRunned = true;
    document.getElementById('s1').style.display = 'flex';
    document.getElementById('s2').style.display = 'none';
    const wolN = document.getElementById('wolN');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const oimg = document.getElementById('o');
    const ximg = document.getElementById('x');
    var rect, x, y, nx, ny, sxy, sx, sy, wol;
    var turn = true;
    var c = ['0,0', '0,100', '0,200', '100,0', '100,100', '100,200', '200,0', '200,100', '200,200'];
    var w1 = ['0,0', '100,0', '200,0'];
    var w2 = ['0,100', '100,100', '200,100'];
    var w3 = ['0,200', '100,200', '200,200'];
    var w4 = ['0,0', '0,100', '0,200'];
    var w5 = ['100,0', '100,100', '100,200'];
    var w6 = ['200,0', '200,100', '200,200'];
    var w7 = ['0,0', '100,100', '200,200'];
    var w8 = ['200,0', '100,100', '0,200'];
    var wps = [w1, w2, w3, w4, w5, w6, w7, w8];

    function shuffle() {
        for (let i = 7; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [wps[i], wps[j]] = [wps[j], wps[i]];
        }
        wps.forEach((array) => {
            for (let i = 2; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        });
    }
    shuffle();
    var wltd = ended = false;

    function canvasF() {
        wolN.style.display = 'none';
        wolN.style.padding = '3.5%';
        setTimeout(() => {
            canvas.style.pointerEvents = 'auto';
        }, 250);
        // vertical lines
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 3, 0);
        ctx.lineTo(canvas.width / 3, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(canvas.width / 3 * 2, 0);
        ctx.lineTo(canvas.width / 3 * 2, canvas.height);
        ctx.stroke();
        // horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 3);
        ctx.lineTo(canvas.width, canvas.height / 3);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 3 * 2);
        ctx.lineTo(canvas.width, canvas.height / 3 * 2);
        ctx.stroke();
    }

    const btns = [document.getElementById('obtn'), document.getElementById('xbtn')];
    var user;

    btns.forEach((e) => {
        e.addEventListener('click', (btn) => {
            canvas.style.pointerEvents = 'none';
            if (btn == btns[0]) {
                user = 1;
                document.getElementById('s1').style.display = 'none';
                document.getElementById('s2').style.display = 'flex';
                canvasF();
            } else {
                user = 2;
                document.getElementById('s1').style.display = 'none';
                document.getElementById('s2').style.display = 'flex';
                canvasF();
            }
        });
    });

    function nonameF1() {
        c.splice(c.indexOf(`${nx},${ny}`), 1);
        wps.forEach((array) => {
            if (array.includes(`${nx},${ny}`)) {
                array.splice(array.indexOf(`${nx},${ny}`), 1);
                if (array.includes(`${nx},${ny}`)) {
                    array.splice(array.indexOf(`${nx},${ny}`), 1);
                }
            }
        });
        turn = false;
        canvas.style.pointerEvents = 'none';
    }

    canvas.addEventListener('click', (e) => {
        if (turn == true && c.length !== 0) {
            canvas.style.pointerEvents = 'none';
            setTimeout(() => {
                canvas.style.pointerEvents = 'auto';
            }, 500);
            rect = canvas.getBoundingClientRect();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            if (isNaN(x)) {
                x = e.touches[0].clientX - rect.left;
                y = e.touches[0].clientY - rect.top;
            }
            if (x < 100) {
                nx = 0;
            } else if (x < 200 && x > 100) {
                nx = 100;
            } else if (x > 200) {
                nx = 200;
            }
            if (y < 100) {
                ny = 0;
            } else if (y < 200 && y > 100) {
                ny = 100;
            } else if (y > 200) {
                ny = 200;
            }
            if (c.includes(nx + ',' + ny)) {
                if (user === 1) {
                    ctx.drawImage(oimg, nx, ny);
                    nonameF1();
                } else {
                    ctx.drawImage(ximg, nx, ny);
                    nonameF1();
                }
            }
        }
    });

    function nonameF2() {
        c.splice(c.indexOf(`${sx},${sy}`), 1);
        wps.forEach((array) => {
            if (array.includes(`${sx},${sy}`)) {
                array.splice(array.indexOf(`${sx},${sy}`), 1, 's');
                if (array.includes(`${sx},${sy}`)) {
                    array.splice(array.indexOf(`${sx},${sy}`), 1, 's');
                }
            }
        });
        turn = true;
        canvas.style.pointerEvents = 'auto';
    }

    function nonameF3() {
        sx = sxy[0];
        sy = sxy[1];
    }
    setInterval(() => {
        if (turn == false && c.length !== 0 && wps.every((array) => array.length !== 0) && c.length !== 0 && wps.every((array) => array.filter((item) => item === 's').length !== 3)) {
            if (wps.some((array) => array.filter((item) => item === 's').length === 2 && array.length === 3)) {
                var noname = (wps.find((array) => array.filter((item) => item === 's').length === 2 && array.length === 3)).find((item) => item.includes(','));
                sxy = noname.split(',');
                nonameF3();
            } else if (wps.some((array) => array.length === 1 && array[0] !== 's')) {
                var noname = wps.find((array) => array.length === 1 && array[0] !== 's');
                sxy = noname[0].split(',');
                nonameF3();
            } else if (wps.some((array) => array.filter((item) => item === 's').length === 1 && array.length === 3)) {
                var noname = (wps.find((array) => array.filter((item) => item === 's').length === 1 && array.length === 3)).find((item) => item.includes(','));
                sxy = noname.split(',');
                nonameF3();
            } else if (wps.some((array) => array.length === 2 && array[0] !== 's' && array[1] !== 's')) {
                var noname = wps.find((array) => array.length === 2 && array[0] !== 's' && array[1] !== 's');
                sxy = noname[Math.floor(Math.random() * 2)].split(',');
                nonameF3();
            }
            if (user === 1) {
                nonameF2();
                ctx.drawImage(ximg, sx, sy);
            } else {
                nonameF2();
                ctx.drawImage(oimg, sx, sy);
            }
        }
    }, 5);

    function nonameF4() {
        canvas.style.pointerEvents = 'none';
        wltd = true;
        ended = true;
    }

    function nonameF5() {
        wolN.innerHTML = wol;
        wolN.style.display = 'flex';
        setTimeout(() => {
            wolN.style.transition = 'all 2s';
            wolN.innerHTML = '';
            wolN.style.padding = '0%';
        }, 1000);
    }
    setInterval(() => {
        if (wltd == false) {
            if (wps.some((array) => array.length === 0)) {
                nonameF4();
                wol = 'YOU WON!';
                nonameF5();
            } else if (c.length === 0) {
                nonameF4();
                wol = 'TIE!';
                nonameF5();
            } else if (wps.some((array) => array.filter((item) => item === 's').length === 3)) {
                nonameF4();
                wol = 'YOU LOST';
                nonameF5();
            }
        }
    }, 1);

    function restartTtt() {
        document.getElementById('s1').style.display = 'flex';
        document.getElementById('s2').style.display = 'none';
        rect = x = y = nx = ny = sxy = sx = sy = wol = undefined;
        turn = true;
        c = ['0,0', '0,100', '0,200', '100,0', '100,100', '100,200', '200,0', '200,100', '200,200'];
        w1 = ['0,0', '100,0', '200,0'];
        w2 = ['0,100', '100,100', '200,100'];
        w3 = ['0,200', '100,200', '200,200'];
        w4 = ['0,0', '0,100', '0,200'];
        w5 = ['100,0', '100,100', '100,200'];
        w6 = ['200,0', '200,100', '200,200'];
        w7 = ['0,0', '100,100', '200,200'];
        w8 = ['200,0', '100,100', '0,200'];
        wps = [w1, w2, w3, w4, w5, w6, w7, w8];
        shuffle();
        wltd = ended = false;
        canvas.style.pointerEvents = 'auto';
    }
    document.getElementById('tttrestartbtn').addEventListener('click', restartTtt);

    setInterval(() => {
        if (ended == true) {
            canvas.style.pointerEvents = 'none';
        }
    }, 1);

    document.getElementById('return4').addEventListener('click', () => {
        restartTtt();
        document.getElementById('s1').style.display = 'none';
    });
}

function uhNoNameAgain() {
    document.getElementById('s1').style.display = 'flex';
    document.getElementById('s2').style.display = 'none';
    rect = x = y = nx = ny = sxy = sx = sy = wol = undefined;
    turn = true;
    c = ['0,0', '0,100', '0,200', '100,0', '100,100', '100,200', '200,0', '200,100', '200,200'];
    w1 = ['0,0', '100,0', '200,0'];
    w2 = ['0,100', '100,100', '200,100'];
    w3 = ['0,200', '100,200', '200,200'];
    w4 = ['0,0', '0,100', '0,200'];
    w5 = ['100,0', '100,100', '100,200'];
    w6 = ['200,0', '200,100', '200,200'];
    w7 = ['0,0', '100,100', '200,200'];
    w8 = ['200,0', '100,100', '0,200'];
    wps = [w1, w2, w3, w4, w5, w6, w7, w8];
    for (let i = 7; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [wps[i], wps[j]] = [wps[j], wps[i]];
    }
    wps.forEach((array) => {
        for (let i = 2; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    });
    wltd = ended = false;
    canvas.style.pointerEvents = 'auto';
    wolN.style.display = 'none';
    wolN.style.padding = '3.5%';
}
document.getElementById('btnG2').addEventListener('click', () => {
    if (tttRunned == false) {
        ttt();
    } else {
        uhNoNameAgain();
    }
});
// credit to https://beautifier.io/ 
