import type {
    ComponentType,
    CSSProperties,
    MouseEventHandler,
    ReactNode
} from "react";

declare module "react-vertical-timeline-component" {
    export interface VerticalTimelineProps {
        animate?: boolean;
        className?: string;
        layout?: "1-column" | "1-column-left" | "1-column-right" | "2-columns";
        lineColor?: string;
        children?: ReactNode;
    }

    export interface VerticalTimelineElementProps {
        children?: ReactNode;
        className?: string;
        contentArrowStyle?: CSSProperties;
        contentStyle?: CSSProperties;
        date?: ReactNode;
        dateClassName?: string;
        icon?: ReactNode;
        iconClassName?: string;
        iconStyle?: CSSProperties;
        iconOnClick?: MouseEventHandler<HTMLElement> | null;
        onTimelineElementClick?: MouseEventHandler<HTMLDivElement> | null;
        id?: string;
        position?: "left" | "right";
        style?: CSSProperties;
        textClassName?: string;
        visible?: boolean;
        shadowSize?: "small" | "medium" | "large";
        intersectionObserverProps?: {
            root?: Element | null;
            rootMargin?: string;
            threshold?: number;
            triggerOnce?: boolean;
        };
    }

    interface TimelineModule {
        VerticalTimeline: ComponentType<VerticalTimelineProps>;
        VerticalTimelineElement: ComponentType<VerticalTimelineElementProps>;
    }

    const timeline: TimelineModule;

    export default timeline;
}
