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
    <p class="has-text-centered title mt-2 mb-6" style="opacity:0.7">About</p>
    <ul>
        <li class="subtitle has-text-danger has-background-danger-light">
            成人向けコンテンツを含みます。18歳未満は閲覧禁止です。
        </li>
        <li class="subtitle has-text-link has-background-link-light">
            使用しているイラストはAI製です。
        </li>
    </ul>
    <hr>
    <li>レベルを選んでキーを押すと始まります。Escでやり直しができます。</li>
    <li>特定条件を満たす事でLEVEL EXが解放されます。</li>
    <details class="mt-2">
        <summary>ワードについて</summary>
        <p>ベースはタイプウェル英単語の基本英単語1500・国語Rの漢字です。</p>
        <p>英語では大文字や記号を含むものを取り除いています。(Mondayやo'clockなど)</p>
        <p>ローマ字では「ざ」を含むものを取り除いています。(「あざやか」など)</p>
    </details>
    <hr>
    <p class="mt-2 mb-1">難易度対応表（目安）</p>
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

    <hr>

    <p>23/5/16: タイマーの精度修正に伴っていくらか難しくなりました。すみません！</p>

    中原ここあ(<a href="https://twitter.com/tt_cocoan" target="_blank">@tt_cocoan</a>)

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