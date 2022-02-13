
const beginningTiles = ['tile1', 'tile7', 'tile13', 'tile19', 'tile25', 'tile31'];
const endingTiles = ['tile6', 'tile12', 'tile18', 'tile24', 'tile30', 'tile36'];

var currentTile = $('#tile1');
var currentLine = 1;

var word;
var words;
var letterValues;

$(document).ready(function () {
    if(!window.mobileCheck()) {
        window.location.replace("/not-supported");
    }

    fetch('http://127.0.0.1:5000/word')
        .then(response => response.json())
        .then(data => word = data);
    fetch('http://127.0.0.1:5000/words')
        .then(response => response.json())
        .then(data => words = data);
    fetch('http://127.0.0.1:5000/values')
        .then(response => response.json())
        .then(data => letterValues = data);
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
        guess = buildGuessFromTiles();
        if (words.some(item => item === guess)) {
            // start flipping
            for (var i = 0; i < guess.length; i++) {
                guessLetter = guess[i];
                correctLetter = word['word'[i]];
                if (guessLetter == correctLetter) {
                    // flip green
                    console.log("flipping green");
                }
                else if (letterValues[guessLetter] > letterValues[correctLetter]) {
                    // flip red
                    console.log("flipping red");
                }
                else {
                    // flip blue
                    console.log("flipping blue");
                }
                console.log(letterValues[letter]);
            }

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

    decrementTile();
    if (jQuery.inArray(currentTile.attr('id'), beginningTiles) != -1) {
        // found in beginning tiles
        currentTile.append('<placeholder class="tile-placeholder">A</placeholder>')
    }
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

function buildGuessFromTiles() {
    var guess = "";
    switch (currentLine) {
        case 1:
            for (var i = 1; i < 7; i++)
                guess += $('#tile' + i).text();
            break;
        case 2:
            for (var i = 7; i < 13; i++)
                guess += $('#tile' + i).text();
            break;
        case 3:
            for (var i = 13; i < 19; i++)
                guess += $('#tile' + i).text();
            break;
        case 4:
            for (var i = 19; i < 25; i++)
                guess += $('#tile' + i).text();
            break;
        case 5:
            for (var i = 25; i < 31; i++)
                guess += $('#tile' + i).text();
            break;
        case 6:
            for (var i = 31; i < 37; i++)
                guess += $('#tile' + i).text();
            break;
    }
    return guess.toLocaleLowerCase();
}

window.mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};