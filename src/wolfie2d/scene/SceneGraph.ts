import {SceneObject} from './SceneObject'
import {AnimatedSprite} from './sprite/AnimatedSprite'
import {TiledLayer} from './tiles/TiledLayer'
import {TileSet} from './tiles/TileSet'
import {Viewport} from './Viewport';

export class SceneGraph {
    // AND ALL OF THE ANIMATED SPRITES, WHICH ARE NOT STORED
    // SORTED OR IN ANY PARTICULAR ORDER. NOTE THAT ANIMATED SPRITES
    // ARE SCENE OBJECTS
    private animatedSprites : Array<AnimatedSprite>;
    private mainSprite : AnimatedSprite;
    private enemySprites : Array<AnimatedSprite>;
    private patrolSprites : Array<AnimatedSprite>;

    // SET OF VISIBLE OBJECTS, NOTE THAT AT THE MOMENT OUR
    // SCENE GRAPH IS QUITE SIMPLE, SO THIS IS THE SAME AS
    // OUR LIST OF ANIMATED SPRITES
    private visibleSet : Array<SceneObject>;

    // WE ARE ALSO USING A TILING ENGINE FOR RENDERING OUR LEVEL
    // NOTE THAT WE MANAGE THIS HERE BECAUSE WE MAY INVOLVE THE TILED
    // LAYERS IN PHYSICS AND PATHFINDING AS WELL
    private tiledLayers : Array<TiledLayer>;
    private tileSets : Array<TileSet>;

    // THE VIEWPORT IS USED TO FILTER OUT WHAT IS NOT VISIBLE
    private viewport : Viewport;

    public constructor() {
        // DEFAULT CONSTRUCTOR INITIALIZES OUR DATA STRUCTURES
        this.clear();
    }

    public clear() : void {
        this.animatedSprites = [];
        this.enemySprites = [];
        this.patrolSprites = [];
        this.visibleSet = [];
        this.tiledLayers = [];
        this.tileSets = [];
    }

    public addTileSet(tileSetToAdd : TileSet) : number {
        return this.tileSets.push(tileSetToAdd) - 1;
    }

    public getNumTileSets() : number {
        return this.tileSets.length;
    }

    public getTileSet(index : number) : TileSet {
        return this.tileSets[index];
    }

    public addLayer(layerToAdd : TiledLayer) : void {
        this.tiledLayers.push(layerToAdd);
    }

    public getNumTiledLayers() : number {
        return this.tiledLayers.length;
    }

    public getTiledLayers() : Array<TiledLayer> {
        return this.tiledLayers;
    }

    public getTiledLayer(layerIndex : number) : TiledLayer {
        return this.tiledLayers[layerIndex];
    }

    public getNumSprites() : number {
        return this.animatedSprites.length;
    }

    public setViewport(initViewport : Viewport) : void {
        this.viewport = initViewport;
    }

    public getViewport() : Viewport { 
        return this.viewport;
    }

    public addAnimatedSprite(sprite : AnimatedSprite) : void {
        this.animatedSprites.push(sprite);
    }

    public addEnemy(sprite : AnimatedSprite) : void{
        this.enemySprites.push(sprite);
        this.animatedSprites.push(sprite);
    }

    public addPatrolSprite(sprite : AnimatedSprite) : void {
        this.patrolSprites.push(sprite);
        this.animatedSprites.push(sprite);
    }
    
    public getEnemies() : Array<AnimatedSprite>{
        return this.enemySprites;
    }

    public getPatrolSprites() : Array<AnimatedSprite>{
        return this.patrolSprites;
    }

    public kill(sprite : AnimatedSprite) : void {
        let index : number = this.animatedSprites.indexOf(sprite);
        this.animatedSprites.splice(index, 1);
        index = this.enemySprites.indexOf(sprite);
        this.enemySprites.splice(index, 1);
    }

    public setMainSprite(sprite : AnimatedSprite) : void {
        this.mainSprite = sprite;
        this.animatedSprites.push(sprite);
    }

    public getMainSprite() : AnimatedSprite {
        return this.mainSprite;
    }
    public getSpriteAt(testX : number, testY : number) : AnimatedSprite {
        for (let sprite of this.animatedSprites) {
            if (sprite.contains(testX, testY))
                return sprite;
        }
        return null;
    }

    /**
     * update
     * 
     * Called once per frame, this function updates the state of all the objects
     * in the scene.
     * 
     * @param delta The time that has passed since the last time this update
     * funcation was called.
     */

    public checkWin() : boolean {
        if(this.enemySprites.length === 0){
            return true;
        }else{
            return false;
        }
    }
    
    public update(delta : number) : void {
        for (let sprite of this.animatedSprites) {
            sprite.update(delta, this);
        }
    }

    public scope() : Array<SceneObject> {
        // CLEAR OUT THE OLD
        this.visibleSet = [];
        let minx : number = this.viewport.getX() - 120;
        let miny : number = this.viewport.getY() - 120;
        let maxx : number = this.viewport.getWidth() + this.viewport.getX();
        let maxy : number = this.viewport.getHeight() + this.viewport.getY();
        // PUT ALL THE SCENE OBJECTS INTO THE VISIBLE SET
        let x : number = 0;
        let y : number = 0;
        for (let sprite of this.animatedSprites) {
            x = sprite.getPosition().getX();
            y = sprite.getPosition().getY();
            if((x < maxx) && (x > minx) && (y < maxy) && (y > miny)){
                this.visibleSet.push(sprite);
            }
        }


        return this.visibleSet;
    }
}