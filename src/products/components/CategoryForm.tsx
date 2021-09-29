import React from 'react';

import Button from '../../components/Button';
import FormControl from '../../components/form/Control';
import CommonForm from '../../components/form/Form';
import FormGroup from '../../components/form/Group';
import ControlLabel from '../../components/form/Label';
import Uploader from '../../components/Uploader';
import { FormColumn, FormWrapper } from '../../styles/main';
import { ModalFooter } from '../../styles/main';
import { IAttachment, IButtonMutateProps, IFormProps } from '../../types';
import { extractAttachment, generateCategoryOptions } from '../../utils';
import { IProductCategory } from '../types';
import { PRODUCT_CATEGORY_STATUSES } from '../constants';

type Props = {
  categories: IProductCategory[];
  category?: IProductCategory;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  closeModal: () => void;
};

type State = {
  attachment: IAttachment
}

class CategoryForm extends React.Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      attachment: {} as IAttachment
    };
  }

  renderContent = (formProps: IFormProps) => {
    const { renderButton, closeModal, category, categories } = this.props;
    const { values, isSubmitted } = formProps;

    const object = category || ({} as IProductCategory);

    if (category) {
      values._id = category._id;
      values.attachment = category.attachment
        ? { ...category.attachment, __typename: undefined }
        : null;
    } else {
      values.attachment = this.state.attachment;
    }

    const onChangeAttachment = (files: IAttachment[]) => {

      values.attachment = files.length ? files[0] : null;
      object.attachment = values.attachment;
      this.setState({ attachment: values.attachment });
    };

    const attachments =
      (object.attachment && extractAttachment([object.attachment])) || [];

    return (
      <>
        <FormGroup>
          <ControlLabel required={true}>Name</ControlLabel>
          <FormControl
            {...formProps}
            name="name"
            defaultValue={object.name}
            autoFocus={true}
            required={true}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel required={true}>Code</ControlLabel>
          <FormControl
            {...formProps}
            name="code"
            defaultValue={object.code}
            required={true}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <FormControl
            {...formProps}
            name="description"
            componentClass="textarea"
            rows={5}
            defaultValue={object.description}
          />
        </FormGroup>

        <FormWrapper>
          <FormColumn>
            <FormGroup>
              <ControlLabel>State</ControlLabel>

              <FormControl
                {...formProps}
                name="status"
                componentClass="select"
                defaultValue={object.status}
                options={PRODUCT_CATEGORY_STATUSES}
              >
              </FormControl>
            </FormGroup>
          </FormColumn>
          <FormColumn>
            <FormGroup>
              <ControlLabel>Image</ControlLabel>

              <Uploader
                defaultFileList={attachments}
                onChange={onChangeAttachment}
                multiple={false}
                single={true}
              />
            </FormGroup>
          </FormColumn>
        </FormWrapper>

        <FormGroup>
          <ControlLabel>Parent Category</ControlLabel>

          <FormControl
            {...formProps}
            name="parentId"
            componentClass="select"
            defaultValue={object.parentId}
          >
            <option value="" />
            {generateCategoryOptions(categories, object._id)}
          </FormControl>
        </FormGroup>

        <ModalFooter>
          <Button
            btnStyle="simple"
            onClick={closeModal}
            icon="times-circle"
            uppercase={false}
          >
            Close
          </Button>

          {renderButton({
            name: 'product & service category',
            values,
            isSubmitted,
            callback: closeModal,
            object: category
          })}
        </ModalFooter>
      </>
    );
  };

  render() {
    return <CommonForm renderContent={this.renderContent} />;
  }
}

export default CategoryForm;
