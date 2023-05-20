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
                    This content contains adult material.<br>
                    It is prohibited for individuals under 18 to view it.
                </li>
                <li class="subtitle has-text-link has-background-link-light">
                    The illustrations used are produced by AI.
                </li>
            </ul>
            <hr>
            <li>Choose a level, the game begins when you press a correct key.</li>
            <li>You can restart with the Escape key.</li>

            <p class="mt-2">Words are based on the words used in the "TypeWell".</p>

            <hr>
            <p class="mt-2 mb-1">Here is the difficulty level correspondence table.</p>

            <table class="table is-bordered is-striped has-text-centered">
                <thead>
                    <tr>
                        <th>LEVEL</th>
                        <th>Count</th>
                        <th>KPM(keys/minute)</th>

                    </tr>
                </thead>
                <tbody id="diff">

                    <tr>
                        <td>1</td>
                        <td>96</td>
                        <td>192</td>

                    </tr>
                    <tr>
                        <td>2</td>
                        <td>150</td>
                        <td>300</td>

                    </tr>
                    <tr>
                        <td>3</td>
                        <td>216</td>
                        <td>432</td>

                    </tr>
                    <tr>
                        <td>4</td>
                        <td>300</td>
                        <td>600</td>

                    </tr>
                    <tr>
                        <td>5</td>
                        <td>384</td>
                        <td>768</td>

                    </tr>

                </tbody>
            </table>

            <hr>

            Nakahara Cocoa(<a href="https://twitter.com/tt_cocoan" target="_blank">@tt_cocoan</a>)

        </div>
    `;

    return div;

}