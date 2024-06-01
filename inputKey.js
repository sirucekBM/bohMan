export class InputHandler{
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.keyStatus = {};
        this.keyPressed = {};
        this.touchY = '';
        this.touchX = '';
        this.touchTreshold = 30;
        this.timeStampDoubleTouch = 0;
        this.counterTouch = 0;

        window.addEventListener('keydown', e => {
            if (!this.keyStatus[e.key]) {
                if ((e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === ' ' ||
                    e.key === 'Enter') && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                }
                this.keyStatus[e.key] = true;
                this.keyPressed[e.key] = true;
            }

            if (e.key === 'd') {
                this.game.debug = !this.game.debug;
            }

            if (e.key === 'Enter') {
                if (this.game.gameOver) this.game.restart();
            }
        });

        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === ' ' ||
                e.key === 'Enter') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            this.keyStatus[e.key] = false;
            this.keyPressed[e.key] = false;
        });
    }

    }