import {SceneGraph} from '../scene/SceneGraph'

export class GamePhysics {
    constructor() {

    }

    update(sceneGraph : SceneGraph) : void {
        // UPDATE ALL OBJECT POSITIONS ACCORDING TO THEIR VELOCITIES
        // BUT MAKE SURE TO PERFORM COLLISION DETECTION AS WELL
        // NOTE, FOR THIS YOU SHOULD MAKE SURE EACH SCENE OBJECT
        // HAS A BOUNDING VOLUME LIKE EITHER AN AABB OR A CIRCLE
        let main = sceneGraph.getMainSprite();
        // console.log(main.getPosition());
    }
}
