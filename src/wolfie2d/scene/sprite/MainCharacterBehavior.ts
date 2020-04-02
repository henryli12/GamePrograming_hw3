import { AnimatedSprite} from "./AnimatedSprite";
import {Behavior} from "./Behavior";

export class MainCharacterBehavior extends Behavior{
    private speed : number;
    public constructor(sprite : AnimatedSprite, x : number, y : number){
        super(sprite,x,y);
        this.speed = 5;
    }

    public goTarget(speed : number) : void{
        let angle = this.getSprite().getAngle();
        let targetX = this.getSprite().getTargetX();
        let targetY = this.getSprite().getTargetY();
        if(targetX === -1 || targetY === -1){
            return;
        }
        let x = this.getSprite().getPosition().getX();
        let y = this.getSprite().getPosition().getY();
        let deltaX : number = targetX - x - 128 / 2;
        let deltaY : number = targetY - y - 128 / 2;
        if(deltaX > 0 && deltaY < 0){
            angle = Math.atan(deltaY / deltaX) + 2 * Math.PI;
        }else if(deltaX > 0){
            angle = Math.atan(deltaY / deltaX);
        }else if(deltaX < 0){
            angle = Math.atan(deltaY / deltaX) + Math.PI;
        }else if(deltaX === 0 && deltaY > 0){
            angle = Math.PI / 2
        }else if(deltaX === 0 && deltaY < 0){
            angle = 3 * Math.PI / 2
        }
        this.getSprite().setAngle(angle);
        if(deltaX < 3 && deltaX > -3 && deltaY < 3 && deltaY > -3){
                this.move(0);
        }else{
            this.move(speed);
        }
    }

    public update(delta : number) : void{
        this.goTarget(this.speed);
    }

}