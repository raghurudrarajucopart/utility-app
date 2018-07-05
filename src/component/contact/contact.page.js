import React, { Component } from 'react';

import locale from '../../utils/locale';

class ContactPage extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>{locale('contact-page')}</div>
    )
  }
}

export default ContactPage;
