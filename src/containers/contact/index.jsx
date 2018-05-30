import React, {Component} from 'react';
import Block from '../../components/block';
import Form from '../../components/form';
import Post from '../../components/post';
import Title from '../../components/title';

const awsHandler =
  'https://6rovexooub.execute-api.eu-west-1.amazonaws.com/production/contact';

const SuccessMessage = () => (
  <p>
    <strong>Thank you for your enquiry, I’ll reply as soon as possible.</strong>
  </p>
);

const ErrorMessage = () => (
  <p>
    <strong className="u-error">
      There was an error submitting your enquiry, please email me at the address
      above.
    </strong>
  </p>
);

class Contact extends Component {
  static get defaultProps() {
    return {
      pageHeading: 'Contact'
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      form: false,
      message: false,
      isWaiting: false
    };
    this.formRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (typeof window !== 'object') {
      return;
    }
    const {href} = window.location;
    if (href.indexOf('?success=true') !== -1) {
      this.setState({
        form: false,
        message: SuccessMessage
      });
      return;
    }
    if (href.indexOf('?error') !== -1) {
      this.setState({
        form: false,
        message: ErrorMessage
      });
      return;
    }
    this.setState({
      form: Form
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.message !== prevState.message) {
      window.scrollTo(0, 0);
    }
  }

  handleSubmit(e) {
    const $form = this.formRef.current;
    e.preventDefault();
    if (!$form.elements.privacy.checked) {
      return;
    }
    if ($form.elements.whodis.value !== '') {
      this.setState({
        form: false,
        message: ErrorMessage
      });
      return;
    }
    const startTime = new Date().getTime();
    const onLoadEnd = state => {
      const timeDiff = new Date().getTime() - startTime;
      if (timeDiff < 2000) {
        return setTimeout(() => onLoadEnd(state), 2000 - timeDiff);
      }
      this.setState(state);
    };
    const data = JSON.stringify({
      name: $form.elements.name.value,
      replyTo: $form.elements.replyTo.value,
      enquiry: $form.elements.enquiry.value
    });
    const xhr = new XMLHttpRequest();
    xhr.open('POST', awsHandler, true);
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.addEventListener('loadend', response => {
      if (response.target.status === 200) {
        onLoadEnd({
          form: false,
          message: SuccessMessage,
          isWaiting: false
        });
      } else {
        onLoadEnd({
          form: false,
          message: ErrorMessage,
          isWaiting: false
        });
      }
    });
    xhr.send(data);
    this.setState({
      isWaiting: true
    });
  }

  render() {
    const {isWaiting, form: Form, message: Message} = this.state;
    return (
      <Block isMain>
        <Block>
          <Post>
            <Title heading={this.props.pageHeading} />
            <div className="b-post__body">
              <p>Need help with your website?</p>
              <p className="p--large">
                <b>
                  <a href="mailto:hi@dbushell.com">hi@dbushell.com</a>
                </b>
              </p>
              {Message && [<hr key={1} />, <Message key={2} />]}
              {Form && [
                <p key={1}>Email me above or use the form below:</p>,
                <Form
                  key={2}
                  formRef={this.formRef}
                  onSubmit={e => this.handleSubmit(e)}
                  isWaiting={isWaiting}
                />
              ]}
            </div>
          </Post>
        </Block>
      </Block>
    );
  }
}

export default Contact;
