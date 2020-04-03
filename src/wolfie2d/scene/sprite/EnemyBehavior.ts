import { AnimatedSprite} from "./AnimatedSprite";
import {Behavior} from "./Behavior";

export class EnemyBehavior extends Behavior{
    private speed : number;
    private dying : boolean;
    private turning : boolean;

    public constructor(sprite : AnimatedSprite, x : number, y : number){
        super(sprite,x,y);
        this.speed = 3;
        this.dying = false;
        this.turning = false;
    }

    public update(delta : number) : void{
        let sprite : AnimatedSprite = this.getSprite();
        if(!this.turning){
            this.turning = true;
            const turn = (delay : number) => {
                setTimeout(() => {
                    this.getSprite().randomAngle();
                    this.turning = false;
                }, delay)
            }
            let time = Math.random() * 2000 + 1000;
            turn(time);
        }
        this.move(this.speed);
    }

    public collided() : void{
        let sprite : AnimatedSprite = this.getSprite();
        if(!this.dying){
            this.dying = true;
            sprite.setState("DYING");
            sprite.setAngle(1000);
        }
    }
}