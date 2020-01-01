import { configure, addDecorator } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import { withTests } from '@storybook/addon-jest';
import results from '../.jest-test-results.json'

addDecorator(withInfo)
addDecorator(
  withTests({
    results
  })
)

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
