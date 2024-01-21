import kaboom from "./kaboom.mjs";

import { load } from "./utils/loader.js"

// scenes stuff
import { UIManager } from "./utils/UIManager.js"

// levels
import { Level } from "./utils/Level.js"
import { level1Layout, level1Mappings } from "./levels/level1/level1.js"

kaboom()

let speed = 10
let summonTime = 10

// let pCheck = true
// let qCheck = true
let clicksGob = 0
let clicksKnight = 0
let secs = 0

// keypresses
function qPress () {
    onKeyPress("q", () => {
        summonAlly(summonTime)
        clicksGob++
    })
    
}

function pPress () {
    onKeyPress("p", () => {
        summonEnemy(summonTime)
        clicksKnight++
    })
    
}


function movement(direction, speed) {

    return {
        update() {
            if (!this.pos) {
                console.error("missing pos component")
                return
            }

            if (!this.checkVal) {
                return;
            }
            this.pos.x += direction.x * speed

        }
    }
}


async function attackTimer(time, ally, enemy) {
    
    while (ally.health > 0 && enemy.health > 0) {
        await wait(time)
        enemy.health -= ally.damage
        ally.health -= enemy.damage
    }
}

let pCheck = true
let qCheck = true

function summonAlly(ms) {
    if (qCheck) {
        let goblin = add([
            sprite("entity", {anim: "walk"}),
            pos(0, 460),
            area({ scale: 0.3, offset: vec2(250, 200), collisionIgnore: ["ally"]}),
            body(),
            movement(vec2(1,0), speed),
            z(2),
            {
                health: 80,
                damage: 40,
                checkVal: true
            },
            "ally",
        ])

        qCheck = false
        setTimeout(() => {
            qCheck = true
        }, ms)
    }
}

function summonEnemy(ms) {
    if (pCheck) {
        let knight = add([
            sprite("knight", {anim: "walk"}),
            pos(1300, 460),
            area({ scale: 0.3, offset: vec2(250, 200), collisionIgnore: ["enemy"]}),
            body(),
            movement(vec2(-1,0), speed),
            z(2),
            {
                health: 100,
                damage: 100 / 3,
                checkVal: true
            },
            "enemy",
        ])

        knight.flipX = true

        pCheck = false
        setTimeout(() => {
            pCheck = true
        }, ms)
    }
}

load.assets()

// load scenes

