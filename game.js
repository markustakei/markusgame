class Game {
    constructor(canvas, width, height) {
        canvas.width = width;
        canvas.height = height;
        this._width = width;
        this._height = height;
        this._ctx = canvas.getContext('2d');
        this._player = new Player(this._ctx, this._width / 10, this._height / 10);
    }

    play() {
        this._clear();
        this._drawBorder();
        this._player.draw();

        if (this._checkState()) {
            requestAnimationFrame(this.play.bind(this));
        } else {
            this._lose();
        }
    }

    _condition() {
        let borders = this._player.getBorders();
        return (borders.xMin >= 0 &&
            borders.xMax <= this._width &&
            borders.yMin >= 0 &&
            borders.yMax <= this._height);
    }

    _lose() {
        this._ctx.beginPath();
        this._ctx.font = '48px serif';
        this._ctx.fillStyle = 'red';
        this._ctx.fillText("You lose!", this._width / 2, this._height / 2);
    }

    _drawBorder() {
        this._ctx.beginPath();
        this._ctx.rect(0, 0, this._width, this._height);
        this._ctx.stroke();
    }

    _clear() {
        this._ctx.clearRect(0, 0, this._width, this._height);
    }
}

var game = new Game(document.getElementsByTagName('canvas')[0], 400, 400);
game.play();
