/// <reference path='../Application.ts' />
/// <reference path='../EventTarget.ts' />
/// <reference path='../utils/trottle.ts' />

namespace typedoc
{
    /**
     * A global service that monitors the window size and scroll position.
     */
    export class Viewport extends EventTarget
    {
        /**
         * The current scroll position.
         */
        scrollTop:number = 0;

        /**
         * The previous scrollTop.
         */
        lastY:number = 0;

        /**
         * The width of the window.
         */
        width:number = 0;

        /**
         * The height of the window.
         */
        height:number = 0;

        /**
         * Create new Viewport instance.
         */
        constructor() {
            super();

            window.addEventListener('scroll', throttle(() => this.onScroll(), 10));
            window.addEventListener('resize', throttle(() => this.onResize(), 10));

            this.onResize();
            this.onScroll();
        }


        /**
         * Trigger a resize event.
         */
        triggerResize() {
            const event = new CustomEvent('resize', {
                detail: {
                    width: this.width,
                    height: this.height,
                }
            });

            this.dispatchEvent(event);
        }


        /**
         * Triggered when the size of the window has changed.
         */
        onResize() {
            this.width = window.innerWidth || 0;
            this.height = window.innerHeight || 0;

            const event = new CustomEvent('resize', {
                detail: {
                    width: this.width,
                    height: this.height,
                }
            });

            this.dispatchEvent(event);
        }


        /**
         * Triggered when the user scrolled the viewport.
         */
        onScroll() {
            this.scrollTop = window.scrollY || 0;

            const event = new CustomEvent('scroll', {
                detail: {
                    scrollTop: this.scrollTop,
                }
            });

            this.dispatchEvent(event);
        }
    }


    /**
     * Register service.
     */
    export var viewport:Viewport;
    registerService(Viewport, 'viewport');
}
