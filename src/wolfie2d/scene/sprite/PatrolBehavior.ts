import { AnimatedSprite} from "./AnimatedSprite";
import {Behavior} from "./Behavior";

export class PatrolBehavoir extends Behavior{
    private speed : number;
    private backing : boolean;

    public constructor(sprite : AnimatedSprite,x : number, y : number){
        super(sprite,x, y);
        this.speed = 5;
        this.backing = false;
    }

    public collided() : void {
        let sprite : AnimatedSprite = this.getSprite();
        if(!this.backing){
            this.backing = true;
            let ang : number = sprite.getAngle();
            sprite.setAngle(ang + Math.PI);
            const back = (delay : number) => {
                setTimeout(() => {
                    sprite.setAngle(ang);
                    this.backing = false;
                }, delay)
            }
            back(2000);
        }
    }

    public update(delta : number) : void{
        this.move(this.speed);
    }

}