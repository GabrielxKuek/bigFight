export const load = {

    // assets
    assets: () => {
        loadSprite("bg", "./assets/bg1.png")

        loadSprite("tileset", "./assets/tileset.png", {
            sliceX: 3,
            sliceY: 3,
            anims: {
                tl: 0,
                tm: 1,
                tr: 2,
                ml: 3,
                mm: 4,
                mr: 5,
                br: 6,
                bm: 7,
                bl: 8,
            }
        })

        loadSprite("entity", "./assets/Torch_Red.png", {
            sliceX: 7,
            sliceY: 5,
            anims: {
                idle: {
                  from: 0,
                  to: 6,
                  loop: true,
                },
                walk: {
                  from: 7,
                  to: 12,
                  loop: true,
                },
                attack: {
                  from: 13,
                  to: 18,
                  loop: true,
                },
              },
          })

    }

}


