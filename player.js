class Player {

    constructor() {
        this.sx = 0
        this.sy = 0
        this.width = 32
        this.height = 32
        this.x = (canvas.width / 2) - this.width / 2
        this.y = canvas.height - 50
        this.speed = 5
    }

    draw(ctx, image) {
        ctx.drawImage(image, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height)    }

    move(key,canvas) {
        if (0 <= this.x && this.x + this.width <= canvas.width) {
            if (0 <= this.y && this.y + this.height <= canvas.height) {
                if (key.d ) {
                    this.x += this.speed
                }
                if (key.a ) {
                    this.x -= this.speed
                }
    
            } else {
                if (this.y < 0) {
                    this.y = 0
                } else {
                    this.y = canvas.height - this.height
                }
            }
        } else {
            if (this.x < 0) {
                this.x = 0
            } else {
                this.x = canvas.width - this.width
            }
        }
    }

}