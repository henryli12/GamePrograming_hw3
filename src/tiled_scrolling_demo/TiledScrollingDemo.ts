/*
 * TiledScrollingDemo.ts - demonstrates how tiled layers can be rendered
 * and scrolled using a viewport. 
 */
import {Game} from '../wolfie2d/Game'
import {AnimatedSprite} from '../wolfie2d/scene/sprite/AnimatedSprite'
import {AnimatedSpriteType} from '../wolfie2d/scene/sprite/AnimatedSpriteType'
import {TiledLayer} from '../wolfie2d/scene/tiles/TiledLayer'
import {SceneGraph} from '../wolfie2d/scene/SceneGraph'
import {Viewport} from '../wolfie2d/scene/Viewport'
import {TextToRender, TextRenderer} from '../wolfie2d/rendering/TextRenderer'
import { PatrolBehavoir } from '../wolfie2d/scene/sprite/PatrolBehavior';
import {Behavior} from '../wolfie2d/scene/sprite/Behavior';
import { MainCharacterBehavior } from '../wolfie2d/scene/sprite/MainCharacterBehavior';
import {EnemyBehavior} from '../wolfie2d/scene/sprite/EnemyBehavior';

// THIS IS THE ENTRY POINT INTO OUR APPLICATION, WE MAKE
// THE Game OBJECT AND INITIALIZE IT WITH THE CANVASES
let game = new Game("game_canvas", "text_canvas");

// WE THEN LOAD OUR GAME SCENE, WHICH WILL FIRST LOAD
// ALL GAME RESOURCES, THEN CREATE ALL SHADERS FOR
// RENDERING, AND THEN PLACE ALL GAME OBJECTS IN THE SCENE.
// ONCE IT IS COMPLETED WE CAN START THE GAME
const DESERT_SCENE_PATH = "resources/scenes/ScrollableDesert.json";
game.getResourceManager().loadScene(DESERT_SCENE_PATH, 
                                    game.getSceneGraph(),
                                    game.getRenderingSystem(), 
                                    function() {
    // ADD ANY CUSTOM STUFF WE NEED HERE, LIKE TEXT RENDERING
    // LET'S ADD A BUNCH OF RANDOM SPRITES
    let world : TiledLayer[] = game.getSceneGraph().getTiledLayers();
    for (let tiledLayer of world) {
        console.log(tiledLayer);
    }
    let worldWidth : number = world[0].getColumns() * world[0].getTileSet().getTileWidth();
    let worldHeight : number = world[0].getRows() * world[0].getTileSet().getTileHeight();
    for (let i = 0; i < 50; i++) {
        let type : AnimatedSpriteType = game.getResourceManager().getAnimatedSpriteType("STICK_BUG");
        let randomSprite : AnimatedSprite = new AnimatedSprite(type, "WALKING");
        let randomX : number = Math.random() * worldWidth;
        let randomY : number = Math.random() * worldHeight;
        let behavior : Behavior = new EnemyBehavior(randomSprite, worldWidth, worldHeight);
        randomSprite.setBehavior(behavior);
        randomSprite.getPosition().set(randomX, randomY, 0, 1);
        game.getSceneGraph().addEnemy(randomSprite);
    }
    for (let i = 0; i < 50; i++) {
        let type : AnimatedSpriteType = game.getResourceManager().getAnimatedSpriteType("CAMEL_SPIDER");
        let randomSprite : AnimatedSprite = new AnimatedSprite(type, "WALKING");
        let randomX : number = Math.random() * worldWidth;
        let randomY : number = Math.random() * worldHeight;
        let behavior : Behavior = new PatrolBehavoir(randomSprite, worldWidth, worldHeight);
        randomSprite.setBehavior(behavior);
        randomSprite.getPosition().set(randomX, randomY, 0, 1);
        game.getSceneGraph().addPatrolSprite(randomSprite);
    }
    let type : AnimatedSpriteType = game.getResourceManager().getAnimatedSpriteType("ANT");
    let randomSprite : AnimatedSprite = new AnimatedSprite(type, "WALKING");
    let behavior : Behavior = new MainCharacterBehavior(randomSprite, worldWidth, worldHeight);
    randomSprite.setBehavior(behavior);
    randomSprite.getPosition().set(game.getSceneGraph().getViewport().getWidth() / 2, game.getSceneGraph().getViewport().getHeight() / 2, 0, 1);
    game.getSceneGraph().setMainSprite(randomSprite);

    // NOW ADD TEXT RENDERING. WE ARE GOING TO RENDER 3 THINGS:
        // NUMBER OF SPRITES IN THE SCENE
        // LOCATION IN GAME WORLD OF VIEWPORT
        // NUMBER OF SPRITES IN VISIBLE SET (i.e. IN THE VIEWPORT)
    let sceneGraph : SceneGraph = game.getSceneGraph();
    let spritesInSceneText : TextToRender = new TextToRender("Sprites in Scene", "", 20, 50, function() {
        spritesInSceneText.text = "Sprites in Scene: " + sceneGraph.getNumSprites();
    });
    let viewportText : TextToRender = new TextToRender("Viewport", "", 20, 70, function() {
        let viewport : Viewport = sceneGraph.getViewport();
        viewportText.text = "Viewport (w, h, x, y): ("  + viewport.getWidth() + ", "
                                                        + viewport.getHeight() + ", "
                                                        + viewport.getX() + ", "
                                                        + viewport.getY() + ")";
    });
    let spritesInViewportText : TextToRender = new TextToRender("Sprites in Viewport", "", 20, 90, function() {
        spritesInViewportText.text = "Sprites in Viewport: " + sceneGraph.scope().length;
    });
    let worldDimensionsText : TextToRender = new TextToRender("World Dimensions", "", 20, 110, function() {
        worldDimensionsText.text = "World Dimensions (w, h): (" + worldWidth + ", " + worldHeight + ")";
    });
    let viewport : Viewport = sceneGraph.getViewport();
    let winText : TextToRender = new TextToRender("Win Text", "", viewport.getWidth() * 2 / 5, viewport.getHeight() / 2, function(){
        winText.text = "YOU WIN!!!";
        winText.fontColor = "Red";
        winText.fontSize = 100;
    });
    let textRenderer = game.getRenderingSystem().getTextRenderer();
    textRenderer.addTextToRender(spritesInSceneText);
    textRenderer.addTextToRender(viewportText);
    textRenderer.addTextToRender(spritesInViewportText);
    textRenderer.addTextToRender(worldDimensionsText);
    textRenderer.addTextToRender(winText);

    // AND START THE GAME LOOP
    game.start();
});