const scenes = {
    victory: () => {
        add([
            sprite("bg"),
            scale(4)
        ])
        add([
            text("GOBLINS WIN! \nWOOHOOOOO"),
            scale(2),
            pos( width() / 3, height() / 2),
            color(0,0,0)
        ])
        add([
            text("Press Enter to go to Main Menu"),
            scale(0.5),
            pos( width() / 3, height() / 2 + 200),
            color(0,0,0)
        ])

        onKeyPress("enter", () => {
            go("menu")
        })
    },

    loser: () => {
        add([
            sprite("bg"),
            scale(4)
        ])
        add([
            text("KNIGHTS WIN\n~\\(≧▽≦)/~"),
            scale(2),
            pos( width() / 3, height() / 2),
            color(0,0,0)
        ])
        add([
            text("Press Enter to go to Main Menu"),
            scale(0.5),
            pos( width() / 3, height() / 2 + 200),
            color(0,0,0)
        ])

        onKeyPress("enter", () => {
            go("menu")
        })
    },
    menu: () => {
        UIManager.displayMainMenu()
    },

    levelSelect: () => {

    },

    "pvp": () => {


        // press once every 4 seconds

        pPress()
        qPress()


        // init 
        add([
            sprite("bg"),
            scale(5)
        ])

        add([
            sprite("bg"),
            scale(4)
        ])

        
        const level1 = new Level()
        level1.drawMapLayout(level1Layout, level1Mappings)

        const allyTower = add([
            sprite("goblinHouse"),
            pos(50, 370),
            area(),
            scale(1.5),
            {
                health: 300,
                damage: 0
            },
            z(2),
            "allyTower"
        ]);

        // display health
        // let allyHealthTower = add([
        //     {
        //         curr_health: 1000
        //     },
        //     text(`${curr_health} / ${allyTower.health}`),
        //     scale(1),
        //     pos( 50, 20)
        // ])

        // onUpdate((allyTower) => {
        //     allyTower.curr_health = 
        // }) 

        const enemyTower = add([
            sprite("humanHouse"),
            pos(1300, 275),
            area(),
            scale(1.5),
            {
                health: 300,
                curr_health: 1000,
                damage: 0
            },
            z(2),
            "enemyTower"
        ])

        // display health
        // let enemyTowerHealth = add([
        //     text(`${allyTower.curr_health} / ${allyTower.health}`),
        //     scale(2),
        //     pos( 1300, 500)
        // ])


        // add([
        //     text(enemyTower.health + " / 5000"),
        //     pos(enemyTower., enemyTower. - 100)
        // ])

        // entity test

        // const entity = add([
        //     sprite("entity", {anim: "walk"}),
        //     pos(0, 0),
        //     area(),
        //     body(),
        //     movement(),
        //     "entity",
        // ])

        

        // ally enemy collide
        onCollide("ally", "enemy", (ally, enemy) => {
            if (ally.curAnim() !== "attack") 
                ally.play("attack")
            if (enemy.curAnim() !== "attack") 
                enemy.play("attack")

                attackTimer(1, ally, enemy)

        })

        onCollideUpdate("ally", "enemy", (ally, enemy) => {

            if (enemy.health <= 0)
                destroy(enemy)
            if (ally.health <= 0) 
                destroy(ally)
        })

        onCollideEnd("ally", "enemy", (ally, enemy) => {
            if (ally.curAnim() !== "walk") 
                ally.play("walk")
            if (enemy.curAnim() !== "walk") 
                enemy.play("walk")
        })

        // tower attack
        onCollide("ally", "enemyTower", (a, t) => {
            a.checkVal = false

            if (a.curAnim() !== "attack") 
                a.play("attack")

            attackTimer(1, a, t);

            // enemyTowerHealth = 
            // enemyTower.curr_health = enemyTower.curr_health - 40;
        })

        onCollideUpdate("ally", "enemyTower", (a, t) => {

            if (t.health <= 0) {
                add([
                    sprite("humanHouse-destroyed"),
                    scale(1.5),
                    pos(enemyTower.pos.x, enemyTower.pos.y)
                ])
                destroy(enemyTower)
                shake(50)
                setTimeout(() => {
                    go("victory")
                }, 1000)
            }
        })
        
        onCollide("enemy", "allyTower", (e, t) => {
            e.checkVal = false

            if (e.curAnim() !== "attack") 
                e.play("attack")

            attackTimer(1, e, t)
            // allyTower.curr_health = allyTower.curr_health - (100 / 3);
        })

        onCollideUpdate("enemy", "allyTower", (e, t) => {

            if (t.health <= 0) {
                add([
                    sprite("goblinHouse-destroyed"),
                    scale(1.5),
                    pos(allyTower.pos.x, allyTower.pos.y)
                ])
                destroy(allyTower)
                shake(50)
                setTimeout(() => {
                    go("loser")
                }, 1000)
            }

        })

        // cps

        function test() {
            setTimeout(() => {
                add([
                    text("ttt"),
                    pos(12, 12),
                    area(),
                    "popup"
                ])
            }, Math.floor(Math.random() * (5000 - 2000) + 2000))
        
            onClick("popup", () => {
                destroy("popup")
            })
        }

        // Ui
        add([
            pos(15, 50),
            rect(250, 140),
            outline(4),
            area(),
        ])
        add([
            sprite("entity", {
                anim: "idle"
            }),
            pos(0 + 50,0),
            area({ scale: 0.3, offset: vec2(250, 200) }),
        ])
        add([
            text("Press Q to summon Goblin"),
            pos(0 + 20, 150),
            scale(0.5),
            color(0,0,0)
        ])
        

        function test() {
            setTimeout(() => {
                secs++
                add([
                    text("Clicks per Second: " + Math.round(clicksGob / secs * 10) / 10),
                    pos(0 + 20, 200),
                    scale(0.5),
                    color(0,0,0),
                    "cps"
                ])
                add([
                    text("Clicks per Second: " + Math.round(clicksKnight / secs * 10) / 10),
                    pos(width() - 280, 200),
                    scale(0.5),
                    color(0,0,0),
                    "cps"
                ])
            }, 1)
        }
        
        loop(2, () => {
            test()
            destroyAll("cps")
        });
        
        // div //

        
        add([
            pos(width() - 285, 50),
            rect(250, 140),
            outline(4),
            area(),
        ])
        add([
            sprite("knight", {
                anim: "idle"
            }),
            pos(width() - 250,0),
            area({ scale: 0.3, offset: vec2(250, 200) })

        ])
        add([
            text("Press P to summon Knight"),
            pos(width() - 280, 150),
            scale(0.5),
            color(0,0,0)
        ])

    },

    1: () => {
        
    }
}

for (const key in scenes) {
    // name of scene, function callback
    scene(key, scenes[key])
}

go("menu")