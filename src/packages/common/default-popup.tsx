import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '../../components/controls/button/button';
import { TrashIcon } from '../../components/controls/icon/trash';
import { Textfield } from '../../components/controls/textfield/textfield';
import { ModelState } from '../../components/store/model-state';
import { styled } from '../../components/theme/styles';
import { Element } from '../../services/element/element';
import { ElementRepository } from '../../services/element/element-repository';

const Flex = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

class DefaultPopupComponent extends Component<Props> {
  render() {
    const { element } = this.props;

    return (
      <div>
        <section>
          <Flex>
            <Textfield value={element.name} onChange={this.onUpdate} />
            <Button color="link" tabIndex={-1} onClick={() => this.props.delete(element.id)}>
              <TrashIcon />
            </Button>
          </Flex>
        </section>
      </div>
    );
  }
  private onUpdate = (value: string) => {
    const { element, rename } = this.props;
    rename(element.id, value);
  };
}

type OwnProps = {
  element: Element;
};

type StateProps = {};

type DispatchProps = {
  rename: typeof ElementRepository.rename;
  delete: typeof ElementRepository.delete;
};

type Props = OwnProps & StateProps & DispatchProps;

const enhance = connect<StateProps, DispatchProps, OwnProps, ModelState>(
  null,
  {
    rename: ElementRepository.rename,
    delete: ElementRepository.delete,
  },
);

export const DefaultPopup = enhance(DefaultPopupComponent);
