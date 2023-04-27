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
    
    
    `;

    function generateTable(rows, cols) {
        let table = '<table class="table is-bordered is-striped is-hoverable is-fullwidth">\n<tbody>\n';
        for (let i = 1; i <= rows; i++) {
            table += '<tr>\n';
            for (let j = 1; j <= cols; j++) {
                table += `<td>${i},${j}</td>\n`;
            }
            table += '</tr>\n';
        }
        table += '</tbody>\n</table>';
        return table;
    }

    return div;

}