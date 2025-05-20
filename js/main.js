/*** 
 * Copyright (c) 2021 Whitefox
 * This code is part of RomanTypeParser and is released under the MIT License.
 * https://github.com/WhiteFox-Lugh/RomanTypeParser/blob/main/LICENSE
***/


'use strict';

import { parser } from './parser.js';

import { createAbout } from './createAbout.js';
import { createStats, openImageModal } from './createStats.js';
import { wordList, wordListExtra, wordListJapanese } from './wordList.js';
import { fetchImgID } from './fetchImgID.js';
import { displaySecret } from './secret.js';

const area = document.getElementById('area');
const contentList = document.getElementsByClassName('difficulty');
const timer = document.getElementById('timer');
const count = document.getElementById('count');
const kpm = document.getElementById('kpm');
const dataBox = document.getElementById('dataBox');
let unlockedCount = 0;

const countHeart = (num) => {
    if (num == undefined) return '0';
    const cnt = Math.floor(Number(num) / 500) ?? 0;
    if (cnt >= 4) return 'MAX';
    return String(cnt);
}

const heartCount = document.getElementById('heartCount');
const heartPower = document.getElementById('heartPower');
heartCount.textContent = countHeart(localStorage.getItem('heartPower'));
heartPower.textContent = localStorage.getItem('heartPower') ?? 0;

const aboutLinks = document.querySelectorAll('.about');
aboutLinks.forEach(link => {
    link.addEventListener('click', displayAbout);
});

displayAbout();

const stat = document.getElementById('stat');
stat.addEventListener('click', displayStats);
displayEx();

renderUnlockedCount();

let ta;
const fontSize = document.getElementById('fontSize');
fontSize.addEventListener('change', () => {
    ta = document.getElementById('typing_area') ?? undefined;
    if (ta !== undefined) {
        if (fontSize.value === '0') {
            ta.style.fontSize = '1.5em';
        } else if (fontSize.value === '1') {
            ta.style.fontSize = '2em';
        } else if (fontSize.value === '2') {
            ta.style.fontSize = '2.5em';
        }
    }
});

const seasonSelect = document.getElementById('seasonSelect');
seasonSelect.addEventListener('change', () => {
    const season = seasonSelect.value;
    const season1 = document.getElementById('levelButtons-1');
    const season2 = document.getElementById('levelButtons-2');

    if (season === '1') {
        season1.style.display = 'block';
        season2.style.display = 'none';
    } else if (season === '2') {
        season1.style.display = 'none';
        season2.style.display = 'block';
    }
});

window.openImageModal = openImageModal;

const doublingLevel = [4, 5, 6, 7, 11, 12, 13];

let timerArray = [];
let typeText = '';
let japaneseWord;
let order = [];
let shuffledOrder = [];
let choosingLevel = 0;
let chosenImgNumber = 0;
let currentImgID = '';
let originalImg;
let isFreePlaying = false;

let startTime;
let intervalId;

let isEnglish = true;
document.getElementById('english').addEventListener('click', () => {
    isEnglish = true;
    initializeDataBox();
    contentList[choosingLevel].click();
});
document.getElementById('japanese').addEventListener('click', () => {
    isEnglish = false;
    initializeDataBox();
    contentList[choosingLevel].click();
});

for (let i = 1; i < contentList.length; i++) {
    contentList[i].addEventListener('click', () => {
        isFreePlaying = false;
        initializeDataBox();

        for (let j = 1; j < contentList.length; j++) {
            contentList[j].classList.remove('activeLevel');
        }
        contentList[i].classList.add('activeLevel');

        adjustDataBox();

        clearInterval(intervalId);
        choosingLevel = i;
        createBlocks(i, false, false);

    });
}

window.addEventListener('keydown', judgeEscape, true);

function judgeEscape(e) {
    if (e.key === 'Escape') {
        if (timerArray.length !== 0) addTypeCount();
        if (isFreePlaying) {
            freePlayStart();
        } else {
            contentList[choosingLevel].click();
        }
    }
}

function renderUnlockedCount() {
    const unlockedArray = JSON.parse(localStorage.getItem('unlocked') ?? '[]');
    const unlocked = new Object();
    unlockedArray.forEach(pair => {
        if (pair[0] !== 0) unlocked[pair[0]] = pair[1];
    });
    unlockedCount = String(Object.keys(unlocked).length);
    document.getElementById('unlockedCount').textContent = unlockedCount;
}

function firstKeyPressed() {
    timer.textContent = '30.0';
    count.textContent = '0';
    kpm.textContent = '0';

    startTime = performance.now();
    intervalId = setInterval(startTimer, 100);
}

