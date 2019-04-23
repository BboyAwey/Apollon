import { DeepPartial } from 'redux';
import { Styles } from './components/theme/styles';
import { DiagramType } from './packages/diagram-type';
import { ElementType as UMLElementType } from './packages/element-type';
import { RelationshipType as UMLRelationshipType } from './packages/relationship-type';

export enum Locale {
  en = 'en',
  de = 'de',
  zh = 'zh'
}

export type ElementType = UMLElementType | UMLRelationshipType;

export interface UMLModel {
  version: string;
  type: DiagramType;
  size: { width: number; height: number };
  interactive: Selection;
  assessments: Assessment[];
  elements: UMLElement[];
  relationships: UMLRelationship[];
}

export interface Assessment {
  modelElementId: string;
  elementType: ElementType;
  score: number;
  feedback?: string;
}

export { UMLClassAssociation, UMLClassifier } from './packages/class-diagram';
export { UMLCommunicationLink } from './packages/communication-diagram';
export { DiagramType };
export { UMLElementType };
export { UMLRelationshipType };
export type Theme = DeepPartial<Styles>;

export interface Element {
  id: string;
  name: string;
  type: ElementType;
  highlight?: string;
  bounds: { x: number; y: number; width: number; height: number };
}

export interface UMLElement extends Element {
  owner: string | null;
  type: UMLElementType;
}

export enum Direction {
  Up = 'Up',
  Right = 'Right',
  Down = 'Down',
  Left = 'Left',
}

export interface UMLRelationship extends Element {
  type: UMLRelationshipType;
  path: Array<{ x: number; y: number }>;
  source: {
    element: string;
    direction: Direction;
  };
  target: {
    element: string;
    direction: Direction;
  };
}

export interface Selection {
  elements: string[];
  relationships: string[];
}

export enum ApollonMode {
  Modelling = 'Modelling',
  Exporting = 'Exporting',
  Assessment = 'Assessment',
}

export interface ApollonOptions {
  type?: DiagramType;
  mode?: ApollonMode;
  readonly?: boolean;
  enablePopups?: boolean;
  model?: UMLModel;
  theme?: Theme;
  locale?: Locale;
}

export interface ExportOptions {
  margin?: number | { top?: number; right?: number; bottom?: number; left?: number };
  keepOriginalSize?: boolean;
  include?: string[];
  exclude?: string[];
}

export interface SVG {
  svg: string;
  clip: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
