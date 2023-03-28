export function createAbout () {
    const div = document.createElement('div');
    div.innerHTML = `

    <div class="tile is-child box">
    <p class="subtitle mt-2 mb-6">About</p>
    <ul class="mb-6">
        <li class="subtitle has-text-danger has-background-danger-light">
            成人向けコンテンツを含みます。18歳未満は閲覧禁止です。
        </li>
        <br>
        <li class="subtitle has-text-link has-background-link-light">
            使用しているイラストはAI製です。
        </li>
        <br>
        <br>
        <p>レベルを選んでキーを押すと始まります。Escでやり直しができます。</p>

    </ul>

    <!--難易度対応表 table-->
    <p class="mb-1">難易度対応表（目安）</p>
    <table class="table is-bordered is-striped">
        <thead>
            <tr>
            <th>LEVEL</th>
            <th>ブロック数</th>
            <th>KPM</th>
            <th>TW英単語換算</th>
            </tr>
        </thead>
        <tbody>
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
                <td>294</td>
                <td>588</td>
                <td>XB</td>
            </tr>
            <tr>
                <td>5</td>
                <td>384</td>
                <td>768</td>
                <td>ZI</td>
            </tr>
        </tbody>
    </table>

    </div>
    `
    
    return div;

}