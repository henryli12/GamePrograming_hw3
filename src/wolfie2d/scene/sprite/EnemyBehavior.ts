import { AnimatedSprite} from "./AnimatedSprite";
import {Behavior} from "./Behavior";

export class EnemyBehavior extends Behavior{
    private speed : number;
    private moveLimit : number;
    private dying : boolean;

    public constructor(sprite : AnimatedSprite, x : number, y : number){
        super(sprite,x,y);
        this.speed = 3;
        this.moveLimit = Math.random() * 500 + 100;
        this.dying = false;
    }

    public update(delta : number) : void{
        if(this.moveLimit < 0){
            this.getSprite().randomAngle();
            this.moveLimit = Math.random() * 500 + 100;
        }
        this.move(this.speed);
        this.moveLimit -= 1;
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