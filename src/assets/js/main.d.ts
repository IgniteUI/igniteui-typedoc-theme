declare namespace typedoc {
    interface IService {
        constructor: any;
        name: string;
        instance: any;
        priority: number;
    }
    interface IComponent {
        constructor: any;
        selector: string;
        priority: number;
        namespace: string;
    }
    function registerService(constructor: any, name: string, priority?: number): void;
    function registerComponent(constructor: any, selector: string, priority?: number, namespace?: string): void;
    class Application {
        constructor();
        private createServices;
        createComponents(context: HTMLElement, namespace?: string): void;
    }
}
declare namespace typedoc {
    interface IComponentOptions {
        el: HTMLElement;
    }
    class Component {
        protected el: HTMLElement;
        constructor(options: IComponentOptions);
    }
}
declare namespace typedoc {
    interface Point {
        x: number;
        y: number;
    }
    var pointerDown: string;
    var pointerMove: string;
    var pointerUp: string;
    var pointerDownPosition: Point;
    var preventNextClick: boolean;
    var isPointerDown: boolean;
    var isPointerTouch: boolean;
    var hasPointerMoved: boolean;
    var isMobile: boolean;
}
declare namespace typedoc {
}
declare namespace typedoc {
    interface IEventListener<T> {
        (evt: CustomEvent<T>): void;
    }
    class EventTarget {
        private listeners;
        addEventListener<T>(type: string, callback: IEventListener<T>): void;
        removeEventListener<T>(type: string, callback: IEventListener<T>): void;
        dispatchEvent<T>(event: CustomEvent<T>): boolean;
    }
}
declare namespace typedoc {
    const throttle: <A extends any[]>(fn: (...args: A) => void, wait?: number) => (...args: A) => void;
}
declare namespace typedoc {
    class Viewport extends EventTarget {
        scrollTop: number;
        lastY: number;
        width: number;
        height: number;
        constructor();
        triggerResize(): void;
        onResize(): void;
        onScroll(): void;
    }
    var viewport: Viewport;
}
declare namespace typedoc {
    class MenuHighlight extends Component {
        private anchors;
        private index;
        constructor(options: IComponentOptions);
        private createAnchors;
        private onResize;
        private onScroll;
    }
}
declare namespace typedoc.search {
    class Search extends Component {
        private field;
        private results;
        private base;
        private query;
        private loadingState;
        private hasFocus;
        private preventPress;
        private data;
        private index;
        private resultClicked;
        constructor(options: IComponentOptions);
        private loadIndex;
        private updateResults;
        private setLoadingState;
        private setHasFocus;
        private setQuery;
        private setCurrentResult;
        private gotoCurrentResult;
        private bindEvents;
    }
}
declare namespace typedoc {
}
declare namespace typedoc {
}
declare namespace typedoc {
    var app: Application;
}
