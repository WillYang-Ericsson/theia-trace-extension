import * as React from 'react';
import ReactTooltip from 'react-tooltip';

export interface TooltipComponentProps {
    content?: React.ReactNode;
    visible?: boolean;
}

export class TooltipComponent extends React.Component<TooltipComponentProps> {
    render(): React.ReactNode {
        if (this.props.visible) {
            return (
                <ReactTooltip
                    // css overrides the "__react_component_tooltip" class
                    id="tooltip-component"
                    effect="float"
                    type="info"
                    place="bottom"
                    delayShow={500}
                    delayUpdate={500}
                    delayHide={500}
                    clickable={true}
                    scrollHide={true}
                    arrowColor="transparent"
                >
                    {this.props.content || '⏳'}
                </ReactTooltip>
            );
        }
    }
}
