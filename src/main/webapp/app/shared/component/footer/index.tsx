import React from 'react';
import { Col, Row, Icon } from 'antd';

const FooterContainer = props => (
  <div className="footer page-content">
    <Row>
      <Col>
        <Icon type="copyright" style={{ color: '#f5222d' }} />
      </Col>
    </Row>
  </div>
);

export { FooterContainer };
