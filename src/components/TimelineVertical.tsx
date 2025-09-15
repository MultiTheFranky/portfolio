import type { CSSProperties, FC } from "react";
import timeline from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export type TimelineEntry = {
    title: string;
    date: string;
    description: string;
    icon?: string;
};

type TimelineVerticalProps = {
    entries: TimelineEntry[];
};

const cardStyle: CSSProperties = {
    background: "var(--timeline-card-bg)",
    border: "1px solid var(--timeline-card-border)",
    borderRadius: "0.75rem",
    boxShadow: "var(--timeline-card-shadow)",
    color: "var(--timeline-card-text)",
    padding: "1.5rem 1.75rem"
};

const arrowStyle: CSSProperties = {
    borderRight: "7px solid var(--timeline-card-border)"
};

const iconStyle: CSSProperties = {
    background: "var(--timeline-icon-bg)",
    color: "var(--timeline-icon-color)",
    boxShadow: "var(--timeline-icon-shadow)"
};

const { VerticalTimeline, VerticalTimelineElement } = timeline;

const TimelineVertical: FC<TimelineVerticalProps> = ({ entries }) => (
    <VerticalTimeline className="timeline-react" animate lineColor="rgba(148, 163, 184, 0.4)">
        {entries.map((entry) => (
            <VerticalTimelineElement
                key={`${entry.title}-${entry.date}`}
                contentStyle={cardStyle}
                contentArrowStyle={arrowStyle}
                date={entry.date}
                dateClassName="timeline-date"
                icon={
                    <span className="timeline-icon-symbol" aria-hidden="true">
                        {entry.icon ?? entry.title.charAt(0)}
                    </span>
                }
                iconClassName="timeline-icon"
                iconStyle={iconStyle}
                textClassName="timeline-card"
            >
                <h3 className="timeline-heading">{entry.title}</h3>
                <p className="timeline-description">{entry.description}</p>
            </VerticalTimelineElement>
        ))}
    </VerticalTimeline>
);

export default TimelineVertical;

