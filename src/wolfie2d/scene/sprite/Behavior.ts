import {AnimatedSprite} from "./AnimatedSprite";

export class Behavior{
    private sprite : AnimatedSprite;
    public constructor(sprite : AnimatedSprite){
        this.sprite = sprite;
    }
    public getSprite() : AnimatedSprite{
        return this.sprite;
    }
    public update(delta : number){
        
    }
}