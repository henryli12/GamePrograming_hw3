import { AnimatedSprite} from "./AnimatedSprite";
import {Behavior} from "./Behavior";

export class EnemyBehavior extends Behavior{
    private speed : number;
    private moveLimit : number;

    public constructor(sprite : AnimatedSprite){
        super(sprite);
        this.speed = 3;
        this.moveLimit = Math.random() * 500 + 100;
    }

    public update(delta : number) : void{
        if(this.moveLimit < 0){
            this.getSprite().randomAngle();
            this.moveLimit = Math.random() * 500 + 100;
        }
        this.getSprite().move(this.speed);
        this.moveLimit -= 1;
    }

}