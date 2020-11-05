import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Form from './Form';
import FormControl  from './Control';
import Label  from './Label';
import { Button } from '..';

const stories = storiesOf('Form', module);

stories.addDecorator(withKnobs);

stories.add('Input', () => {
  const renderTitleInput = (formProps) => {

    return (
      <>
        <FormControl
          {...formProps}
          name="title"
          autoFocus={true}
          required={true}
        />
        <Button type="submit">submit</Button>
      </>
    );
  }

  return (
    <Form renderContent={renderTitleInput} />
  );
});

stories.add('Label', () => {
  return (
    <Label>Right</Label>
  );
});
