'use strict';

import { createAbout } from './createAbout.js';
import { wordList } from './wordList.js';

const about = document.getElementById('about');
about.addEventListener('click', displayAbout);
window.addEventListener('DOMContentLoaded', displayAbout);


function displayAbout() {
    let d = document.getElementById('area');
    let div = createAbout();
    d.innerHTML = "";
    d.appendChild(div);
}

let timerArray = new Array();

let timer = document.getElementById('timer');
let count = document.getElementById('count');
let kpm = document.getElementById('kpm');


let typeText = "";
let order = [];
let shuffledOrder;
let choosingLevel = 1;


const lv1 = document.getElementById('lv1');
const lv2 = document.getElementById('lv2');
const lv3 = document.getElementById('lv3');
const lv4 = document.getElementById('lv4');
const lv5 = document.getElementById('lv5');
const contentList = [lv1,lv2,lv3,lv4,lv5];

for (let i = 0; i < contentList.length; i++) {
    contentList[i].addEventListener('click', () => {
        let d = document.getElementById('area');

        d.innerHTML = '';
        timer.textContent = '';
        count.textContent = '';
        kpm.textContent = '';

        stopInterval();
        choosingLevel = i+1;
        createBlocks(i+1);
    })
}

window.addEventListener('keydown', judgeEscape, true);
function judgeEscape (e) {
    if (e.key === 'Escape') {
        contentList[choosingLevel-1].click();
    }
}



function firstKeyPressed () {

    timer.textContent = "30.0";
    count.textContent = "0";
    kpm.textContent = "0";

    timerArray.push(setInterval(startTimer, 100));
}


function startTimer () {

    let nowTime = timer.textContent - 0.1;
    nowTime = Number.parseFloat(nowTime).toFixed(1);
    if (nowTime <= 0) {
        typeFinish(false);
    }
    timer.textContent = nowTime;

}

function stopInterval() {
    if (timerArray.length > 0) {
        clearInterval(timerArray.shift());
    }
}



function createBlocks(level) {
    const area = document.getElementById('area');



    //レベルに応じてブロック幅を指定。
    let w = 0;
    let xCount = 0;
    let yCount = 0;
    switch (level) {
        case 1:
            [w, xCount, yCount] = [62.5, 8, 12];
            break;
        case 2:
            [w, xCount, yCount] = [50, 10, 15];
            break;
        case 3:
            [w, xCount, yCount] = [42, 12, 18];
            break;
        case 4:
            [w, xCount, yCount] = [36, 14, 21];
            break;
        case 5:
            [w, xCount, yCount] = [31.5, 16, 24];
            break;
    }

    createInputBox(xCount*yCount);
    
    let blockDOMs = [];
    for (let i = 0; i < yCount; i++) {
        for (let j = 0; j < xCount; j++) {
            let [x, y] = [j*w, i*w];
            let block = createImg();
            block.style = `left:${x}px;top:${y}px`;
            //area.appendChild(block);
            blockDOMs.push(block);
        }
    }

    const girls = document.createElement('img');
    girls.src = "img"+level+".png";
    if (level < 3) {
        girls.width = "500";
        girls.height = "750";
    } else {
        girls.width = "504";
        girls.height = "756";
    }
    setTimeout(() => {
        
        //inputだけの場合
        if (area.childElementCount === 1) {
        for (const b of blockDOMs) area.appendChild(b);
        area.appendChild(girls);
        }

    }, 300);

    function createImg () {
        const img = document.createElement('img');
        img.src = "block.png";
        img.className = "block is-overlay";
        img.width= w;
        return img;
    }

    function createInputBox(cnt) {

        let div = document.createElement('div');
        div.id = 'type_area';
        div.className = 'is-overlay';
        div.style = 'top:350px';

        let input = document.createElement('input');
        input.id = 'typing_area';
        input.className = 'input is-danger is-large is-rounded';
        input.type = 'text';

        area.appendChild(div);
        let makedDiv = document.getElementById('type_area');
        makedDiv.appendChild(input);

        setWord(cnt, input);

    }


    function setWord(cnt, typingArea) {

        let shuffledWordList = fisherYatesShuffle(wordList);
        typeText = shuffledWordList.join(' ');

        typingArea.value = typeText.slice(0, cnt);
        order = [];
        for (let i = 0; i < cnt; i++) {
            order.push(i);
        }
        shuffledOrder = fisherYatesShuffle(order);

        window.addEventListener('keydown', judgeKeys, false);
    }

}


function fisherYatesShuffle(arr){
    for(let i = arr.length-1 ; i > 0; i--) {
        let j = Math.floor( Math.random() * (i + 1) );
        [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
}

function judgeKeys(e) {
    e.preventDefault();

    let typedKey = e.key;
    let nextKey = typeText[0];

    if (typedKey === nextKey) {
        if (timer.textContent === '') {
            firstKeyPressed();
        }
        correctType(typedKey);
    } else {
        incorrectType(typedKey);
    }

}

function correctType(key) {
    
    typeText = typeText.slice(1);
    let typingArea = document.getElementById('typing_area');
    typingArea.value = typeText;

    deleteBlock();

}

function incorrectType(key) {
    //要改善！！
    let typingArea = document.getElementById('typing_area');
    typingArea.classList.add('missed');
    setTimeout(()=> {
        typingArea.classList.remove('missed');
    }, 1000);
    //if (key !== 'Enter') addBlock();
}

/*//ミスペナ処理

function addBlock() {

    const blocks = document.getElementsByClassName('block');

    for (let i = blocks.length; i >= 0; i--) {

        if (blocks[i]?.id === 'typedBlock') {
            blocks[i].id = 'missedBlock';
            break;
        }

    }
}
*/

function deleteBlock() {
    
    let typedCount = Number(count.textContent);
    count.textContent = String(typedCount + 1);
    let elapsedTime = 30 - Number(timer.textContent);
    let kpmValue = Math.round(typedCount / elapsedTime * 60);

    kpm.textContent = String(kpmValue);

    const blocks = document.getElementsByClassName('block');
    

    let topOrder = shuffledOrder.shift();
    blocks[topOrder].id = 'typedBlock';
    if (shuffledOrder.length === 0) {

        typeFinish(true);

    }
}


function typeFinish(isCompleted) {
            
    stopInterval();
    let typingArea = document.getElementById('typing_area');
    if (isCompleted) {

        typingArea.value = 'Press Enter!';
        window.removeEventListener('keydown', judgeKeys, false);
        window.addEventListener('keydown', brokeInputBox, true);
        function brokeInputBox (e) {
            e.preventDefault();
            if (e.key === 'Enter') {
                typingArea.id = 'typedBlock';
            };
        }

    } else {
        window.removeEventListener('keydown', judgeKeys, false);
        typingArea.value = 'Press Escape...';

    }

    makeTweet();

}


function makeTweet () {

    const tweetButton = document.getElementById('tweet');
    
    const t = String((30 - parseFloat(timer.textContent)).toFixed(1));

    const c = count.textContent;
    const k = kpm.textContent;
    const hashTags = "脱衣タイピング"
    //改行→ %0A
    const tweet = `LEVEL${choosingLevel} 脱衣成功❤%0A${c}keys in ${t} sec (${k}KPM)`;
    const url = 'https://datuityping.x.fc2.com/';
    const tweetText = `https://twitter.com/intent/tweet?ref_src=twsrc&text=${tweet}&hashtags=${hashTags}&url=${url}`;
    tweetButton.href = tweetText;
}