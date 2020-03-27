/*
 * This provides responses to UI input.
 */
import {AnimatedSprite} from "../scene/sprite/AnimatedSprite"
import {SceneGraph} from "../scene/SceneGraph"

export class UIController {
    private spriteToDrag : AnimatedSprite;
    private scene : SceneGraph;
    private dragOffsetX : number;
    private dragOffsetY : number;

    public constructor(canvasId : string, initScene : SceneGraph) {
        this.spriteToDrag = null;
        this.scene = initScene;
        this.dragOffsetX = -1;
        this.dragOffsetY = -1;

        let canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(canvasId);
        canvas.addEventListener("mousedown", this.mouseDownHandler);
        canvas.addEventListener("mousemove", this.mouseMoveHandler);
        canvas.addEventListener("mouseup", this.mouseUpHandler);
        document.addEventListener("keydown", this.keyDownHandler);
    }

    public mouseDownHandler = (event : MouseEvent) : void => {
        var viewport = this.scene.getViewport();
        var x = viewport.getX();
        var y = viewport.getY();
        let mousePressX : number = event.clientX;
        let mousePressY : number = event.clientY;
        let sprite : AnimatedSprite = this.scene.getSpriteAt(mousePressX + x, mousePressY + y);
        console.log("mousePressX: " + mousePressX);
        console.log("mousePressY: " + mousePressY);
        console.log("sprite: " + sprite);
        if (sprite != null) {
            // START DRAGGING IT
            this.spriteToDrag = sprite;
            this.dragOffsetX = sprite.getPosition().getX() - mousePressX;
            this.dragOffsetY = sprite.getPosition().getY() - mousePressY;
        }
    }
    
    public mouseMoveHandler = (event : MouseEvent) : void => {
        if (this.spriteToDrag != null) {
            this.spriteToDrag.getPosition().set(event.clientX + this.dragOffsetX, 
                                                event.clientY + this.dragOffsetY, 
                                                this.spriteToDrag.getPosition().getZ(), 
                                                this.spriteToDrag.getPosition().getW());
        }
    }

    public mouseUpHandler = (event : MouseEvent) : void => {
        this.spriteToDrag = null;
    }

    public keyDownHandler = (event : KeyboardEvent) : void => {
        var viewport = this.scene.getViewport();
        var x = viewport.getX();
        var y = viewport.getY();
        var vheight = viewport.getHeight();
        var vwidth = viewport.getWidth();
        var world = this.scene.getTiledLayers();
        var worldWidth : number = world[0].getColumns() * world[0].getTileSet().getTileWidth();
        var worldHeight : number = world[0].getRows() * world[0].getTileSet().getTileHeight();
        var maxX = worldWidth - vwidth;
        var maxY = worldHeight - vheight;
        if (event.keyCode == 65){
            console.log('left')
            var newX = x - 10;
            if(newX < 0){
                viewport.setPosition(0, y);
            }else{
                viewport.setPosition(newX, y);
            }
        }else if (event.keyCode == 83){
            console.log('down');
            var newY = y + 10;
            if(newY > maxY){
                viewport.setPosition(x, maxY);
            }else{
                viewport.setPosition(x, newY);
            }
        }else if (event.keyCode == 68){
            console.log('right');
            var newX = x + 10;
            if(newX > maxX){
                viewport.setPosition(maxX, y);
            }else{
                viewport.setPosition(newX, y);
            }
        }else if (event.keyCode == 87){
            console.log('up');
            var newY = y - 10;
            if(newY < 0){
                viewport.setPosition(x, 0);
            }else{
                viewport.setPosition(x, newY);
            }
        }

    }
}