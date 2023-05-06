'use strict';

import { createAbout } from './createAbout.js';
import { createStats, openImageModal } from './createStats.js';
import { wordList } from './wordList.js';
import { fetchImgID } from './fetchImgID.js';


const about = document.getElementById('about');
about.addEventListener('click', displayAbout);
displayAbout();

const stat = document.getElementById('stat');
stat.addEventListener('click', displayStats);

const mainContent = document.getElementById('main-content');

function displayAbout() {
    let d = document.getElementById('area');
    let div = createAbout();
    d.innerHTML = "";

    d.appendChild(div);
}

function displayStats() {
    let d = document.getElementById('area');
    let div = createStats();
    d.innerHTML = "";
    d.appendChild(div);
    

    setTimeout(() => {
        addModalListeners();
    }, 0);

}

function addModalListeners() {
    const closeModalButton = document.querySelector('#image-modal .modal-close');
    closeModalButton.addEventListener('click', () => {
        const modal = document.getElementById('image-modal');
        modal.classList.remove('is-active');
    });

    const modalBackground = document.querySelector('#image-modal .modal-background');
    modalBackground.addEventListener('click', () => {
        const modal = document.getElementById('image-modal');
        modal.classList.remove('is-active');
    });
}

window.openImageModal = openImageModal;

let timerArray = [];

const timer = document.getElementById('timer');
const count = document.getElementById('count');
const kpm = document.getElementById('kpm');

let typeText = "";
let order = [];
let shuffledOrder = [];
let choosingLevel = 1;
let chosenImgNumber = 0;

const contentList = document.getElementsByClassName('difficulty');

for (let i = 1; i < contentList.length; i++) {
    contentList[i].addEventListener('click', () => {

        let d = document.getElementById('area');

        d.innerHTML = '';
        timer.textContent = '';
        count.textContent = '';
        kpm.textContent = '';

        stopInterval();
        choosingLevel = i;
        createBlocks(i);

    });
}

window.addEventListener('keydown', judgeEscape, true);

function judgeEscape(e) {
    if (e.key === 'Escape') {
        contentList[choosingLevel].click();
    }
}

function firstKeyPressed() {
    timer.textContent = "30.0";
    count.textContent = "0";
    kpm.textContent = "0";

    timerArray.push(setInterval(startTimer, 100));
}

function startTimer() {
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

async function createBlocks(level) {



    const area = document.getElementById('area');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

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
            [w, xCount, yCount] = [50, 10, 15];
            break;
        case 5:
            [w, xCount, yCount] = [42, 12, 18];
            break;
    }

    const girls = document.createElement('img');

    let imgID = await fetchID(level);
    girls.src = `./img/${imgID}.png`;
    chosenImgNumber = imgID;

    console.log(imgID);

    const girlsAspectRatio = 512 / 768;
    const girlsHeightRatio = 0.75; // Change this to adjust the girls height relative to the window height

    girls.height = windowHeight * girlsHeightRatio;
    girls.width = girls.height * girlsAspectRatio;

    const container = document.getElementById('container');

    //container.style.height = girls.height + "px";

    let blockDOMs = [];
    if (level === 4 || level === 5) {

        for (let i = 0; i < yCount; i++) {
            for (let j = 0; j < xCount; j++) {
                let block = createImg("");

                block.style = `left:${j * (100 / xCount)}%;top:${girls.height * i / yCount}px`;
                blockDOMs.push(block);
            }
        }

        for (let i = 0; i < yCount; i++) {
            for (let j = 0; j < xCount; j++) {
                let block = createImg("2");

                block.style = `left:${j * (100 / xCount)}%;top:${girls.height * i / yCount}px`;
                blockDOMs.push(block);
            }
        }

    } else {

        for (let i = 0; i < yCount; i++) {
            for (let j = 0; j < xCount; j++) {
                let block = createImg("");

                block.style = `left:${j * (100 / xCount)}%;top:${girls.height * i / yCount}px`;
                blockDOMs.push(block);
            }
        }
    }

    adjustBlockPositions();

    setTimeout(() => {
        if (area.childElementCount === 1) {
            for (const b of blockDOMs) area.appendChild(b);
            area.appendChild(girls);
        }
    }, 300);

    function createImg(id) {
        const img = document.createElement('img');
        img.src = `./img/block${id}.png`;
        if (id === "") {
        img.className = `block is-overlay`;
        } else {
        img.className = `block block${id} is-overlay`;
        }
        let widthPercent = String(100 / xCount) + "%";
        let heightPercent = String(100 / yCount) + "%";
        img.setAttribute('width', widthPercent);
        img.setAttribute('height', heightPercent);
        return img;
    }




    function adjustBlockPositions() {

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        girls.height = windowHeight * girlsHeightRatio;
        girls.width = girls.height * girlsAspectRatio;

        const blockHeight = girls.height / yCount;
        const blockWidth = girls.width / xCount;

        for (let i = 0; i < yCount; i++) {
            for (let j = 0; j < xCount; j++) {
                let block = blockDOMs[i * xCount + j];
                block.style.left = (j * blockWidth) + 'px';
                block.style.top = (i * blockHeight) + 'px';
                block.style.width = blockWidth + 'px';
                block.style.height = blockHeight + 'px';
            }
        }
    }

    createInputBox(xCount * yCount);

    function createInputBox(cnt) {
        let div = document.createElement('div');
        div.id = 'type_area';
        div.className = 'is-overlay';
        div.style = `top:35vh`;

        let inputA = document.createElement('input');
        inputA.id = 'word_area';
        inputA.className = 'input is-danger is-large';
        inputA.type = 'text';

        let inputB = document.createElement('input');
        inputB.id = 'typing_area';
        inputB.className = 'input is-danger is-large';
        inputB.type = 'text';

        area.appendChild(div);
        let makedDiv = document.getElementById('type_area');
        //makedDiv.appendChild(inputA);
        makedDiv.appendChild(inputB);

        setWord(cnt, inputB);
    }

    function setWord(cnt, typingArea) {
        let shuffledWordList = fisherYatesShuffle(wordList);
        typeText = shuffledWordList.join(' ');

        typingArea.value = typeText.slice(0, cnt);
        order = [];
        shuffledOrder = [];
        if (level === 4 || level === 5) {
            let cnt2 = cnt * 2;
            for (let i = 0; i < cnt2; i++) order.push(i);
            shuffledOrder = reorder(fisherYatesShuffle(order));

            function reorder(array) {
                let result = [...array];
                for (let i = 0; i < array.length; i++) {
                    let a = array[i];
                    let b = (a + cnt) % cnt2;
                    let aIndex = i;
                    let bIndex = array.indexOf(b);
                    if (a < b && aIndex > bIndex) {
                        [result[aIndex], result[bIndex]] = [result[bIndex], result[aIndex]];
                    }
                }
                return result;
            }

        } else {
            for (let i = 0; i < cnt; i++) order.push(i);
            shuffledOrder = fisherYatesShuffle(order);
        }

        window.addEventListener('keydown', judgeKeys, false);

    }

    return imgID;
}

function fisherYatesShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
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

    let typingArea = document.getElementById('typing_area');
    typingArea?.classList.add('missed');
    setTimeout(() => {
        typingArea?.classList.remove('missed');
    }, 1000);

}

function deleteBlock() {
    let typedCount = Number(count.textContent);
    count.textContent = String(typedCount + 1);
    let elapsedTime = 30 - Number(timer.textContent);

    if (elapsedTime === 0) {
        kpm.textContent = "0";
    } else {
        let kpmValue = Math.round(typedCount / elapsedTime * 60);
        kpm.textContent = String(kpmValue);
    }

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
        function brokeInputBox(e) {
            e.preventDefault();
            if (e.key === 'Enter') {
                typingArea.id = 'typedBlock';
            };
        }

    } else {
        window.removeEventListener('keydown', judgeKeys, false);
        typingArea.value = 'Press Escape...';
        //KPMを再計算
        let typedCount = Number(count.textContent);
        let elapsedTime = 30;
        let kpmValue = Math.round(typedCount / elapsedTime * 60);
        kpm.textContent = String(kpmValue);

    }

    makeTweet();
    writeChosenImgNumber();
    writeResult();

}

async function fetchID(level) {
    const id = await fetchImgID(level);
    return id;
}

function writeChosenImgNumber() {
    let unlocked = JSON.parse(localStorage.getItem('unlocked'));
    if (unlocked === null) unlocked = [];
    if (!unlocked.includes(chosenImgNumber)) {
        unlocked.push(chosenImgNumber);
        localStorage.setItem('unlocked', JSON.stringify(unlocked));
    }
}

function writeResult() {
    let time = parseFloat(String(30.0 - Number(timer.textContent))).toFixed(1);
    let result = {
        'level': choosingLevel,
        'time': time,
        'kpm': kpm.textContent,
        'keys': count.textContent
    };
    let results = JSON.parse(localStorage.getItem('results'));
    if (results === null) results = [];
    results.push(result);
    localStorage.setItem('results', JSON.stringify(results));
}


function makeTweet() {
    const tweetButton = document.getElementById('tweet');
    const sec = String((30 - parseFloat(timer.textContent)).toFixed(1));
    const cnt = count.textContent;
    const KPM = kpm.textContent;
    const hashTags = "脱衣タイピング";
    const tweetText = `LEVEL${choosingLevel} 脱衣成功❤%0A${cnt}keys in ${sec} sec (${KPM}KPM)`;
    const url = 'https://datuityping.x.fc2.com/';
    const tweetURL = `https://twitter.com/intent/tweet?ref_src=twsrc&text=${tweetText}&hashtags=${hashTags}&url=${url}`;
    tweetButton.href = tweetURL;
}

