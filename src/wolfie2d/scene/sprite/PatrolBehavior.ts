import { AnimatedSprite} from "./AnimatedSprite";
import {Behavior} from "./Behavior";

export class PatrolBehavoir extends Behavior{
    private speed : number;

    public constructor(sprite : AnimatedSprite,x : number, y : number){
        super(sprite,x, y);
        this.speed = 3;
    }

    public update(delta : number) : void{
        this.move(this.speed);
    }

}