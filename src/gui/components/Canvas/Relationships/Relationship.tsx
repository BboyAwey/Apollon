import * as React from "react";
import { withTheme } from "styled-components";
import { Theme } from "../../../theme";
import * as UML from "../../../../core/domain";
import { getMarkerIdForRelationshipKind } from "../../../../rendering/renderers/svg/defs/RelationshipMarkers";
import { getSvgDasharrayForRelationshipKind } from "../../../../rendering/renderers/svg/Relationship";
import RelationshipLabels from "../../../../rendering/renderers/svg/RelationshipLabels";

class Relationship extends React.Component<Props, State> {
    state: State = {
        isMouseOver: false
    };

    onMouseDown = (e: React.MouseEvent<SVGPolylineElement>) => {
        e.stopPropagation();

        switch (this.props.editorMode) {
            case UML.EditorMode.ModelingView:
                if (e.shiftKey) {
                    this.props.onToggleSelection();
                } else if (!this.props.isSelected) {
                    this.props.onSelect();
                }
                break;

            case UML.EditorMode.InteractiveElementsView:
                this.props.onToggleInteractiveElements();
                break;
        }
    };

    render() {
        const { isInteractiveElement, interactiveElementsMode } = this.props;

        const visibility =
            isInteractiveElement && interactiveElementsMode === UML.InteractiveElementsMode.Hidden
                ? "hidden"
                : undefined;

        const { relationship, path } = this.props.relationship;

        const polylinePoints = path.map(point => `${point.x} ${point.y}`).join(",");

        const markerId = getMarkerIdForRelationshipKind(relationship.kind);
        const markerEnd = markerId === null ? undefined : `url(#${markerId})`;

        const outlineStroke = this.computeOutlineStroke();
        const strokeDasharray = getSvgDasharrayForRelationshipKind(relationship.kind);

        return (
            <>
                <RelationshipLabels relationship={relationship} relationshipPath={path} />
                <polyline
                    points={polylinePoints}
                    strokeWidth="15"
                    stroke={outlineStroke}
                    fill="none"
                    onMouseDown={this.onMouseDown}
                    onMouseEnter={() => this.setState({ isMouseOver: true })}
                    onMouseLeave={() => this.setState({ isMouseOver: false })}
                    onDoubleClick={this.props.openDetailsPopup}
                    style={{ visibility }}
                />
                <polyline
                    points={polylinePoints}
                    strokeWidth="1"
                    stroke="black"
                    strokeDasharray={strokeDasharray}
                    fill="none"
                    markerEnd={markerEnd}
                    pointerEvents="none"
                    style={{ visibility }}
                />
            </>
        );
    }

    computeOutlineStroke() {
        const { editorMode, theme, isSelected, isInteractiveElement } = this.props;
        const { isMouseOver } = this.state;

        if (editorMode === UML.EditorMode.InteractiveElementsView) {
            if (isMouseOver) {
                return theme.interactiveAreaHoverColor;
            }

            if (isInteractiveElement) {
                return theme.interactiveAreaColor;
            }

            return "transparent";
        }

        return isMouseOver || isSelected ? theme.highlightColor : "transparent";
    }
}

export default withTheme(Relationship);

interface Props {
    relationship: UML.LayoutedRelationship;
    editorMode: UML.EditorMode;
    theme: Theme;
    isSelected: boolean;
    onSelect: () => void;
    onToggleSelection: () => void;
    isInteractiveElement: boolean;
    interactiveElementsMode: UML.InteractiveElementsMode;
    onToggleInteractiveElements: () => void;
    openDetailsPopup: () => void;
}

interface State {
    isMouseOver: boolean;
}
