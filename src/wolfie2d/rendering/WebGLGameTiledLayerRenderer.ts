import { MathUtilities } from "../math/MathUtilities"
import { TiledLayer } from "../scene/tiles/TiledLayer"
import { TileSet } from "../scene/tiles/TileSet"
import { WebGLGameRenderingComponent } from './WebGLGameRenderingComponent'
import { WebGLGameTexture } from './WebGLGameTexture'
import { Viewport } from '../scene/Viewport'

export class WebGLGameTiledLayerRenderer extends WebGLGameRenderingComponent {
    public constructor() {
        super();
    }

    /**
     * This function generates the array of attribute data needed to 
     * render our TiledLayer and puts it in the tiled layer argument.
     */
    public generateVertexData(tiledLayer: TiledLayer): Float32Array {
        let someNumberYouHaveToDetermine : number = 4;
        let dataToFill = [someNumberYouHaveToDetermine];
        let vertexData: Float32Array = new Float32Array(dataToFill);
        return vertexData;
    }

    public getVertexData(renderSetupData: object): Float32Array {
        // WE WILL NEED THIS TO KNOW HOW LARGE TO MAKE OUR VERTEX DATA BUFFER
        let tiledLayers: Array<TiledLayer> = <Array<TiledLayer>>renderSetupData;
        let tiledLayer: TiledLayer = tiledLayers[0];
        return this.generateVertexData(tiledLayer);
    }

    public getShaderAttributeNames(): string[] {
        // YOU'LL NEED TO DEFINE THIS METHOD
        return [this.A_POSITION, this.A_TEX_COORD];
    }

    public getShaderUniformNames(): string[] {
        // YOU'LL NEED TO DEFINE THIS METHOD
        return [this.U_MESH_TRANSFORM, this.U_SAMPLER];
    }

    public render(  webGL: WebGLRenderingContext,
                    viewport : Viewport,
                    tiledLayers: Array<TiledLayer>): void {

            // SELECT THE ANIMATED SPRITE RENDERING SHADER PROGRAM FOR USE
        let shaderProgramToUse = this.shader.getProgram();
        webGL.useProgram(shaderProgramToUse);

        // AND THEN RENDER EACH LAYER
        for (let tiledLayer of tiledLayers) {
            this.renderTiledLayer(webGL, viewport, tiledLayer);
        }
    }

    private renderTiledLayer(
        webGL: WebGLRenderingContext,
        viewport : Viewport,
        tiledLayer: TiledLayer) {
            // YOU'LL NEED TO DEFINE THIS METHOD
        
        let canvasWidth : number = webGL.canvas.width;
        let canvasHeight : number = webGL.canvas.height;
        let texture : WebGLGameTexture = tiledLayer.getTileSet().getTexture();

        let viewportX : number = viewport.getX();
        let viewportY : number = viewport.getY();

        let tileWidth : number = texture.width;
        let tileHeight : number = texture.height;
        
        MathUtilities.identity(this.meshTransform);

        webGL.bindBuffer(webGL.ARRAY_BUFFER, this.vertexDataBuffer);
        webGL.bindTexture(webGL.TEXTURE_2D, texture.webGLTexture);

        let a_PositionLocation : GLuint = this.webGLAttributeLocations.get(this.A_POSITION);
        webGL.vertexAttribPointer(a_PositionLocation, this.FLOATS_PER_TEXTURE_COORDINATE, webGL.FLOAT, false, this.TOTAL_BYTES, this.VERTEX_POSITION_OFFSET);
        webGL.enableVertexAttribArray(a_PositionLocation);
        let a_TexCoordLocation : GLuint = this.webGLAttributeLocations.get(this.A_TEX_COORD);
        webGL.vertexAttribPointer(a_TexCoordLocation, this.FLOATS_PER_TEXTURE_COORDINATE, webGL.FLOAT, false, this.TOTAL_BYTES, this.TEXTURE_COORDINATE_OFFSET);
        webGL.enableVertexAttribArray(a_TexCoordLocation);

        let u_MeshTransformLocation : WebGLUniformLocation = this.webGLUniformLocations.get(this.U_MESH_TRANSFORM);
        webGL.uniformMatrix4fv(u_MeshTransformLocation, false, this.meshTransform.getData());
        let u_SamplerLocation : WebGLUniformLocation = this.webGLUniformLocations.get(this.U_SAMPLER);
        webGL.uniform1i(u_SamplerLocation, texture.webGLTextureId);

        webGL.drawArrays(webGL.TRIANGLE_STRIP, this.INDEX_OF_FIRST_VERTEX, this.NUM_VERTICES);

    }
}