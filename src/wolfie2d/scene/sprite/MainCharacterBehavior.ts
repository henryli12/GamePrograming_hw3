import { AnimatedSprite} from "./AnimatedSprite";
import {Behavior} from "./Behavior";

export class MainCharacterBehavior extends Behavior{
    private speed : number;
    public constructor(sprite : AnimatedSprite){
        super(sprite);
        this.speed = 5;
    }

    public update(delta : number) : void{
        this.getSprite().goTarget(this.speed);
    }

}