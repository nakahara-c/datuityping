export function createStats() {
    
    let cleared = JSON.parse(localStorage.getItem('cleared')).sort((a, b) => a - b);
    const div = document.createElement('div');
    const tableString = generateTable(10, 10);

    const data = JSON.parse(localStorage.getItem('results')) || [];
    let totalKeys = sumKeysCount(data);

    function sumKeysCount(data) {
        let sum = 0;
        for (let item of data) {
            sum += parseInt(item.keys ?? 0);
        }
        return sum;
    }

    div.innerHTML = `

    <div class="container">
        <div class="tile is-vertical">
            <div class="tile is-parent">
                <div class="tile is-child box" id="result">
                    <p class="has-text-centered title mt-4" style="opacity:0.7">成績</p>
                    <p class="has-text-centered mt-4">総打鍵数: <span id="totalTypedCount">${totalKeys}</span>打</p>
                    <canvas id="chart"></canvas>
                    <ul>
                        <li class="has-text-link has-background-link-light has-text-centered mt-4">
                        カーソルを当てるとレベルとタイムが表示されます。
                        </li>
                        <li class="has-text-danger has-background-danger-light has-text-centered mt-2 mb-4">
                        クリックするとその一つの記録が削除されます。
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tile is-parent">
                <div class="tile is-child box" id="unlockedImages">
                    <p class="has-text-centered title mt-4" style="opacity:0.7">解放した画像</p>
                    ${tableString}
                </div>
            </div>
        </div>

        <div class="modal" id="image-modal">
            <div class="modal-background"></div>
            <div class="modal-content">
                <p class="image is-2by3">
                    <img src="" alt="" id="modal-image">
                </p>
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
        </div>
    </div>


    
    `;

    setTimeout(() => {
        drawChart();
    }, 0);



    function drawChart() {
        const requiredKpm = [192, 300, 432, 588, 768];

        const ctx = document.getElementById('chart').getContext('2d');

        const labels = data.map((item, index) => `${index + 1}`);
        const chartData = data.map(item => parseInt(item.kpm));

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'KPM',
                    data: chartData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    pointStyle: 'none',
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointBorderColor: 'rgba(255, 99, 132, 1)',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    x: {}
                },
                plugins: {
                    tooltip: {
                        titleColor: 'rgba(0, 0, 0, 1)',
                        bodyColor: 'rgba(0, 0, 0, 1)',

                        backgroundColor: 'rgba(248, 236, 243, 1)',

                        displayColors: false,

                        callbacks: {
                            afterLabel: function (context) {
                                const index = context.dataIndex;
                                const level = data[index].level;
                                const time = data[index].time;
                                return `Level: ${level}\nTime: ${time}`;
                            }
                        }
                    },
                    annotation: {
                        annotations: requiredKpm.map(value => ({
                            type: 'line',
                            mode: 'horizontal',
                            scaleID: 'y',
                            value: value,
                            borderColor: 'rgba(0, 0, 230, 0.2)',
                            borderWidth: 1
                        }))
                    } 
                },
                onClick: function (event, elements) {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        data.splice(index, 1); // データから要素を削除

                        localStorage.setItem('results', JSON.stringify(data));

                        chart.destroy();
                        drawChart();
                    }
                }
            }
        });

    }

    function generateTable(rows, cols) {
        let table = '<table class="table is-bordered is-striped is-hoverable is-fullwidth">\n<tbody>\n';
        for (let i = 1; i <= rows; i++) {
            table += '<tr>\n';
            for (let j = 1; j <= cols; j++) {
                let tmp = (i - 1) * 10 + j;
                if (cleared.includes(tmp)) {
                    table += `<td><img src="img/${tmp}.png" alt="${tmp}" width="40" height="60" onclick="openImageModal(${tmp})"></td>\n`;
                } else {
                    table += `<td><img src="img/block3.png" alt="0" width="40" height="60"></td>\n`;
                }
            }
            table += '</tr>\n';
        }
        table += '</tbody>\n</table>';
        return table;
    }

    return div;

}

export function openImageModal(imageNumber) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');

    // 画像の元のサイズ
    const originalWidth = 512;
    const originalHeight = 768;

    // ウィンドウの縦幅に合わせるためのスケーリング係数を計算
    const windowHeight = window.innerHeight;
    const scaleFactor = windowHeight * 0.8 / originalHeight;

    // スケーリング係数に基づいて画像のサイズを調整
    modalImage.width = originalWidth * scaleFactor;
    modalImage.height = originalHeight * scaleFactor;

    modalImage.src = `img/${imageNumber}.png`;
    modal.classList.add('is-active');
}
