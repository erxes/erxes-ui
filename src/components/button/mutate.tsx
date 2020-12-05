import { Alert, confirm } from '../../utils';
import React from 'react';
import Button from './';
import SmallLoader from './smallLoader';

type Props = {
  client: any;
  gql: any;
  mutation: string;
  variables: any;
  btnSize?: string;
  uppercase?: boolean;
  successMessage?: string;
  btnStyle?: string;
  icon?: string;
  callback?: (data?: any) => void;
  children?: React.ReactNode;
  refetchQueries?: any;
  isSubmitted?: boolean;
  type?: string;
  disabled?: boolean;
  disableLoading?: boolean;
  block?: boolean;
  confirmationUpdate?: boolean;
  beforeSubmit?: () => void;
  resetSubmit?: () => void;
  translator?: (key: string, options?: any) => string;
};

class ButtonMutate extends React.Component<Props, { isLoading: boolean }> {
  static defaultProps = {
    btnSize: 'medium',
    icon: 'check-circle'
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps.isSubmitted !== this.props.isSubmitted) {
      this.mutate();
    }
  };

  invokeMutate = () => {
    const {
      client,
      gql,
      mutation,
      callback,
      variables,
      successMessage = '',
      refetchQueries,
      beforeSubmit,
      disableLoading,
      resetSubmit
    } = this.props;

    if (beforeSubmit) {
      beforeSubmit();
    }

    if (!disableLoading) {
      this.setState({ isLoading: true });
    }

    client
      .mutate({
        mutation: gql(mutation),
        variables,
        refetchQueries
      })

      .then(({ data }) => {
        if (successMessage) {
          Alert.success(successMessage);
        }

        if (callback) {
          callback(data);
        }

        if (!disableLoading) {
          this.setState({ isLoading: false });
        }
      })
      .catch(error => {
        if (error.message.includes('Invalid login')) {
          Alert.error(
            'The email address or password you entered is incorrect.'
          );
        } else {
          Alert.error(error.message);
        }

        if (resetSubmit) {
          resetSubmit();
        }

        if (!disableLoading) {
          this.setState({ isLoading: false });
        }
      });
  };

  mutate = () => {
    const { confirmationUpdate } = this.props;

    if (confirmationUpdate) {
      return confirm('This will permanently update are you absolutely sure?', {
        hasUpdateConfirm: true
      })
        .then(() => {
          this.invokeMutate();
        })
        .catch(error => {
          Alert.error(error.message);
        });
    }

    return this.invokeMutate();
  };

  render() {
    const { translator } = this.props;
    const {
      children = translator ? translator('Save') : 'Save',
      btnSize,
      icon,
      type,
      btnStyle = 'success',
      disabled,
      block,
      uppercase
    } = this.props;

    const { isLoading } = this.state;

    return (
      <Button
        uppercase={uppercase}
        disabled={disabled || isLoading}
        btnStyle={btnStyle}
        size={btnSize}
        type={type}
        onClick={type ? undefined : this.mutate}
        icon={isLoading ? undefined : icon}
        block={block}
      >
        {isLoading && <SmallLoader />}
        {children}
      </Button>
    );
  }
}

export default ButtonMutate;
