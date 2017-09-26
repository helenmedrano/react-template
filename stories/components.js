import React from 'react';
import { storiesOf, action } from '@storybook/react';

import Button from 'core/components/button';

storiesOf('Button', module)
  .add('Normal', () => (
    <div>
        <Button onClick={action('button clicked')}>Normal Button</Button>
        <Button onClick={action('button clicked')} inverted>Inverted Button</Button>
    </div>
  ))
