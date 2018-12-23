class Enemy {

    constructor(x, y) {
        this.isDead = false
        this.sx = 32
        this.sy = 0
        this.width = 32
        this.height = 32
        this.x = x
        this.y = y
    }

    draw(ctx, image) {
        ctx.drawImage(image, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height)
    }
}