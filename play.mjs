import { shuffle } from './js/utils.mjs';

let backTimer;
let flgFirst = true;
let cardFirst;
const maxPair = 20;
const maxDummy = 16;
const cardImage = [];

// HTML のパース完了後まで initialize の実行を遅延させるための処理
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

function initialize() {
    const arr = [];

    const lost = Math.floor(Math.random() * maxPair);
    for (let i = 0; i < maxPair; i++) {
        if (i != lost) {
            arr.push(i);
            arr.push(i);
        }
    }
    let dummy_a = Math.floor(Math.random() * maxDummy);
    let dummy_b = Math.floor(Math.random() * (maxDummy-1));
    if (dummy_a <= dummy_b) { dummy_b++; }
    console.log(dummy_a);
    console.log(dummy_b);
    arr.push(-dummy_a-1);
    arr.push(-dummy_b-1);

    shuffle(arr);

    const panel = document.getElementById('panel');
    for (let i = 0; i < maxPair * 2; i++) {
        const div = document.createElement('div');
        div.classList.add('card', 'back');
        div.dataset.index = i;
        div.dataset.number = arr[i];
        div.onclick = turn;
        panel.appendChild(div);

        const img = new Image();
        if (arr[i] >= 0) {
            img.src = 'images/card' + (arr[i] + 1) + '.png';
        } else {
            img.src = 'images/dummy' + (-arr[i]) + '.png';
        }
        cardImage.push(img);
    }
}

function turn(e) {
    const div = e.currentTarget;

    // カードのタイマー処理が動作中
    if (backTimer) return;

    if (div.classList.contains('back')) {
        // 裏向きのカードをクリックした場合
        div.classList.remove('back');
        div.appendChild(cardImage[div.dataset.index]);
    } else {
        // 数字が表示されているカードは return
        return;
    }

    if (flgFirst) {
        // 1枚目の処理
        cardFirst = div;
        flgFirst = false;
    } else {
        // 2枚目の処理
        if (cardFirst.dataset.number == div.dataset.number) {
            // 数字が1枚目と一致する場合
            backTimer = setTimeout(function () {
                div.classList.add('finish');
                cardFirst.classList.add('finish');
                backTimer = NaN;
            }, 500);
        } else {
            // 一致しない場合
            backTimer = setTimeout(function () {
                div.classList.add('back');
                div.innerHTML = '';
                cardFirst.classList.add('back');
                cardFirst.innerHTML = '';
                cardFirst = null;
                backTimer = NaN;
            }, 500);
        }
        flgFirst = true;
    }
}
