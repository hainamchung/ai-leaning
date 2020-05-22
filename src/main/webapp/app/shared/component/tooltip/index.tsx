import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const OverlayTooltip = props => (
  <OverlayTrigger key={props.key} placement={props.placement} overlay={<Tooltip id={`tooltip-${props.key}`}>{props.title}</Tooltip>}>
    {props.disabled ? <div className={`tooltip-disable ${props.className || ''}`}>{props.children}</div> : props.children}
  </OverlayTrigger>
);

export { OverlayTooltip };
