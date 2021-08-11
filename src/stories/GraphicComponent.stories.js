import React from 'react';
import { storiesOf } from '@storybook/react';

import { GraphicComponent } from '../components/GraphicComponent';

const stories = storiesOf('App Test', module);

stories.add('App', () => {
  return (
  <GraphicComponent />
  )
})