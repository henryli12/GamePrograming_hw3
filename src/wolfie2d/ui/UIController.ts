/*
 * This provides responses to UI input.
 */
import {AnimatedSprite} from "../scene/sprite/AnimatedSprite"
import {SceneGraph} from "../scene/SceneGraph"
import { Viewport } from "../scene/Viewport";

export class UIController {
    private spriteToDrag : AnimatedSprite;
    private scene : SceneGraph;
    private dragOffsetX : number;
    private dragOffsetY : number;
    private cursorX : number;
    private cursorY : number;

    public constructor(canvasId : string, initScene : SceneGraph) {
        this.spriteToDrag = null;
        this.scene = initScene;
        this.dragOffsetX = -1;
        this.dragOffsetY = -1;
        this.cursorX = 0;
        this.cursorY = 0;

        let canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(canvasId);
        canvas.addEventListener("mousedown", this.mouseDownHandler);
        canvas.addEventListener("mousemove", this.mouseMoveHandler);
        canvas.addEventListener("mouseup", this.mouseUpHandler);
        canvas.addEventListener("mousemove", this.moveMainHandler);
        document.addEventListener("keydown", this.keyDownHandler);
    }

    public mouseDownHandler = (event : MouseEvent) : void => {
        let viewport = this.scene.getViewport();
        let x = viewport.getX();
        let y = viewport.getY();
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

    public moveMainHandler = (event : MouseEvent) : void => {
        let viewport : Viewport = this.scene.getViewport();
        this.cursorX = event.clientX + viewport.getX();
        this.cursorY = event.clientY + viewport.getY();
        let main = this.scene.getMainSprite();
        if(main == null) return;
        main.setTarget(this.cursorX, this.cursorY);
    }

    public keyDownHandler = (event : KeyboardEvent) : void => {
        let viewport = this.scene.getViewport();
        let x = viewport.getX();
        let y = viewport.getY();
        let vheight = viewport.getHeight();
        let vwidth = viewport.getWidth();
        let world = this.scene.getTiledLayers();
        let worldWidth : number = world[0].getColumns() * world[0].getTileSet().getTileWidth();
        let worldHeight : number = world[0].getRows() * world[0].getTileSet().getTileHeight();
        let maxX = worldWidth - vwidth;
        let maxY = worldHeight - vheight;

        let main = this.scene.getMainSprite();
        if(main === null){
            return;
        }
        let mainX = main.getTargetX();
        let mainY = main.getTargetY();

        if (event.keyCode == 65){
            console.log('left')
            let newX = x - 10;
            if(vwidth >= worldWidth){
                return;
            }
            if(newX < 0){
                viewport.setPosition(0, y);
            }else{
                viewport.setPosition(newX, y);
                main.setTarget(mainX - 10, mainY);
            }
        }else if (event.keyCode == 83){
            console.log('down');
            let newY = y + 10;
            if(newY > maxY){
                viewport.setPosition(x, maxY);
            }else{
                viewport.setPosition(x, newY);
                main.setTarget(mainX , mainY + 10);
            }
        }else if (event.keyCode == 68){
            console.log('right');
            let newX = x + 10;
            if(vwidth >= worldWidth){
                return;
            }
            if(newX > maxX){
                viewport.setPosition(maxX, y);
            }else{
                viewport.setPosition(newX, y);
                main.setTarget(mainX + 10, mainY);
            }
        }else if (event.keyCode == 87){
            console.log('up');
            let newY = y - 10;
            if(newY < 0){
                viewport.setPosition(x, 0);
            }else{
                viewport.setPosition(x, newY);
                main.setTarget(mainX, mainY - 10);
            }
        }

    }
}