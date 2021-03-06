import { Element } from '../../../services/element/element';
import { Boundary } from '../../../utils/geometry/boundary';

export abstract class ObjectMember extends Element {
  static features = {
    ...Element.features,
    hoverable: false,
    selectable: false,
    movable: false,
    resizable: 'NONE' as 'BOTH' | 'WIDTH' | 'HEIGHT' | 'NONE',
    connectable: false,
    droppable: false,
    editable: false,
  };

  static calculateWidth = (value: string): number => {
    const root = document.body.getElementsByClassName('apollon-editor')[0];
    if (!root) return 0;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.visibility = 'none';
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.appendChild(document.createTextNode(value));
    svg.appendChild(text);

    root.appendChild(svg);
    const width = text.getComputedTextLength();
    root.removeChild(svg);
    return width + 2 * 10;
  };

  bounds: Boundary = { ...this.bounds, height: 30 };
}
