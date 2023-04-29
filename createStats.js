export function createStats () {
    //sort
    let cleared = JSON.parse(localStorage.getItem('cleared')).sort((a,b) => a-b);


    for (const key in cleared) {
        console.log(cleared[key]);
    }

    const div = document.createElement('div');

    const tableString = generateTable(10, 10);

    div.innerHTML = `

    <div>
        <canvas id="chart"></canvas>
    </div>

    <div>
        <p class="has-text-centered">解放した画像</p>
        ${tableString}
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
    
    `;

    setTimeout(() => {
        drawChart();
    }, 0);

    const data = JSON.parse(localStorage.getItem('results')) || [];

    function drawChart() {
        const ctx = document.getElementById('chart').getContext('2d');
        
        // データから labels および data 配列を作成
        const labels = data.map((item, index) => `Data ${index + 1}`);
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
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            // ツールチップに level の値を追加
                            afterLabel: function(context) {
                                const index = context.dataIndex;
                                const level = data[index].level;
                                return `Level: ${level}`;
                            }
                        }
                    }
                },
                onClick: function (event, elements) {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        data.splice(index, 1); // データから要素を削除
    
                        // localStorage のデータを更新
                        localStorage.setItem('results', JSON.stringify(data));
    
                        // チャートを再描画
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
                let tmp = (i-1)*10+j;
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
