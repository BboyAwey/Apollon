import { ClassElementType, UMLClassifier } from '..';
import { Container, IContainer } from '../../../services/container/container';
import { Element, IElement } from '../../../services/element/element';
import { UMLElement } from '../../../typings';
import { ClassAttribute } from '../class-member/class-attribute/class-attribute';
import { ClassMember } from '../class-member/class-member';
import { ClassMethod } from '../class-member/class-method/class-method';

export abstract class Classifier extends Container {
  static features = {
    ...Container.features,
    droppable: false,
    resizable: 'WIDTH' as 'WIDTH' | 'BOTH' | 'HEIGHT' | 'NONE',
  };

  get isAbstract() {
    return this.type === ClassElementType.AbstractClass;
  }

  get isInterface() {
    return this.type === ClassElementType.Interface;
  }

  get isEnumeration() {
    return this.type === ClassElementType.Enumeration;
  }

  get headerHeight() {
    return this.isInterface || this.isEnumeration ? 50 : 40;
  }

  deviderPosition = 0;

  constructor(values?: UMLClassifier);
  constructor(values?: IContainer);
  constructor(values?: UMLElement | IElement);
  constructor(values?: UMLClassifier | IContainer) {
    super();

    if (!values) return;

    if ('attributes' in values) {
      delete values.attributes;
    }
    // if ('methods' in values) {
    //   delete values.methods;
    // }

    super(values);
  }

  render(children: Element[]): Element[] {
    const attributes = children.filter(child => child instanceof ClassAttribute);
    // let methods = children.filter(child => child instanceof ClassMethod);

    let y = this.headerHeight;
    for (const attribute of attributes) {
      attribute.bounds.x = 0;
      attribute.bounds.y = y;
      attribute.bounds.width = this.bounds.width;
      y += attribute.bounds.height;
    }
    if (!this.isEnumeration) {
      this.deviderPosition = y;
      // for (const method of methods) {
      //   method.bounds.x = 0;
      //   method.bounds.y = y;
      //   method.bounds.width = this.bounds.width;
      //   y += method.bounds.height;
      // }
    } else {
      this.deviderPosition = 0;
      // methods = [];
    }
    this.ownedElements = [...attributes.map(attribute => attribute.id)/*, ...methods.map(method => method.id)*/];

    this.bounds.height = y;
    return [this, ...attributes/*, ...methods*/];
  }

  resize(children: Element[]): Element[] {
    const minWidth = children.reduce((width, child) => Math.max(width, ClassMember.calculateWidth(child.name)), 100);
    this.bounds.width = Math.max(this.bounds.width, minWidth);
    return [
      this,
      ...children.map(child => {
        child.bounds.width = this.bounds.width;
        return child;
      }),
    ];
  }

  toUMLElement(element: Classifier, children: Element[]): { element: UMLClassifier; children: Element[] } {
    const { element: base } = super.toUMLElement(element, children);
    return {
      element: {
        ...base,
        attributes: children.filter(child => child instanceof ClassAttribute).map(child => child.id)/*,
        methods: children.filter(child => child instanceof ClassMethod).map(child => child.id),*/
      },
      children,
    };
  }
}
