class UI {
    displayBlinkingUIMessage(content, position, colour) {
        const message = add([
            text(content, {
                size: 24
            }),
            area(),
            anchor("center"),
            pos(position),
            opacity(),
            state("flash-up", ["flash-up", "flash-down"]),
            color(...colour)
        ])

        message.onStateEnter("flash-up", async () => {
            await tween(
                message.opacity,
                0,
                0.5,
                (nextOpacityValue) => message.opacity = nextOpacityValue,
                easings.linear
            )

            message.enterState("flash-down")
        }) 

        message.onStateEnter("flash-down", async () => {
            await tween(
                message.opacity,
                1,
                0.5,
                (nextOpacityValue) => message.opacity = nextOpacityValue,
                easings.linear
            )

            message.enterState("flash-up")
        }) 
    } // end display msg

    // display main menu
    displayMainMenu() {
        add([
            sprite("bg"),
            scale(4)
        ])

        this.displayBlinkingUIMessage(
            "Press [ Enter ] to Start Game",
            vec2(center().x, center().y + 100),
            [0,0,0]
        )

        onKeyPress("enter", () => {
            go("pvp")
        })
    }
}

export const UIManager = new UI()
