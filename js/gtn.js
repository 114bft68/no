function gtn() {
    const hint = document.getElementById('hint');
    const input = document.getElementById('gtnInput');
    const submit = document.getElementById('gtnSubmit');
    const attempts = document.getElementById('attempts');
    var at = 7;
    attempts.innerHTML = at;
    var rnmn = Math.floor((Math.random() * 100) + 1);
    var gtnStart = false;

    var storedValue;
    var valueStoring = setInterval(() => {
        storedValue = input.value;
    }, 1);

    var interval1 = setInterval(() => {
        if (hint.innerHTML.length < 4) {
            hint.innerHTML += '.';
        }
        if (hint.innerHTML.length == 4) {
            hint.innerHTML = '.';
        }
    }, 500);

    var interval2 = setInterval(() => {
        if (at === 0) {
            attempts.innerHTML = at;
            clearInterval(interval2);
            alert(`You lost, the answer was ${rnmn}`);
            rnmn = Math.floor((Math.random() * 100) + 1);
            at = 7;
            attempts.innerHTML = at;
            gtnStart = true;
            hint.innerHTML = null;
            input.value = null;
            valueStoring = setInterval(() => {
                storedValue = input.value;
            }, 1);
        }
    }, 1);

    setInterval(() => {
        if (gtnStart == true) {
            gtnStart = false;
            interval1 = setInterval(() => {
                if (hint.innerHTML.length < 4) {
                    hint.innerHTML += '.';
                }
                if (hint.innerHTML.length == 4) {
                    hint.innerHTML = '.';
                }
            }, 500);
            interval2 = setInterval(() => {
                if (at === 0) {
                    attempts.innerHTML = at;
                    clearInterval(interval2);
                    alert(`You lost, the answer was ${rnmn}`);
                    rnmn = Math.floor((Math.random() * 100) + 1);
                    at = 7;
                    attempts.innerHTML = at;
                    gtnStart = true;
                    hint.innerHTML = null;
                    input.value = null;
                    valueStoring = setInterval(() => {
                        storedValue = input.value;
                    }, 1);
                }
            }, 1);
        }
    }, 1);

    function hintFontSizeTransition() {
        hint.style.fontSize = '26.5px';
        hint.style.transition = 'all 0.35s';
        setTimeout(() => {
            hint.style.fontSize = '25px';
            hint.style.transition = 'all 0.35s';
        }, 250);
    }

    function gtnCheck(x, y) {
        hint.innerHTML = x;
        hintFontSizeTransition();
        attempts.innerHTML = (at -= y);
        input.value = null;
        valueStoring = setInterval(() => {
            storedValue = input.value;
        }, 1);
    }

    function eventGtn() {
        clearInterval(valueStoring);
        clearInterval(interval1);
        if (storedValue !== '' && !isNaN(storedValue) && storedValue > 0 && storedValue <= 100) {
            if (storedValue == rnmn) {
                gtnCheck(null, 0);
                alert('You won!');
                rnmn = Math.floor((Math.random() * 100) + 1);
                at = 7;
                attempts.innerHTML = at;
                gtnStart = true;
            } else if (storedValue > rnmn) {
                gtnCheck('too large... 🙏🤏', 1);
            } else if (storedValue < rnmn) {
                gtnCheck('too small... 🤏🤏', 1);
            }
        } else if (storedValue == '') {
            gtnCheck('empty... 😭', 0);
        } else if (isNaN(storedValue)) {
            gtnCheck('please enter a number', 0);
        } else if (storedValue <= 0 || storedValue > 100) {
            gtnCheck('the range is 1-100...', 0);
        }
    }

    submit.addEventListener('click', eventGtn);
    input.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            eventGtn();
        }
    });

    document.getElementById('return3').addEventListener('click', () => {
        clearInterval(interval1);
        clearInterval(interval2);
        clearInterval(valueStoring);
        delete at, rnmn, gtnStart;
        hint.innerHTML = null;
    });
}

document.getElementById('btnG1').addEventListener('click', gtn);
// credit to https://beautifier.io/
