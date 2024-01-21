export function generateMappings() {
    // load tiles

    return {
        "0": () => [
            sprite(`tileset`, { anim: "tl" }),
            area({ scale: 0.3 }),
            body({ isStatic: true })
        ],
        "1": () => [
            sprite(`tileset`, { anim: "tm" }),
            area({ scale: 0.3 }),
            body({ isStatic: true })
        ],
        "2": () => [
            sprite(`tileset`, { anim: "tr" }),
            area({ scale: 0.3 }),
            body({ isStatic: true })
        ],
        "3": () => [
            sprite(`tileset`, { anim: "ml" }),
            area({ scale: 0.3 }),
            body({ isStatic: true })
        ],
        "4": () => [
            sprite(`tileset`, { anim: "mm" }),
            area({ scale: 0.3 }),
            body({ isStatic: true })
        ],
        "5": () => [
            sprite(`tileset`, { anim: "mr" }),
            area({ scale: 0.3 }),
            body({ isStatic: true })
        ],
        "6": () => [
            sprite(`tileset`, { anim: "bl" }),
            area({ scale: 0.3 }),
            body({ isStatic: true })
        ],
        "7": () => [
            sprite(`tileset`, { anim: "bm" }),
            area({ scale: 0.3 }),
            body({ isStatic: true })
        ],
        "8": () => [
            sprite(`tileset`, { anim: "br" }),
            area({ scale: 0.3 }),
            body({ isStatic: true })
        ],
    }
  }
