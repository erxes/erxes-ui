import React from 'react';

import SelectCompanies from '../../companies/containers/SelectCompanies';
import Button from '../../components/Button';
import EditorCK from '../../components/EditorCK';
import FormControl from '../../components/form/Control';
import CommonForm from '../../components/form/Form';
import FormGroup from '../../components/form/Group';
import ControlLabel from '../../components/form/Label';
import ModalTrigger from '../../components/ModalTrigger';
import Uploader from '../../components/Uploader';
import { ModalFooter } from '../../styles/main';
import { IAttachment, IButtonMutateProps, IFormProps } from '../../types';
import { extractAttachment, generateCategoryOptions } from '../../utils';
import { TYPES } from '../constants';
import CategoryForm from '../containers/CategoryForm';
import { Row } from '../styles';
import { IProduct, IProductCategory } from '../types';

type Props = {
  product?: IProduct;
  productCategories: IProductCategory[];
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  closeModal: () => void;
};

class Form extends React.Component<Props> {
  renderFormTrigger(trigger: React.ReactNode) {
    const content = props => (
      <CategoryForm {...props} categories={this.props.productCategories} />
    );

    return (
      <ModalTrigger title="Add category" trigger={trigger} content={content} />
    );
  }

  renderContent = (formProps: IFormProps) => {
    const { renderButton, closeModal, product, productCategories } = this.props;
    const { values, isSubmitted } = formProps;
    const object = product || ({} as IProduct);

    const types = TYPES.ALL;

    if (product) {
      values._id = product._id;
      values.attachment = product.attachment
        ? { ...product.attachment, __typename: undefined }
        : null;
      values.description = product.description;
      values.vendorId = product.vendorId;
    }

    const trigger = (
      <Button btnStyle="primary" uppercase={false} icon="plus-circle">
        Add category
      </Button>
    );

    const onChangeAttachment = (files: IAttachment[]) => {
      values.attachment = files.length ? files[0] : null;
      object.attachment = values.attachment;
    };

    const onChangeDescription = e => {
      values.description = e.editor.getData();
      object.description = values.description;
    };

    const onSelectCompany = vendorId => {
      object.vendorId = vendorId;
      values.vendorId = vendorId;
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
          <ControlLabel required={true}>Type</ControlLabel>
          <FormControl
            {...formProps}
            name="type"
            componentClass="select"
            defaultValue={object.type}
            required={true}
          >
            {types.map((typeName, index) => (
              <option key={index} value={typeName}>
                {typeName}
              </option>
            ))}
          </FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel required={true}>Code</ControlLabel>
          <p>
            Depending on your business type, you may type in a barcode or any
            other UPC (Universal Product Code). If you don't use UPC, type in
            any numeric value to differentiate your products.
          </p>
          <FormControl
            {...formProps}
            name="code"
            defaultValue={object.code}
            required={true}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel required={true}>Category</ControlLabel>
          <Row>
            <FormControl
              {...formProps}
              name="categoryId"
              componentClass="select"
              defaultValue={object.categoryId}
              required={true}
            >
              {generateCategoryOptions(productCategories)}
            </FormControl>

            {this.renderFormTrigger(trigger)}
          </Row>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <EditorCK
            content={product ? product.description : ''}
            onChange={onChangeDescription}
            height={150}
            isSubmitted={formProps.isSaved}
            name={`product_description_${product ? product._id : ''}`}
            toolbar={[
              {
                name: 'basicstyles',
                items: [
                  'Bold',
                  'Italic',
                  'NumberedList',
                  'BulletedList',
                  'Link',
                  'Unlink',
                  '-',
                  'Image',
                  'EmojiPanel'
                ]
              }
            ]}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Vendor</ControlLabel>
          <SelectCompanies
            label="Choose an vendor"
            name="vendorId"
            customOption={{ value: '', label: 'No vendor chosen' }}
            initialValue={object.vendorId}
            onSelect={onSelectCompany}
            multi={false}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel required={true}>Unit price</ControlLabel>
          <FormControl
            {...formProps}
            type="number"
            name="unitPrice"
            defaultValue={object.unitPrice}
            required={true}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>SKU</ControlLabel>
          <FormControl {...formProps} name="sku" defaultValue={object.sku} />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Image</ControlLabel>
          <Uploader
            defaultFileList={attachments}
            onChange={onChangeAttachment}
            multiple={false}
            single={true}
          />
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
            name: 'product and service',
            values,
            isSubmitted,
            callback: closeModal,
            object: product
          })}
        </ModalFooter>
      </>
    );
  };

  render() {
    return <CommonForm renderContent={this.renderContent} />;
  }
}

export default Form;
