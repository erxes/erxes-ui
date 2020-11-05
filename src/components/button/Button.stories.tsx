import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Button from '.';

const stories = storiesOf('Button', module);

stories.addDecorator(withKnobs);

stories.add('primary', () => {
  const hasOnClick = boolean('Has onClick', true);

  return (
    <Button
      onClick={hasOnClick ? action('clicked') : undefined}
      btnStyle="primary"
    >
      Button
    </Button>
  );
});
