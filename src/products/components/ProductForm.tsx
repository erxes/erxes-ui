import React from "react";
import SelectCompanies from "../../companies/containers/SelectCompanies";
import Button from "../../components/Button";
import EditorCK from "../../components/EditorCK";
import FormControl from "../../components/form/Control";
import CommonForm from "../../components/form/Form";
import FormGroup from "../../components/form/Group";
import ControlLabel from "../../components/form/Label";
import ModalTrigger from "../../components/ModalTrigger";
import Uploader from "../../components/Uploader";
import { ModalFooter, FormColumn, FormWrapper } from "../../styles/main";
import { IAttachment, IButtonMutateProps, IFormProps } from "../../types";
import { extractAttachment, generateCategoryOptions } from "../../utils";
import { TYPES, PRODUCT_SUPPLY } from "../constants";
import CategoryForm from "../containers/CategoryForm";
import { Row } from "../styles";
import { IProduct, IProductCategory } from "../types";

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

  attachment: IAttachment;
  attachmentMore: IAttachment[];
};
class Form extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const { product } = props;

    const productCount =
      product && product.productCount ? product.productCount : 0;
    const minimiumCount =
      product && product.minimiumCount ? product.minimiumCount : 0;
    const disabled = product && product.supply === "limited" ? false : true;

    this.state = {
      disabled,
      productCount,
      minimiumCount,
      attachment: {} as IAttachment,
      attachmentMore: [] as IAttachment[],
    };
  }

  renderFormTrigger(trigger: React.ReactNode) {
    const content = (props) => (
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

    const { attachment, attachmentMore } = this.state;

    values.attachment =
      Object.entries(attachment).length > 0 ? attachment : null;
    values.attachmentMore =
      Object.entries(attachmentMore).length > 0 ? attachmentMore : null;

    if (product) {
      values._id = product._id;
      values.attachment = product.attachment
        ? { ...product.attachment, __typename: undefined }
        : null;

      const tempAttachments = product.attachmentMore || [];
      const attachMore: any[] = [];

      tempAttachments.forEach((attachmentOne) => {
        const tmp = attachmentOne
          ? { ...attachmentOne, __typename: undefined }
          : null;
        attachMore.push(tmp);
      });
      values.attachmentMore = attachMore;
      values.description = product.description;
      values.vendorId = product.vendorId;
      values.productCount = product.productCount;
      values.minimiumCount = product.minimiumCount;
    }

    const trigger = (
      <Button btnStyle="primary" uppercase={false} icon="plus-circle">
        Add category
      </Button>
    );

    const onMinimiumAndCount = (variable: string, e) => {
      const value = e.target.value;
      this.setState({ [variable]: value } as any);
      values[variable] = value;
      object[variable] = values[variable];
    };

    const onSupplyChange = (e) => {
      let value = 0;
      let minValue = 0;
      this.setState({ disabled: true });

      if (e.target.value === "limited") {
        value = object.productCount || 0;
        minValue = object.minimiumCount || 0;
        this.setState({ disabled: false });
      }

      this.setState({ productCount: value });
      this.setState({ minimiumCount: minValue });

      values.productCount = value;
      object.productCount = values.productCount;

      values.minimiumCount = minValue;
      object.minimiumCount = values.minimiumCount;
    };

    const onChangeAttachment = (files: IAttachment[]) => {
      values.attachment = files.length ? files[0] : null;
      object.attachment = values.attachment;

      values.attachmentMore = files;
      object.attachmentMore = values.attachmentMore;

      this.setState({
        attachment: values.attachment,
        attachmentMore: values.attachmentMore,
      });
    };

    const onChangeDescription = (e) => {
      values.description = e.editor.getData();
      object.description = values.description;
    };

    const onSelectCompany = (vendorId) => {
      object.vendorId = vendorId;
      values.vendorId = vendorId;
    };

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
            content={product ? product.description : ""}
            onChange={onChangeDescription}
            height={150}
            isSubmitted={formProps.isSaved}
            name={`product_description_${product ? product._id : ""}`}
            toolbar={[
              {
                name: "basicstyles",
                items: [
                  "Bold",
                  "Italic",
                  "NumberedList",
                  "BulletedList",
                  "Link",
                  "Unlink",
                  "-",
                  "Image",
                  "EmojiPanel",
                ],
              },
            ]}
          />
        </FormGroup>

        <FormWrapper>
          <FormColumn>
            <FormGroup>
              <ControlLabel>Product supply</ControlLabel>

              <FormControl
                {...formProps}
                name="supply"
                componentClass="select"
                onChange={onSupplyChange}
                defaultValue={object.supply}
                options={PRODUCT_SUPPLY}
              ></FormControl>
            </FormGroup>
          </FormColumn>

          <FormColumn>
            <FormWrapper>
              <FormColumn>
                <FormGroup>
                  <ControlLabel>Product count</ControlLabel>

                  <FormControl
                    {...formProps}
                    name="productCount"
                    value={this.state.productCount}
                    disabled={this.state.disabled}
                    onChange={onMinimiumAndCount.bind(this, "productCount")}
                    type="number"
                  ></FormControl>
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
                    onChange={onMinimiumAndCount.bind(this, "minimiumCount")}
                    type="number"
                  ></FormControl>
                </FormGroup>
              </FormColumn>
            </FormWrapper>
          </FormColumn>
        </FormWrapper>

        <FormGroup>
          <ControlLabel>Images</ControlLabel>

          <Uploader
            defaultFileList={attachments}
            onChange={onChangeAttachment}
            multiple={true}
            single={false}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Vendor</ControlLabel>
          <SelectCompanies
            label="Choose an vendor"
            name="vendorId"
            customOption={{ value: "", label: "No vendor chosen" }}
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
            name: "product and service",
            values,
            isSubmitted,
            callback: closeModal,
            object: product,
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
