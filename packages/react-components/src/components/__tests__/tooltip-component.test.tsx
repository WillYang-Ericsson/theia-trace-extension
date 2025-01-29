import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { TooltipComponent } from '../tooltip-component';

// Mock ReactTooltip since we don't need its actual implementation for these tests
jest.mock('react-tooltip', () => {
    return function MockReactTooltip(props: any) {
        return (
            <div
                data-testid="mock-tooltip"
                id={props.id}
                className="__react_component_tooltip"
                data-type={props.type}
                data-effect={props.effect}
                data-place={props.place}
                data-clickable={props.clickable}
                data-scroll-hide={props.scrollHide}
            >
                {props.children}
            </div>
        );
    };
});

describe('TooltipComponent', () => {
    it('renders itself', () => {
        const { container } = render(<TooltipComponent visible={true} />);
        expect(screen.getByTestId('mock-tooltip')).toBeTruthy();
    });

    it('renders an hourglass when visible with no content', () => {
        const { container } = render(<TooltipComponent visible={true} />);
        const tooltip = screen.getByTestId('mock-tooltip');
        expect(tooltip.textContent).toBe('⏳');
    });

    it('renders the provided content if visible with content', () => {
        const testContent = <div>Test Content</div>;
        const { container } = render(<TooltipComponent visible={true} content={testContent} />);
        const tooltip = screen.getByTestId('mock-tooltip');
        expect(tooltip.textContent).toBe('Test Content');
    });

    it('does not render when not visible', () => {
        const { container } = render(<TooltipComponent visible={false} content="Test Content" />);
        const tooltip = screen.queryByTestId('mock-tooltip');
        expect(tooltip).toBeNull();
    });

    it('has the correct tooltip ID', () => {
        const { container } = render(<TooltipComponent visible={true} />);
        const tooltip = screen.getByTestId('mock-tooltip');
        expect(tooltip.id).toBe('tooltip-component');
    });

    it('applies correct tooltip configuration', () => {
        const { container } = render(<TooltipComponent visible={true} />);
        const tooltip = screen.getByTestId('mock-tooltip');

        expect(tooltip.getAttribute('data-type')).toBe('info');
        expect(tooltip.getAttribute('data-effect')).toBe('float');
        expect(tooltip.getAttribute('data-place')).toBe('bottom');
        expect(tooltip.getAttribute('data-clickable')).toBe('true');
        expect(tooltip.getAttribute('data-scroll-hide')).toBe('true');
    });

    it('renders complex React nodes as content', () => {
        const complexContent = (
            <div>
                <h1>Title</h1>
                <p>Description</p>
                <span>Details</span>
            </div>
        );
        const { container } = render(<TooltipComponent visible={true} content={complexContent} />);
        const tooltip = screen.getByTestId('mock-tooltip');
        expect(tooltip.textContent).toBe('TitleDescriptionDetails');
    });

    it('renders null content as hourglass', () => {
        const { container } = render(<TooltipComponent visible={true} content={null} />);
        const tooltip = screen.getByTestId('mock-tooltip');
        expect(tooltip.textContent).toBe('⏳');
    });

    it('renders undefined content as hourglass', () => {
        const { container } = render(<TooltipComponent visible={true} content={undefined} />);
        const tooltip = screen.getByTestId('mock-tooltip');
        expect(tooltip.textContent).toBe('⏳');
    });
});
