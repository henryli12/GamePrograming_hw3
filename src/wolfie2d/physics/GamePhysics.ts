import {SceneGraph} from '../scene/SceneGraph';
import {AnimatedSprite} from '../scene/sprite/AnimatedSprite';
import { SceneObject } from '../scene/SceneObject';

export class GamePhysics {
    constructor() {

    }

    public checkTouch(sprite : AnimatedSprite, sceneGraph : SceneGraph) : void{
        let mainX : number = sprite.getPosition().getX() + 128 / 2;
        let mainY : number = sprite.getPosition().getY() + 128 / 2;
        let targets : Array<AnimatedSprite> = sceneGraph.getEnemies();
        let patrols : Array<AnimatedSprite> = sceneGraph.getPatrolSprites();
        for(let i = 0; i < targets.length; i++){
            let target : AnimatedSprite = targets[i];
            let targetX : number = target.getPosition().getX() + 128 / 2;
            let targetY : number = target.getPosition().getY() + 128 / 2;
            let dist : number = Math.sqrt(Math.pow((targetX - mainX), 2) + Math.pow((targetY - mainY), 2));
            if(dist < 128){
                target.collided();
            }
        }
        for(let i = 0; i < patrols.length; i++){
            let patrol : AnimatedSprite = patrols[i];
            let patrolX : number = patrol.getPosition().getX() + 128 / 2;
            let patrolY : number = patrol.getPosition().getY() + 128 / 2;
            let dist : number = Math.sqrt(Math.pow((patrolX - mainX), 2) + Math.pow((patrolY - mainY), 2));
            if(dist < 128){
                patrol.collided();
            }
        }
    }
    update(sceneGraph : SceneGraph) : void {
        // UPDATE ALL OBJECT POSITIONS ACCORDING TO THEIR VELOCITIES
        // BUT MAKE SURE TO PERFORM COLLISION DETECTION AS WELL
        // NOTE, FOR THIS YOU SHOULD MAKE SURE EACH SCENE OBJECT
        // HAS A BOUNDING VOLUME LIKE EITHER AN AABB OR A CIRCLE
        let main : AnimatedSprite = sceneGraph.getMainSprite();
        this.checkTouch(main, sceneGraph);
    }
}
