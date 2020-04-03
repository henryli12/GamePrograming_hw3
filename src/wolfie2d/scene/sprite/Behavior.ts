import {AnimatedSprite} from "./AnimatedSprite";

export class Behavior{
    private sprite : AnimatedSprite;
    private worldEndX : number;
    private worldEndY : number;
    public constructor(sprite : AnimatedSprite, x : number, y : number){
        this.sprite = sprite;
        this.worldEndX = x;
        this.worldEndY = y;
    }
    public getSprite() : AnimatedSprite{
        return this.sprite;
    }
    
    public move(speed : number) : void {
            let angle = this.sprite.getAngle()
            if(angle === 1000){
                return;
            }
            let deltay = Math.sin(angle);
            let deltax = Math.cos(angle);
            let x = this.sprite.getPosition().getX();
            let y = this.sprite.getPosition().getY();
            let newX = x + deltax * speed;
            let newY = y + deltay * speed;
            if(newX < 0 || newY < 0 || newX > this.worldEndX || newY > this.worldEndY){
                angle = angle + Math.PI;
                this.getSprite().setAngle(angle);
            }
            this.sprite.getPosition().setX(newX);
            this.sprite.getPosition().setY(newY);
    }
    public update(delta : number){}
    public collided(){}
}