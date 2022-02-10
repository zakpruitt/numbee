
const beginningTiles = ['tile1', 'tile7', 'tile13', 'tile19', 'tile25', 'tile31'];
const endingTiles = ['tile6', 'tile12', 'tile18', 'tile24', 'tile30', 'tile36'];

var currentTile = $('#tile1');
var currentLine = 1;
var word = "";
var words = "";

$(document).ready(function () {
    console.log("ready!");
    fetch('http://127.0.0.1:5000/word')
        .then(response => response.json())
        .then(data => word = data);
    fetch('http://127.0.0.1:5000/words')
        .then(response => response.json())
        .then(data => words = data);
});

$(".key").click(function () {
    if (jQuery.inArray(currentTile.attr('id'), endingTiles) != -1 && currentTile.text() != "") {
        return;
    }
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

    if (jQuery.inArray(currentTile.attr('id'), endingTiles) != -1 && currentTile.text() != "") {
        guess = buildWordFromTiles();
        if (words.some(item => item === guess)) {
            // start flipping
            alert('valid')
            // go to next line
            switch (currentTile.attr('id')) {
                case 'tile6':
                    currentTile = $('#tile7');
                    currentLine += 1;
                    break;
                case 'tile12':
                    currentTile = $('#tile13');
                    currentLine += 1;
                    break;
                case 'tile18':
                    currentTile = $('#tile19');
                    currentLine += 1;
                    break;
                case 'tile24':
                    currentTile = $('#tile25');
                    currentLine += 1;
                    break;
                case 'tile30':
                    currentTile = $('#tile31');
                    currentLine += 1;
                    break;
                case 'tile36':
                    // end game
                    break;
            }
        } else {
            // invalid word
            alert("invalid word");
        }
    } else {
        alert("not complete");
    }
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

    currentTile.text('');
    if (jQuery.inArray(currentTile.attr('id'), beginningTiles) != -1) {
        // found in beginning tiles
        currentTile.append('<placeholder class="tile-placeholder">A</placeholder>')
    }
    decrementTile();
    burst.play();
});

// Helper Functions

function incrimentTile() {
    if (jQuery.inArray(currentTile.attr('id'), endingTiles) != -1)
        return;
    var tile = parseInt(currentTile.attr('id').substring(4));
    tile++;
    currentTile = $('#tile' + tile);
    console.log("current tile: " + currentTile.attr("id"));
}

function decrementTile() {
    if (jQuery.inArray(currentTile.attr('id'), beginningTiles) != -1) {
        return;
    }
    var tile = parseInt(currentTile.attr('id').substring(4));
    tile--;
    currentTile = $('#tile' + tile);
    console.log("current tile: " + currentTile.attr("id"));
}

function buildWordFromTiles() {
    var word = "";
    switch (currentLine) {
        case 1:
            for (var i = 1; i < 7; i++)
                word += $('#tile' + i).text();
            break;
        case 2:
            for (var i = 7; i < 13; i++)
                word += $('#tile' + i).text();
            break;
        case 3:
            for (var i = 13; i < 19; i++)
                word += $('#tile' + i).text();
            break;
        case 4:
            for (var i = 19; i < 25; i++)
                word += $('#tile' + i).text();
            break;
        case 5:
            for (var i = 25; i < 31; i++)
                word += $('#tile' + i).text();
            break;
        case 6:
            for (var i = 31; i < 37; i++)
                word += $('#tile' + i).text();
            break;
    }
    return word.toLocaleLowerCase();
}