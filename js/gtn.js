function gtn() {
    const hint = document.getElementById('hint');
    const input = document.getElementById('gtnInput');
    const submit = document.getElementById('gtnSubmit');
    const attempts = document.getElementById('attempts');
    var at = 7;
    attempts.innerHTML = at;
    var rnmn = Math.floor((Math.random() * 100) + 1);
    var plsStart = false;

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
            plsStart = true;
            hint.innerHTML = null;
            input.value = null;
            valueStoring = setInterval(() => {
                storedValue = input.value;
            }, 1);
        }
    }, 1);

    setInterval(() => {
        if (plsStart == true) {
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
                    plsStart = true;
                    hint.innerHTML = null;
                    input.value = null;
                    valueStoring = setInterval(() => {
                        storedValue = input.value;
                    }, 1);
                }
            }, 1);
            plsStart = false;
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

    function eventGtn() {
        clearInterval(valueStoring);
        clearInterval(interval1);
        if (storedValue !== '' && storedValue > 0 && storedValue <= 100) {
            if (storedValue == rnmn) {
                alert('You won!');
                rnmn = Math.floor((Math.random() * 100) + 1);
                at = 7;
                attempts.innerHTML = at;
                plsStart = true;
                hint.innerHTML = null;
                input.value = null;
                valueStoring = setInterval(() => {
                    storedValue = input.value;
                }, 1);
            } else if (storedValue > rnmn) {
                hintFontSizeTransition();
                hint.innerHTML = 'too large... 🙏🤏';
                attempts.innerHTML = at -= 1;
                input.value = null;
                valueStoring = setInterval(() => {
                    storedValue = input.value;
                }, 1);
            } else if (storedValue < rnmn) {
                hintFontSizeTransition();
                hint.innerHTML = 'too small... 🤏🤏';
                attempts.innerHTML = at -= 1;
                input.value = null;
                valueStoring = setInterval(() => {
                    storedValue = input.value;
                }, 1);
            }
        } else if (storedValue == '') {
            hintFontSizeTransition();
            hint.innerHTML = 'empty... 😭';
            valueStoring = setInterval(() => {
                storedValue = input.value;
            }, 1);
        } else if (storedValue < 0 || storedValue > 100) {
            input.value = null;
            hintFontSizeTransition();
            hint.innerHTML = 'the range is 1-100...';
            valueStoring = setInterval(() => {
                storedValue = input.value;
            }, 1);
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
        delete at;
        hint.innerHTML = null;
        delete rnmn;
        delete plsStart;
    });
}

document.getElementById('btnG1').addEventListener('click', gtn);
// credit to https://beautifier.io/