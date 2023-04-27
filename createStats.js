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
