export function createAbout() {

    let tbodyEN = `
        <tr>
            <td>S1-1</td>
            <td><s>96</s> 50</td>
            <td><s>192</s> 100</td>
        </tr>
        <tr>
            <td>S1-2</td>
            <td><s>150</s> 96</td>
            <td><s>300</s> 150</td>
        </tr>
        <tr>
            <td>S1-3</td>
            <td><s>216</s> 150</td>
            <td><s>432</s> 300</td>
        </tr>
        <tr>
            <td>S1-4</td>
            <td><s>300</s> 216</td>
            <td><s>600</s> 432</td>
        </tr>
        <tr>
            <td>S1-5</td>
            <td><s>384</s> 280</td>
            <td><s>768</s> 560</td>
        </tr>
        <tr>
            <td>S2-1</td>
            <td>108</td>
            <td>216</td>
        </tr>
        <tr>
            <td>S2-2</td>
            <td>192</td>
            <td>384</td>
        </tr>
        <tr>
            <td>S2-3</td>
            <td>300</td>
            <td>600</td>
        </tr>
        <tr>
            <td>S2-4</td>
            <td>384</td>
            <td>768</td>
        </tr>
        <tr>
            <td>S2-5</td>
            <td>510</td>
            <td>1020</td>
        </tr>
    `;

    let tbodyJP = `
        <tr>
            <td>S1-1</td>
            <td><s>150</s> 96</td>
            <td><s>300</s> 150</td>
        </tr>
        <tr>
            <td>S1-2</td>
            <td><s>216</s> 150</td>
            <td><s>432</s> 300</td>
        </tr>
        <tr>
            <td>S1-3</td>
            <td><s>300</s> 216</td>
            <td><s>600</s> 432</td>
        </tr>
            <tr>
            <td>S1-4</td>
            <td><s>384</s> 280</td>
            <td><s>768</s> 560</td>
        </tr>
        <tr>
            <td>S1-5</td>
            <td><s>476</s> 372</td>
            <td><s>952</s> 744</td>
        </tr>
        <tr>
            <td>S1-EX</td>
            <td><s>432</s> 300</td>
            <td><s>864</s> 600</td>
        <tr>
            <td>S2-1</td>
            <td>192</td>
            <td>384</td>
        </tr>
        <tr>
            <td>S2-2</td>
            <td>300</td>
            <td>600</td>
        </tr>
        <tr>
            <td>S2-3</td>
            <td>384</td>
            <td>768</td>
        </tr>
        <tr>
            <td>S2-4</td>
            <td>510</td>
            <td>1020</td>
        </tr>
        <tr>
            <td>S2-5</td>
            <td>600</td>
            <td>1200</td>
        </tr>
    `;

    const div = document.createElement('div');
    div.innerHTML = `

    <div class="tile is-child box">
        <p class="has-text-centered title mt-2 mb-4" style="opacity:0.7">About</p>
        <li><span class="has-text-danger">成人向けコンテンツを含みます。18歳未満は閲覧禁止です。</span></li>
        <li>レベルを選んでキーを押すと始まります。<b>Esc</b>でやり直しができます。</li>
        <li>ギャラリーを<span class="has-text-danger">20枚解放</span>すると<span style="color:white; background-color:black;"> LEVEL EX </span>が解放されます。<span class="has-text-danger">40枚</span>で…？</li>
        <li>LEVEL5未満の開始前にSpaceキーを押すと、♡を消費してイラストの抽選が<span class="has-text-danger">優遇</span>されます。</li>
        <details class="mt-2">
            <summary>難易度対応表</summary>
            <div class="tabs">
                <ul>
                    <li id="diffEN" class="is-active"><a>英語</a></li>
                    <li id="diffJP"><a>ローマ字</a></li>
                </ul>
            </div>
            <table class="table is-bordered is-striped">
                <thead>
                    <tr>
                    <th>LEVEL</th>
                    <th>ブロック数</th>
                    <th>KPM</th>
                    </tr>
                </thead>
                <tbody id="diff">
                    ${tbodyEN}
                </tbody>
            </table>
        </details>
        <details class="mt-2">
            <summary>ワードについて</summary>
            <p>ベースはタイプウェル英単語の基本英単語1500・国語Rの漢字です。</p>
            <p>英語では大文字や記号を含むものを取り除いています。(Mondayやo'clockなど)</p>
            <p>ローマ字では「ざ」を含むものを取り除いています。(「座禅」など)</p>
        </details>

        <hr>
        <div class="has-text-centered">
            <picture>
                <source srcset="./img/datui_sample.webp" type="image/webp">
                <img src="./img/datui_sample.png" alt="">
            </picture>
        </div>
    </div>
    `;

    const tbody = div.querySelector('#diff');

    div.querySelector('#diffEN').addEventListener('click', () => {
        div.querySelector('#diffEN').classList.add('is-active');
        div.querySelector('#diffJP').classList.remove('is-active');
        tbody.innerHTML = tbodyEN;
    });
    div.querySelector('#diffJP').addEventListener('click', () => {
        div.querySelector('#diffJP').classList.add('is-active');
        div.querySelector('#diffEN').classList.remove('is-active');
        tbody.innerHTML = tbodyJP;
    });



    return div;

}