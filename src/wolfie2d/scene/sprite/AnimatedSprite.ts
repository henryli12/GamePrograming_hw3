import {SceneObject} from '../SceneObject'
import {AnimatedSpriteType} from './AnimatedSpriteType'
import { PatrolBehavoir } from './PatrolBehavior';
import {Behavior} from './Behavior';
import { MainCharacterBehavior } from './MainCharacterBehavior';
import {EnemyBehavior} from './EnemyBehavior';
import { SceneGraph } from '../SceneGraph';

export class AnimatedSprite extends SceneObject {
    private spriteType : AnimatedSpriteType;
    private state : string;
    private animationFrameIndex : number;
    private frameCounter : number;
    private angle: number;
    private targetX : number;
    private targetY : number;
    private behavior : Behavior;

    
    public constructor(initSpriteType : AnimatedSpriteType, initState : string) {
        super();
        this.spriteType = initSpriteType;
        
        // START RESET
        this.state = initState;
        this.animationFrameIndex = 0;
        this.frameCounter = 0;
        
        this.targetX = -1;
        this.targetY = -1;
        this.randomAngle();

    }

    public getAnimationFrameIndex() : number {
        return this.animationFrameIndex;
    }

    public getFrameCounter() : number {
        return this.frameCounter;
    }

    public getSpriteType() : AnimatedSpriteType {
        return this.spriteType;
    }

    public setTarget(x : number, y : number){
        this.targetX = x;
        this.targetY = y;
    }

    public getAngle() : number {
        return this.angle;
    }

    public setAngle(newAngle : number) : void {
        this.angle = newAngle;
    }
    
    public getTargetX() : number {
        return this.targetX;
    }

    public getTargetY() : number {
        return this.targetY;
    }

    public getState() : string {
        return this.state;
    }
    
    public setState(initState : string) : void {
        this.state = initState;
        this.animationFrameIndex = 0;
        this.frameCounter = 0;
    }
   
    public collided() : void {
        this.behavior.collided();
    }
    
    public randomAngle() : void {
        this.angle = Math.random() * 2 * Math.PI;
    }

    public setBehavior( behavior : Behavior) : void{
        this.behavior = behavior;
    }

    public update(delta : number, sceneGraph : SceneGraph) : void {
        this.frameCounter++;

        this.behavior.update(delta);

        // HAVE WE GONE PAST THE LAST FRAME IN THE ANIMATION?
        var currentAnimation = this.spriteType.getAnimation(this.state);
        var currentFrame = currentAnimation[this.animationFrameIndex];
        if (this.frameCounter > (currentFrame.duration)) {
            this.animationFrameIndex++;
            if (this.animationFrameIndex >= currentAnimation.length) {
                if(this.state === "DYING"){
                    sceneGraph.kill(this);
                }
                this.animationFrameIndex = 0;
            }
            this.frameCounter = 0;
        }
    }

    public contains(pointX : number, pointY : number) : boolean {
        let spriteWidth = this.getSpriteType().getSpriteWidth();
        let spriteHeight = this.getSpriteType().getSpriteHeight();
        let spriteLeft = this.getPosition().getX();
        let spriteRight = this.getPosition().getX() + spriteWidth;
        let spriteTop = this.getPosition().getY();
        let spriteBottom = this.getPosition().getY() + spriteHeight;
        if (    (pointX < spriteLeft)
            ||  (spriteRight < pointX)
            ||  (pointY < spriteTop)
            ||  (spriteBottom < pointY)) {
                return false;
        }
        else {
            return true;
        }
    }
    
    /**RENAME THIS METHOD SO IT DENOTES PIXEL LOCATION IN TEXTURE */
    public getLeft() : number {
        return this.spriteType.getLeft(this.state, this.animationFrameIndex);
    }
    
    public getTop() : number {
        return this.spriteType.getTop(this.state, this.animationFrameIndex);
    }

    public toString() : string {
        let summary : string =  "{ position: ("
                            +   this.getPosition().getX() + ", " + this.getPosition().getY() + ") "
                            +   "(state: " + this.getState() + ") "
                            +   "(animationFrameIndex: " + this.getAnimationFrameIndex() + ") "
                            +   "(frameCounter: " + this.getFrameCounter() + ") ";
        return summary;
    }
}