let backTimer;
let flgFirst = true;
let cardFirst;
const maxPair = 9;
const cardImage = [];

window.onload = function () {
    const arr = [];

    for (let i = 0; i < maxPair; i++) {
        arr.push(i);
        arr.push(i);
    }

    shuffle(arr);

    const panel = document.getElementById('panel');
    for (i = 0; i < maxPair * 2; i++) {
        const div = document.createElement('div');
        div.className = 'card back';
        div.dataset.index = i;
        div.dataset.number = arr[i];
        div.onclick = turn;
        panel.appendChild(div);

        const img = new Image();
        img.src = 'images/card' + (arr[i] + 1) + '.png';
        cardImage.push(img);
    }
};

function shuffle(arr) {
    let n = arr.length;

    while (n) {
        const i = Math.floor(Math.random() * n--);
        const temp = arr[n];
        arr[n] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function turn(e) {
    const div = e.currentTarget;

    // カードのタイマー処理が動作中
    if (backTimer) return;

    // 裏向きのカードをクリックした場合
    if (div.className == 'card back') {
        div.className = 'card';
        div.appendChild(cardImage[div.dataset.index]);
    } else {
        // 数字が表示されているカードは return
        return;
    }

    // 1枚目の処理
    if (flgFirst) {
        cardFirst = div;
        flgFirst = false;

        // 2枚目の処理
    } else {
        // 数字が1枚目と一致する場合
        if (cardFirst.dataset.number == div.dataset.number) {
            backTimer = setTimeout(function () {
                div.className = 'card finish';
                cardFirst.className = 'card finish';
                backTimer = NaN;
            }, 500);

            // 一致しない場合
        } else {
            backTimer = setTimeout(function () {
                div.className = 'card back';
                div.innerHTML = '';
                cardFirst.className = 'card back';
                cardFirst.innerHTML = '';
                cardFirst = null;
                backTimer = NaN;
            }, 500);
        }

        flgFirst = true;
    }
}
