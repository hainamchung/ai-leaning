import React from 'react';
import { Col, Row, Icon } from 'antd';

const FooterContainer = props => (
  <div className="footer page-content">
    <Row>
      <Col>
        Copyright
        <Icon type="copyright" style={{ color: '#f5222d' }} />
        EstRouge.Inc
      </Col>
    </Row>
  </div>
);

export { FooterContainer };
