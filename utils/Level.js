export class Level {
  
    drawMapLayout(levelLayout, mappings) {
    const layerSettings = {
      tileWidth: 12,
      tileHeight: 12,
      tiles: mappings,
    }

    this.map = []
    for (const layerLayout of levelLayout) {
      this.map.push(addLevel(layerLayout, layerSettings))
    }

    for (const layer of this.map) {
      layer.use(scale(3.8))
    }
  }

  drawBackground(bgSpriteName) {
    add([sprite(bgSpriteName), fixed()])
  }
}
