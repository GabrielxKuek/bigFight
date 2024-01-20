export class Entity {
    constructor(posX, posY, speed) {
        this.posX = posX
        this.posY = posY
        this.speed = speed
    }

    makeEntity(spriteName, x, y) {
        return add([
            sprite(spriteName),
            area(),
            pos(x, y),
            body()
        ])
    }
}