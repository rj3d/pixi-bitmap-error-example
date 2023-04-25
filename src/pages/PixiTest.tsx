import * as PIXI from 'pixi.js'

import * as React from "react";


export class PixiTest extends React.Component<{}, {}>{
    private el: HTMLDivElement | null = null
    private renderer!: PIXI.Renderer;
    private rootContainer: PIXI.Container
    private stage: PIXI.Container

    public constructor(props: {}) {
        super(props)

        this.rootContainer = new PIXI.Container()

        this.stage = new PIXI.Container()
        this.stage.interactive = true
        this.rootContainer.addChild(this.stage)
        const ticker = PIXI.Ticker.shared
        ticker.autoStart = false
        ticker.stop()
    }

    private initializeGraphics(
    ): void {
        if (this.el == null) return

        // Setting up the renderer
        this.renderer = new PIXI.Renderer({
            width: 400,
            height: 400,
            backgroundAlpha: 0,
        })
        this.renderer.reset()
        //@ts-ignore
        this.el.appendChild(this.renderer.view)
    }

    private renderThing(): void {
        fetch('https://pixijs.io/examples/examples/assets/bunny.png')
            .then(res => res.blob())
            .then(blob => createImageBitmap(blob))
            .then( (bitmap) =>{
                // Comment out these two lines and bunny will display on the renderer.
                // If these two lines are not commented out then no bunny will be rendered.
                const bunnyDel = PIXI.Sprite.from(bitmap);
                bunnyDel.destroy({ children: true, texture: true, baseTexture: true })

                const bunny = PIXI.Sprite.from(bitmap);

                bunny.x = 0;
                bunny.y = 0;
        
                this.stage.removeChildren()
        
                this.stage.addChild(bunny);
        
                this.renderer.render(this.rootContainer)
    }
)
    }


    private renderImage(el: HTMLDivElement | null): void {
        if (el == null) return
        this.el = el
        if (!this.el.hasChildNodes()) {
            this.initializeGraphics()
        }
        this.renderThing()
    }

    public render(): React.ReactNode{
        return(
            <div
            className="pixiimage"
            ref={(el): void => {
                this.renderImage(el)
            }}
        />
        )
    }
}