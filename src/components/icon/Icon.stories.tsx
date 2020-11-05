import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, color } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Icon from '.';

const stories = storiesOf('Icon', module);

stories.addDecorator(withKnobs);

stories.add('default', () => {
  const hasOnClick = boolean('Has onClick', true);

  return (
    <Icon
      onClick={hasOnClick ? action('clicked') : undefined}
      color={color('Custom color', '')}
      icon="times-circle"
    />
  );
});
