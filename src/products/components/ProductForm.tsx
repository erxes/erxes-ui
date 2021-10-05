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
import { ModalFooter, FormColumn, FormWrapper } from '../../styles/main';
import { IAttachment, IButtonMutateProps, IFormProps } from '../../types';
import { extractAttachment, generateCategoryOptions } from '../../utils';
import { TYPES, PRODUCT_SUPPLY } from '../constants';
import CategoryForm from '../containers/CategoryForm';
import { Row } from '../styles';
import { IProduct, IProductCategory } from '../types';

type Props = {
  product?: IProduct;
  productCategories: IProductCategory[];
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  closeModal: () => void;
};

type State = {
  disabled: boolean;
  productCount: number;
  minimiumCount: number;

  attachment?: IAttachment;
  attachmentMore?: IAttachment[];

  vendorId: string;
  description: string;
}
class Form extends React.Component<Props, State> {

  constructor(props) {
    super(props);

    const { product } = props

    const attachment = product && product.attachment ? product.attachment : undefined;
    const attachmentMore = product && product.attachmentMore ? product.attachmentMore : [];
    const attachMoreArray: any[] = [];
    attachmentMore.map(attachment => {
      attachMoreArray.push({ ...attachment, __typename: undefined });
    })

    this.state = {
      disabled: product && product.supply === "limited" ? false : true,
      productCount: product && product.productCount ? product.productCount : 0,
      minimiumCount: product && product.minimiumCount ? product.minimiumCount : 0,
      attachment: attachment ? { ...attachment, __typename: undefined } : undefined,
      attachmentMore: attachMoreArray.length ? attachMoreArray : undefined,
      vendorId: product && product.vendorId ? product.vendorId : "",
      description: product && product.description ? product.description : ""
    };
  }

  generateDoc = (values: {
    _id?: string;
    attachment?: IAttachment;
    attachmentMore?: IAttachment[];
    productCount: number;
    minimiumCount: number;
    vendorId: string;
    description: string;
  }) => {
    const { product } = this.props;
    const finalValues = values;
    const { attachment, attachmentMore, productCount, minimiumCount, vendorId, description } = this.state;

    finalValues.attachment = attachment;
    finalValues.attachmentMore = attachmentMore;
    finalValues.productCount = productCount;
    finalValues.minimiumCount = minimiumCount;
    finalValues.vendorId = vendorId;
    finalValues.description = description;

    if (product) {
      finalValues._id = product._id;
    }

    return {
      ...finalValues,
      attachment: this.state.attachment,
      attachmentMore: this.state.attachmentMore,
      productCount: this.state.productCount,
      minimiumCount: this.state.minimiumCount,
      vendorId: this.state.vendorId,
      description: this.state.description
    };
  };

  renderFormTrigger(trigger: React.ReactNode) {
    const content = props => (
      <CategoryForm {...props} categories={this.props.productCategories} />
    );

    return (
      <ModalTrigger title="Add category" trigger={trigger} content={content} />
    );
  }

  onComboEvent = (variable: string, e) => {
    const value = variable === "vendorId" ? e : e.target.value;
    this.setState({ [variable]: value } as any);
  }

  onChangeDescription = e => {
    this.setState({ description: e.editor.getData() });
  };

  onChangeAttachment = (files: IAttachment[]) => {
    this.setState({ attachment: files.length ? files[0] : undefined });
    this.setState({ attachmentMore: files ? files : undefined });
  };

  onSupplyChange = e => {
    const { productCount, minimiumCount } = this.state;

    this.setState({ disabled: true });

    if (e.target.value === "limited") {
      this.setState({ disabled: false });
      this.setState({ productCount });
      this.setState({ minimiumCount });
    } else {
      this.setState({ productCount: 0 });
      this.setState({ minimiumCount: 0 });
    }
  };

  renderContent = (formProps: IFormProps) => {
    const { renderButton, closeModal, product, productCategories } = this.props;
    const { values, isSubmitted } = formProps;
    const object = product || ({} as IProduct);

    const types = TYPES.ALL;

    const trigger = (
      <Button btnStyle="primary" uppercase={false} icon="plus-circle">
        Add category
      </Button>
    );

    const attachments =
      (object.attachmentMore && extractAttachment(object.attachmentMore)) || [];

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
            content={this.state.description}
            onChange={this.onChangeDescription}
            height={150}
            isSubmitted={formProps.isSaved}
            name={`product_description_${this.state.description}`}
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
          <ControlLabel>Product supply</ControlLabel>

          <FormControl
            {...formProps}
            name="supply"
            componentClass="select"
            onChange={this.onSupplyChange}
            defaultValue={object.supply}
            options={PRODUCT_SUPPLY}

          >
          </FormControl>
        </FormGroup>

        <FormWrapper>
          <FormColumn>
            <FormGroup>
              <ControlLabel>Product count</ControlLabel>

              <FormControl
                {...formProps}
                name="productCount"
                value={this.state.productCount}
                disabled={this.state.disabled}
                onChange={this.onComboEvent.bind(this, "productCount")}
                type="number"
              >
              </FormControl>
            </FormGroup>
          </FormColumn>
          <FormColumn>
            <FormGroup>
              <ControlLabel>Minimium count</ControlLabel>

              <FormControl
                {...formProps}
                name="minimiumCount"
                value={this.state.minimiumCount}
                disabled={this.state.disabled}
                onChange={this.onComboEvent.bind(this, "minimiumCount")}
                type="number"
              >
              </FormControl>
            </FormGroup>
          </FormColumn>
        </FormWrapper>

        <FormGroup>
          <ControlLabel>Images</ControlLabel>

          <Uploader
            defaultFileList={attachments}
            onChange={this.onChangeAttachment}
            multiple={true}
            single={false}
          />

        </FormGroup>

        <FormGroup>
          <ControlLabel>Vendor</ControlLabel>
          <SelectCompanies
            label="Choose an vendor"
            name="vendorId"
            customOption={{ value: '', label: 'No vendor chosen' }}
            initialValue={this.state.vendorId}
            onSelect={this.onComboEvent.bind(this, "vendorId")}
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
            values: this.generateDoc(values),
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
