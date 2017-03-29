import path from 'path';
import {md2HTML} from '../../../build/helpers';
import Template from '../';

class Service extends Template {}

Service.defaultProps = {
  pageHeading: 'Responsive Design',
  content: md2HTML(path.join(__dirname, 'content.md'))
};

export default Service;
