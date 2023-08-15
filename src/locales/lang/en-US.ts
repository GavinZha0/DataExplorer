import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/en_US';

const modules = import.meta.globEager('./en-US/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'en-US'),
    antdLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en-US',
};
