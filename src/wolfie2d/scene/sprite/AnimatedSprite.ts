import {SceneObject} from '../SceneObject'
import {AnimatedSpriteType} from './AnimatedSpriteType'

export class AnimatedSprite extends SceneObject {
    private spriteType : AnimatedSpriteType;
    private state : string;
    private animationFrameIndex : number;
    private frameCounter : number;
    private type: string;
    private angle: number;
    private targetX : number;
    private targetY : number;
    
    public constructor(initSpriteType : AnimatedSpriteType, initState : string, type : string) {
        super();
        this.spriteType = initSpriteType;
        this.type = type;
        
        // START RESET
        this.state = initState;
        this.animationFrameIndex = 0;
        this.frameCounter = 0;
        
        this.angle = 1000;
        this.targetX = -1;
        this.targetY = -1;
        if(type !== "MANTIS"){
            this.randomAngle();
        }
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
    public getType() : string {
        return this.type;
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
    
    public randomAngle() : void {
        this.angle = Math.random() * 2 * Math.PI;
        // this.angle = Math.PI * 5 / 4;

    }


    public move(speed : number) : void {
        while(true){
            if(this.angle === 1000){
                return;
            }
            let deltay = Math.sin(this.angle);
            let deltax = Math.cos(this.angle);
            let x = this.getPosition().getX();
            let y = this.getPosition().getY();
            let newX = x + deltax * speed;
            let newY = y + deltay * speed;
            if(newX < 0){
                this.angle = this.angle + Math.PI;
                continue;
            }else if(newY < 0){
                this.angle = this.angle + Math.PI;
                continue;
            }
            this.getPosition().setX(newX);
            this.getPosition().setY(newY);
            break;
        }
    }

    public goTarget(speed : number) : void{
        if(this.targetX === -1 || this.targetY === -1){
            return;
        }
        let deltaX : number = this.targetX - this.getPosition().getX() - 128 / 2;
        let deltaY : number = this.targetY - this.getPosition().getY() - 128 / 2;
        if(deltaX > 0 && deltaY < 0){
            this.angle = Math.atan(deltaY / deltaX) + 2 * Math.PI;
        }else if(deltaX > 0){
            this.angle = Math.atan(deltaY / deltaX);
        }else if(deltaX < 0){
            this.angle = Math.atan(deltaY / deltaX) + Math.PI;
        }else if(deltaX === 0 && deltaY > 0){
            this.angle = Math.PI / 2
        }else if(deltaX === 0 && deltaY < 0){
            this.angle = 3 * Math.PI / 2
        } 
        if(deltaX < 3 && deltaX > -3 && deltaY < 3 && deltaY > -3){
            if(this.type === "MANTIS"){
                this.move(0);
            }else{
                this.randomAngle();
            }
        }else{
            this.move(3);
        }
    }


    public update(delta : number) : void {
        this.frameCounter++;
        let x = this.getPosition().getX();
        let y = this.getPosition().getY();
        if(this.type === "MANTIS"){
            this.goTarget(3);
        }else if(this.type === "STICKY BUG"){
            this.move(1);
            let rand = Math.random();
            if(rand < .005){
                this.randomAngle();
            }
        }else if(this.type === "CAMEL SPIDER"){
            this.move(1);
        }
        // if(this.type === "STICKY BUG"){
        //     this.move(180);
        // }

        // HAVE WE GONE PAST THE LAST FRAME IN THE ANIMATION?
        var currentAnimation = this.spriteType.getAnimation(this.state);
        var currentFrame = currentAnimation[this.animationFrameIndex];
        if (this.frameCounter > (currentFrame.duration)) {
            this.animationFrameIndex++;
            if (this.animationFrameIndex >= currentAnimation.length) {
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