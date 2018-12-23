let canvas
let ctx
let player
let enemys = []
let bullets = []
let image
let key = {
    a: false,
    w: false,
    d: false,
    s: false,
    e: false
}
let isShoot = true
init = () => {
    canvas = document.querySelector("#main")
    ctx = canvas.getContext("2d")

    //playerの生成
    player = new Player()
    //敵の生成　3体
    for (let i = 0; i < 3; i++) {
        //間隔
        const interval = 34
        //敵の大きさ
        const w = 32
        const h = 32
        const enemyValueX = 3
        const initPosiX = (canvas.width / 2) - ((enemyValueX / 2) * (w + 10))
        const initPosiY = 100
        const x = i * w + i * interval + initPosiX
        const y = 50
        const enemy = new Enemy(x, y)
        enemys.push(enemy)

    }

    image = new Image()
    image.src = "images/EDGE1.png"
    image.onload = () => {
        requestAnimationFrame(update)
    }

}
let update = () => {
    requestAnimationFrame(update)
    render()
    game()
}

let render = () => {
    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //自機
    player.draw(ctx, image)
    //敵
    enemys.forEach(enemy => {
        if (!enemy.isDead) {
            enemy.draw(ctx, image)
        }
    })
    //弾
    bullets.forEach(bullet => {
        bullet.draw(ctx, image)
    })
}

let game = () => {
    player.move(key, canvas)
    shoot(key)
    enemyCollision()

}

let shoot = (key) => {
    bulletGeneration(key)
    bulletDelete()
    bullets.forEach(bullet => {
        bullet.move()
    })
}


let bulletGeneration = (key) => {
    if (key.e && isShoot) {
        const bullet = new Bullet(player.x, player.y - 10)
        bullets.push(bullet)
        isShoot = false
    }
}

let bulletDelete = () => {
    bullets.some((v, i) => {
        //画面外に行く消える
        if (v.y < -10) {
            bullets.splice(i, 1)
            isShoot = true;
        }
    })
}
let enemyCollision = () => {
    enemys.forEach(enemy => {
        let sc = 0
        if (enemy.isDead) {
            return
        }
        bullets.forEach(bullet => {
            const er = enemy.width / 2
            const enemyCenterX = enemy.x + enemy.width / 2
            const enemyCenterY = enemy.y + enemy.height / 2

            const br = bullet.r
            const bulletCenterX = bullet.x + enemy.width / 2
            const bulletCenterY = bullet.y + enemy.height / 2

            const x = (enemyCenterX - bulletCenterX) ** 2
            const y = (enemyCenterY - bulletCenterY) ** 2
            const r = (er + br) ** 2
            if (x + y <= r) {
                enemy.isDead = true
                bullets.splice(sc, 1)
                isShoot = true
            }
            sc++
        })
    })
}
window.addEventListener("DOMContentLoaded", init)
//キー入力
document.addEventListener("keydown", e => {
    if (key[e.key] === false) {
        key[e.key] = true
    }
})

document.addEventListener("keyup", e => {
    if (key[e.key] === true) {
        key[e.key] = false
    }
})