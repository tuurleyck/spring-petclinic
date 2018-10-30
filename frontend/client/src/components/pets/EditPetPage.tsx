import * as React from 'react';

import { IOwner, IEditablePet, ISelectOption } from '../../types/index';
import { request } from '../../util/index';
import { request_promise } from '../../util/index';
import { APMService } from '../../main';
import LoadingPanel from './LoadingPanel';
import PetEditor from './PetEditor';

import createPetEditorModel from './createPetEditorModel';

interface IEditPetPageProps {
  params: {
    ownerId: string,
    petId: string
  };
}

interface IEditPetPageState {
  pet?: IEditablePet;
  owner?: IOwner;
  pettypes?: ISelectOption[];
};

export default class EditPetPage extends React.Component<IEditPetPageProps, IEditPetPageState> {

  componentWillMount() {
    APMService.getInstance().startTransaction('EditPetPage');
  }

  componentDidMount() {

    const { params } = this.props;


    const loadPetPromise = request_promise(`api/pets/${params.petId}`);

    createPetEditorModel(this.props.params.ownerId, loadPetPromise)
      .then(model => {
            this.setState(model);
            APMService.getInstance().endSpan();
            APMService.getInstance().endTransaction();
          }
      );
  }

  render() {
    if (!this.state) {
      return <LoadingPanel />;
    }

    return <PetEditor {...this.state} />;
  }
}