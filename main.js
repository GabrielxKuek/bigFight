import kaboom from "./kaboom.mjs";

import { load } from "./utils/loader.js"

// scenes stuff
import { UIManager } from "./utils/UIManager.js"

// levels
import { Level } from "./utils/Level.js"
import { level1Layout, level1Mappings } from "./levels/level1/level1.js"

kaboom()

function movement() {
    const direction = vec2(1,0)
    const speed = 1.5

    return {
        update() {
            if (!this.pos) {
                console.error("missing pos component")
                return
            }

            this.pos.x += direction.x * speed

        }
    }
}

function summon() {
    let entity = add([
        sprite("entity", {anim: "walk"}),
        pos(0, 450),
        area(),
        body(),
        movement(),
        "entity",
    ])
}

load.assets()

const scenes = {
    menu: () => {
        UIManager.displayMainMenu()
    },

    levelSelect: () => {

    },

    1: () => {
        // init 

        add([
            sprite("bg"),
            scale(4)
        ])

        // entity test

        // const entity = add([
        //     sprite("entity", {anim: "walk"}),
        //     pos(0, 0),
        //     area(),
        //     body(),
        //     movement(),
        //     "entity",
        // ])

        onKeyDown("space", () => {
            summon()
        })
    
        // level init
        const level1 = new Level()
        level1.drawMapLayout(level1Layout, level1Mappings)
    }
}

for (const key in scenes) {
    // name of scene, function callback
    scene(key, scenes[key])
}

go(1)