function startTimer() {
    let elapsedTime = (performance.now() - startTime) / 1000;
    let remaining = 30.0 - elapsedTime;
    timer.textContent = remaining.toFixed(1);

    if (remaining <= 0) {
        clearInterval(intervalId);
        timer.textContent = '0.0';
        typeFinish(false);
    }
}

function adjustDataBox() {
    if (isInViewport(dataBox)) {
        dataBox.classList.remove('fixed');
    } else {
        dataBox.classList.add('fixed');
    }
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
    );
}

async function createBlocks(level, isPowerUsed, isFreePlay) {

    if (level === 7) {
        if (isFreePlaying) {
            
        } else {
            freePlay();
        }
        return;
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let w = 0;
    let xCount = 0;
    let yCount = 0;
    let lv;
    if (isPowerUsed) {
        lv = isEnglish ? choosingLevel : choosingLevel + 1;
        if (choosingLevel === 5 && !isEnglish) lv = 7;
    } else {
        lv = isEnglish ? level : level + 1;
        if (level === 5 && !isEnglish) lv = 7;
    }
    switch (lv) {
        //season 1
        case 1:
            [w, xCount, yCount] = [62.5, 6, 9];
            break;
        case 2:
            [w, xCount, yCount] = [50, 8, 12];
            break;
        case 3:
            [w, xCount, yCount] = [42, 10, 15];
            break;
        case 4:
            [w, xCount, yCount] = [50, 8, 12];
            break;
        case 5:
            [w, xCount, yCount] = [42, 10, 15];
            break;
        case 6:
            [w, xCount, yCount] = [42, 10, 15];
            break;
        case 7:
            [w, xCount, yCount] = [42, 12, 18];
            break;
        //season 2
        case 8:
            [w, xCount, yCount] = [85.5, 9, 12];
            break;
        case 9:
            [w, xCount, yCount] = [64, 12, 16];
            break;
        case 10:
            [w, xCount, yCount] = [51.5, 15, 20];
            break;
        case 11:
            [w, xCount, yCount] = [64, 12, 16];
            break;
        case 12:
            [w, xCount, yCount] = [51.5, 15, 20];
            break;
        case 13:
            [w, xCount, yCount] = [51.5, 15, 20];
            break;
    }

    const girls = document.createElement('img');
    let imgID;

    if (isFreePlay) {
        const reader = new FileReader();
        reader.onload = function () {
            girls.src = reader.result;
        }
        reader.readAsDataURL(originalImg);
        chosenImgNumber = 0;
        currentImgID = 'original';
    } else {
        try {
            imgID = await fetchID(level);
        } catch (e) {
            console.error('Error:', e);
        }

        girls.src = `./img/${imgID.imgID}.png`;
        chosenImgNumber = imgID.randomValue;
        currentImgID = imgID.imgID;
    }

    let girlsAspectRatio;
    const girlsHeightRatio = 0.75;
    if (lv >= 0 && lv <= 7) {
        girlsAspectRatio = 512 / 768;
    } else if (lv >= 8 && lv <= 13) {
        girlsAspectRatio = 768 / 1024;
    }

    girls.height = windowHeight * girlsHeightRatio;
    girls.width = girls.height * girlsAspectRatio;

    let blockDOMs = [];
    // 二重にかさねる
    if (doublingLevel.includes(lv)) {

        for (let i = 0; i < yCount; i++) {
            for (let j = 0; j < xCount; j++) {
                let block = createImg('');

                block.style = `left:${j * (100 / xCount)}%;top:${girls.height * i / yCount}px`;
                blockDOMs.push(block);
            }
        }

        for (let i = 0; i < yCount; i++) {
            for (let j = 0; j < xCount; j++) {
                if (lv === 5) {
                    if (i < 2 || i > 15) continue; //1-2行目と14-15行目は灰ブロックを置かない
                }
                if (lv === 7) {
                    if (i < 4 || i > 16) continue; //1-4行目と17-21行目は灰ブロックを置かない
                }
                if (lv === 12) {
                    if (i < 4 || i > 17) continue; //1-4行目と18-20行目は灰ブロックを置かない
                }
                let block = createImg('2');

                block.style = `left:${j * (100 / xCount)}%;top:${girls.height * i / yCount}px`;
                blockDOMs.push(block);
            }
        }

    } else {

        for (let i = 0; i < yCount; i++) {
            for (let j = 0; j < xCount; j++) {
                let block = createImg('');

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

    createInputBox(isPowerUsed);


    function createImg(id) {
        const img = document.createElement('img');
        img.src = `./img/block${id}.png`;
        if (id === '') {
            img.className = `block is-overlay`;
        } else {
            img.className = `block block${id} is-overlay`;
        }
        let widthPercent = String(100 / xCount) + '%';
        let heightPercent = String(100 / yCount) + '%';
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

    function createInputBox(isPowerUsed) {
        let div = document.createElement('div');
        div.id = 'type_area';
        div.className = 'is-overlay';
        div.style = `top:35vh`;

        let input = document.createElement('input');
        input.id = 'typing_area';
        input.className = 'input is-danger is-large';
        let fs = '1.5em';
        if (fontSize.value === '1') fs = '2em';
        else if (fontSize.value === '2') fs = '2.5em';
        input.style.fontSize = fs;
        input.type = 'text';
        if (isPowerUsed) input.classList.add('heart-powered');

        area.appendChild(div);
        let makedDiv = document.getElementById('type_area');
        setTimeout(() => {
            makedDiv.appendChild(input);
        }, 300);


        if (choosingLevel !== 6 && isEnglish) {
            setWordEnglish(input);
        } else {
            setWordJapanese(input);
        }
    }

    function setWordEnglish(typingArea) {
        const blocksCount = blockDOMs.length;

        let shuffledWordList;
        shuffledWordList = fisherYatesShuffle(wordList);
        typeText = shuffledWordList.join(' ');
        typingArea.value = typeText.slice(0, blocksCount);
        
        order = [];
        shuffledOrder = [];

        for (let i = 0; i < blocksCount; i++) order.push(i);
        if (doublingLevel.includes(choosingLevel)) {
            shuffledOrder = reorder(fisherYatesShuffle(order), blocksCount / 2);
        } else {
            shuffledOrder = fisherYatesShuffle(order);
        }
        window.addEventListener('keydown', judgeKeys, false);

        return;
    }

    function setWordJapanese(typingArea) {
        const blocksCount = blockDOMs.length;

        let tmpLis = new Array();
        let wLis = (choosingLevel === 6) ? wordListExtra : wordListJapanese;        
        for (let i = 0; i < 400; i++) {
            let word = wLis[Math.floor(Math.random() * wLis.length)];
            tmpLis.push(word);
        }
        let txt = tmpLis.join(' ');

        order = [];
        shuffledOrder = [];

        for (let i = 0; i < blocksCount; i++) order.push(i);
        if (doublingLevel.includes(lv)) {
            shuffledOrder = reorder(fisherYatesShuffle(order), blocksCount / 2);
        } else {
            shuffledOrder = fisherYatesShuffle(order);
        }

        (async () => japaneseWord = await parser(txt))();

        txt = txt.replaceAll(' ', '　');
        typeText = txt;
        typingArea.value = txt;

        window.addEventListener('keydown', judgeKeys, false);

        return;
    }

    function setWordAllKey(typingArea) {
        const blocksCount = blockDOMs.length;

        // すべてのキーボードのキーを使う
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"#$%&()-=^~\@`[{;+:*]},<.>/?' + "'";
        let txt = '';
        for (let i = 0; i < 400; i++) {
            txt += chars[Math.floor(Math.random() * chars.length)];
        }
        typeText = txt;
        typingArea.value = txt;

        order = [];
        shuffledOrder = [];

        for (let i = 0; i < blocksCount; i++) order.push(i);
        if (doublingLevel.includes(lv)) {
            shuffledOrder = reorder(fisherYatesShuffle(order), blocksCount / 2);
        } else {
            shuffledOrder = fisherYatesShuffle(order);
        }
        window.addEventListener('keydown', judgeKeys, false);

        return;
    }
    return imgID;
}

function reorder(array, cnt) {
    let result = [...array];
    let cnt2 = cnt * 2;
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
    if (isEnglish && (choosingLevel !== 6)) {

        let nextKey = typeText[0];

        if (typedKey === nextKey) {
            if (timer.textContent === '') {
                firstKeyPressed();
            }
            correctType(typedKey);
        } else {
            if (timer.textContent === '' && typedKey === ' ' && isFreePlaying === false) {
                useHeartPower(Number(localStorage.getItem('heartPower')));
            } else {
                incorrectType(typedKey);
            }
        }

    //にほんご用の入力うけつけ処理
    } else {

        //judgeAutomaton受け取ってそれに応じて判定していく
        /*
        japaneseWord.parsedSentence -> ['た'], ['ぷ'],...
        japaneseWord.judgeAutomaton -> ['ta'], ['pu'],...
        */

        let currentHiraganaLength = japaneseWord.parsedSentence[0].length;
        let currentRoman = japaneseWord.judgeAutomaton[0];

        let isOK = false;
        let isLast = false;
        for (let i = 0; i < currentRoman.length; i++) {
            if (typedKey === currentRoman[i][0]) {
                isOK = true;
                if (currentRoman[i].length === 1) {
                    isLast = true;
                } else {
                    currentRoman[i] = currentRoman[i].slice(currentHiraganaLength);
                }
            }
        }

        if (isOK) {
            if (timer.textContent === '') firstKeyPressed();
            if (isLast) {
                japaneseWord.parsedSentence.shift();
                japaneseWord.judgeAutomaton.shift();

                typeText = typeText.slice(currentHiraganaLength);
                let typingArea = document.getElementById('typing_area');
                typingArea.value = typeText;
            }
            deleteBlock();
        } else {
            if (timer.textContent === '' && typedKey === ' ') {
                useHeartPower(Number(localStorage.getItem('heartPower')));
            }
        }
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
        kpm.textContent = '0';
    } else {
        let kpmValue = Math.round(typedCount / elapsedTime * 60);
        kpm.textContent = String(kpmValue);
    }

    const blocks = document.getElementsByClassName('block');
    let topOrder = shuffledOrder.shift();
    blocks[topOrder].classList.add('typedBlock');

    const heartPowerValue = Number(localStorage.getItem('heartPower')) ?? 0;
    if (heartPowerValue < 2000) {
        localStorage.setItem('heartPower', String(Number(heartPowerValue) + 1));
        heartCount.textContent = countHeart(Number(heartPowerValue) + 1);
        heartPower.textContent = String(Number(heartPowerValue) + 1);
    }

    if (shuffledOrder.length === 0) {
        typeFinish(true);
    }

}

function typeFinish(isCompleted) {
    clearInterval(intervalId);
    let typingArea = document.getElementById('typing_area');
    if (isCompleted) {
        typingArea.value = 'Press Enter!';
        window.removeEventListener('keydown', judgeKeys, false);
        window.addEventListener('keydown', brokeInputBox, true);
        function brokeInputBox(e) {
            e.preventDefault();
            if (e.key === 'Enter') {
                typingArea.classList.add('typedBlock');
                window.removeEventListener('keydown', brokeInputBox, true);
            };
        }
        writeChosenImgNumber();

    } else {
        window.removeEventListener('keydown', judgeKeys, false);
        typingArea.value = 'Press Escape...';
        //KPMを再計算
        let typedCount = Number(count.textContent);
        let elapsedTime = 30;
        let kpmValue = Math.round(typedCount / elapsedTime * 60);
        kpm.textContent = String(kpmValue);

    }

    makeTweet(isCompleted);
    writeResult(isCompleted);
    addTypeCount();
    renderUnlockedCount();

}

async function fetchID(level) {
    let loader = document.createElement('div');
    loader.classList.add('loader');
    loader.style.display = 'block';
    loader.style = 'top:30vh;';
    area.appendChild(loader);

    const id = await fetchImgID(level, unlockedCount);
    loader.remove();
    return id;
}

function writeChosenImgNumber() {
    let unlocked = JSON.parse(localStorage.getItem('unlocked'));
    if (unlocked === null) unlocked = [];

    let isInclude = unlocked.some(el => el[0] === chosenImgNumber && el[1] === currentImgID);

    if (!isInclude) {
        unlocked.push([chosenImgNumber, currentImgID]);
        localStorage.setItem('unlocked', JSON.stringify(unlocked));
    }

    displayEx();
}

function writeResult(isCompleted) {
    let time = isCompleted ? parseFloat(String(30.0 - Number(timer.textContent))).toFixed(1) : '30.0';
    let result = {
        'level': choosingLevel % 7,
        'time': time,
        'kpm': kpm.textContent,
        'keys': count.textContent
    };
    let resultKey = (isEnglish) ? 'resultsEN' : 'resultsJP';
    if (choosingLevel === 6) resultKey = 'resultsEX';
    let results = JSON.parse(localStorage.getItem(resultKey));
    if (results === null) results = [];
    results.push(result);
    localStorage.setItem(resultKey, JSON.stringify(results));
    
    return;
}

function addTypeCount() {
    let currentTypedCount = localStorage.getItem('typedCount') ?? 0;
    let typedCount = Number(count.textContent);
    localStorage.setItem('typedCount', String(Number(currentTypedCount) + typedCount));

    return;
}

function displayAbout() {
    let div = createAbout();
    area.innerHTML = '';
    for (let j = 1; j < contentList.length; j++) {
        contentList[j].classList.remove('activeLevel');
    }

    area.appendChild(div);
}

function displayStats() {
    let div = createStats(isEnglish);
    area.innerHTML = '';
    for (let j = 1; j < contentList.length; j++) {
        contentList[j].classList.remove('activeLevel');
    }
    area.appendChild(div);

    setTimeout(() => {
        addModalListeners();
    }, 0);
}

function freePlay() {
    let div = createFreePlayDom();
    area.innerHTML = '';
    area.appendChild(div);
    const freePlayButton = document.getElementById('freePlayButton');
    freePlayButton.addEventListener('click', freePlayStart);
}

function createFreePlayDom() {
    let div = document.createElement('div');
    div.innerHTML = `
        <input type="radio" id="freeLevel1" name="freeLevel" value="1" checked>
        <label for="freeLevel1">LEVEL1</label>
        <input type="radio" id="freeLevel2" name="freeLevel" value="2">
        <label for="freeLevel2">LEVEL2</label>
        <input type="radio" id="freeLevel3" name="freeLevel" value="3">
        <label for="freeLevel3">LEVEL3</label>
        <input type="radio" id="freeLevel4" name="freeLevel" value="4">
        <label for="freeLevel4">LEVEL4</label>
        <input type="radio" id="freeLevel5" name="freeLevel" value="5">
        <label for="freeLevel5">LEVEL5</label><br>
        <input type="file" id="originalImg" accept="image/*">
        <button id="freePlayButton" class="button is-primary">START</button>
    `;
    div.id = 'freePlay';
    return div;
}

function freePlayStart() {
    const lv = Number(document.querySelector('input[name="freeLevel"]:checked')?.value ?? choosingLevel);
    if (originalImg === undefined) {
        originalImg = document.getElementById('originalImg').files[0];
    }
    if (originalImg === undefined) return;
    area.innerHTML = '';
    choosingLevel = lv;
    isFreePlaying = true;

    initializeDataBox();
    adjustDataBox();
    clearInterval(intervalId);

    createBlocks(lv, false, true);
}

function displayEx() {
    if (localStorage.getItem('unlocked') !== null) {
        const unlockedCount = JSON.parse(localStorage.getItem('unlocked')).length;
        const ex = document.getElementById('ex');
        if (unlockedCount >= 20) ex.hidden = false;
        if (unlockedCount >= 40) displaySecret();
    }
}

function useHeartPower(currentPower) {
    let additionalTier = 0;
    const num = choosingLevel >= 8 ? choosingLevel - 7 : choosingLevel;
    for (let i = 0; i < 5 - num; i++) {
        if (currentPower >= 500 * (i + 1)) additionalTier++;
    }
    if (additionalTier > 0) {
        const expiredPower = currentPower - 500 * additionalTier;
        localStorage.setItem('heartPower', String(expiredPower));
        heartCount.textContent = countHeart(expiredPower);
        heartPower.textContent = String(expiredPower);

        initializeDataBox();
        adjustDataBox();
        clearInterval(intervalId);
        createBlocks(choosingLevel + additionalTier, true, false);
    }
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

function initializeDataBox () {
    area.innerHTML = '';
    timer.textContent = '';
    count.textContent = '';
    kpm.textContent = '';
    return;
}

function makeTweet(isCompleted) {
    const tweetButton = document.getElementById('tweet');
    const sec = String((30 - parseFloat(timer.textContent)).toFixed(1));
    const cnt = count.textContent;
    const KPM = kpm.textContent;
    const ENorJP = isEnglish ? '英語' : 'ローマ字';
    const hashTags = '脱衣タイピング';
    let tweetText = '';
    let levelText = '';
    if (choosingLevel <= 5) {
        levelText = `LEVEL${choosingLevel} [Season1]`;
    } else if (choosingLevel === 6) {
        levelText = 'LEVELEX (Season1)';
    } else if (choosingLevel >= 7 && choosingLevel <= 12) {
        levelText = `LEVEL${choosingLevel - 6} [Season2]`;
    }
    if (isCompleted) {
        tweetText = `${levelText}(${ENorJP}) 脱衣成功❤${cnt}打/${sec}秒(${KPM}KPM)`;
    } else {
        tweetText = `${levelText}(${ENorJP}) 脱衣失敗...${cnt}打/30.0秒(${KPM}KPM)`;

    }
    const url = 'https://nkhr-c.com/datuityping/';
    const tweetURL = `https://twitter.com/intent/tweet?ref_src=twsrc&text=${tweetText}&hashtags=${hashTags}&url=${url}`;
    tweetButton.href = tweetURL;
}

