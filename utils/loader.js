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

        loadSprite("knight", "./assets/Warrior_Red.png", {
          sliceX: 6,
          sliceY: 8,
          anims: {
            idle: {
              from: 0,
              to: 5,
              loop: true
            },
            walk: {
              from: 6,
              to: 11,
              loop: true
            },
            attack: {
              from: 12,
              to: 17,
              loop: true
            },
          }
        })
        // loadSprite("politician", "./assets/politician.png", {
        //   sliceX: 23,
        //   sliceY: 1,
        //   anims: {
        //     idle: {
        //       from: 0,
        //       to: 7,
        //       loop: true
        //     },
        //     walk: {
        //       from: 0,
        //       to: 14,
        //       loop: true
        //     },
        //     attack: {
        //       from: 0,
        //       to: 14,
        //       loop: true
        //     },
        //   }
        // })


        // non entities
        loadSprite("goblinHouse", "./assets/Goblin_House.png")
        loadSprite("humanHouse", "./assets/Tower_Red.png")
        loadSprite("humanHouse-destroyed", "./assets/Tower_Destroyed.png")
        loadSprite("goblinHouse-destroyed", "./assets/Goblin_House_Destroyed.png")

    }

}


