export function createAbout() {

    let tbodyEN = `
        <tr>
            <td>1</td>
            <td>96</td>
            <td>192</td>
            <td>F</td>
        </tr>
        <tr>
            <td>2</td>
            <td>150</td>
            <td>300</td>
            <td>SJ</td>
        </tr>
        <tr>
            <td>3</td>
            <td>216</td>
            <td>432</td>
            <td>XI</td>
        </tr>
        <tr>
            <td>4</td>
            <td>300</td>
            <td>600</td>
            <td>XA</td>
        </tr>
        <tr>
            <td>5</td>
            <td>384</td>
            <td>768</td>
            <td>ZI</td>
        </tr>
    `;

    let tbodyJP = `
        <tr>
            <td>1</td>
            <td>150</td>
            <td>300</td>
            <td>A</td>
        </tr>
            <tr>
            <td>2</td>
            <td>216</td>
            <td>432</td>
            <td>SS</td>
        </tr>
            <tr>
            <td>3</td>
            <td>300</td>
            <td>600</td>
            <td>XC</td>
        </tr>
            <tr>
            <td>4</td>
            <td>384</td>
            <td>768</td>
            <td>XX</td>
        </tr>
        <tr>
            <td>5</td>
            <td>476</td>
            <td>952</td>
            <td>ZH</td>
        </tr>
    `;

    const div = document.createElement('div');
    div.innerHTML = `

    <div class="tile is-child box">
        <p class="has-text-centered title mt-2 mb-4" style="opacity:0.7">About</p>
        <li><span class="has-text-danger">成人向けコンテンツを含みます。18歳未満は閲覧禁止です。</span></li>
        <li>レベルを選んでキーを押すと始まります。<b>Esc</b>でやり直しができます。</li>
        <li>ギャラリーを<span class="has-text-danger">20枚解放</span>すると<span style="color:white; background-color:black;"> LEVEL EX </span>が解放されます。<span class="has-text-danger">40枚</span>で…？</li>
        <li>開始前にSpaceキーで♡を消費すると、イラストの抽選が優遇されます。</li>
        <details class="mt-2">
            <summary>難易度対応表（目安）</summary>
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
                    <th>TW換算</th>
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