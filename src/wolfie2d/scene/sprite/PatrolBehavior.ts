import { AnimatedSprite} from "./AnimatedSprite";
import {Behavior} from "./Behavior";

export class PatrolBehavoir extends Behavior{
    private speed : number;

    public constructor(sprite : AnimatedSprite){
        super(sprite);
        this.speed = 3;
    }

    public update(delta : number) : void{
        this.getSprite().move(this.speed);
    }

}