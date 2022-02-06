
const beginningTiles = ['tile1', 'tile7', 'tile13', 'tile19', 'tile25', 'tile31'];
const endingTiles = ['tile6', 'tile12', 'tile18', 'tile24', 'tile30', 'tile36'];

var currentTile = $('#tile1');

$(".key").click(function () {
    var key = this.innerHTML;
    currentTile.text(key);
    incrimentTile();
});

$("#submit").click(function () {
    //#region mo.js
    const itemDim = this.getBoundingClientRect(),
        itemSize = {
            x: itemDim.right - itemDim.left,
            y: itemDim.bottom - itemDim.top,
        },
        shapes = ['line'],
        colors = ['#2FB5F3',
            '#FF0A47',
            '#FF0AC2',
            '#47FF0A'];

    const chosenC = Math.floor(Math.random() * colors.length),
        chosenS = Math.floor(Math.random() * shapes.length);

    // create shape
    const burst = new mojs.Burst({
        left: itemDim.left + (itemSize.x / 2),
        top: itemDim.top + (itemSize.y / 2),
        radiusX: itemSize.x,
        radiusY: itemSize.y,
        count: 8,

        children: {
            shape: shapes[chosenS],
            radius: 10,
            scale: { 0.8: 1 },
            fill: 'none',
            points: 7,
            stroke: colors[chosenC],
            strokeDasharray: '100%',
            strokeDashoffset: { '-100%': '100%' },
            duration: 350,
            delay: 100,
            easing: 'quad.out',
            isShowEnd: false,
        }
    });
    //#endregion

    burst.play();
});

$("#delete").click(function () {
    //#region mo.js
    const itemDim = this.getBoundingClientRect(),
        itemSize = {
            x: itemDim.right - itemDim.left,
            y: itemDim.bottom - itemDim.top,
        },
        shapes = ['cross'],
        colors = ['#2FB5F3',
            '#FF0A47',
            '#FF0AC2',
            '#47FF0A'];

    const chosenC = Math.floor(Math.random() * colors.length),
        chosenS = Math.floor(Math.random() * shapes.length);

    // create shape
    const burst = new mojs.Burst({
        left: itemDim.left + (itemSize.x / 2),
        top: itemDim.top + (itemSize.y / 2),
        radiusX: itemSize.x,
        radiusY: itemSize.y,
        count: 8,

        children: {
            shape: shapes[chosenS],
            radius: 10,
            scale: { 0.8: 1 },
            fill: 'none',
            points: 7,
            stroke: colors[chosenC],
            strokeDasharray: '100%',
            strokeDashoffset: { '-100%': '100%' },
            duration: 350,
            delay: 100,
            easing: 'quad.out',
            isShowEnd: false,
        }
    });
    //#endregion

    decrementTile();
    currentTile.text('');
    if (jQuery.inArray(currentTile.attr('id'), beginningTiles) != -1) {
        // found in beginning tiles
        currentTile.append('<placeholder class="tile-placeholder">A</placeholder>')
    } 
    burst.play();
});

// Helper Functions

function incrimentTile() {
    var tile = parseInt(currentTile.attr('id').substring(4));
    tile++;
    currentTile = $('#tile' + tile);
}

function decrementTile() {
    if (jQuery.inArray(currentTile.attr('id'), beginningTiles) != -1)
        return;
    var tile = parseInt(currentTile.attr('id').substring(4));
    tile--;
    currentTile = $('#tile' + tile);
}