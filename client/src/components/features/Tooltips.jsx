// client/src/components/features/Tooltips.jsx
import React from 'react';
import { Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

const Tooltips = () => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click to visit JALA Academy's home page.
    </Tooltip>
  );

  return (
    <Card className="p-4">
      <h2 className="mb-4">Tooltips</h2>
      <p>Tooltips are small pop-up boxes that appear when a user hovers over an element. They provide additional information or context without cluttering the interface.</p>
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <Button variant="primary">Hover over me</Button>
      </OverlayTrigger>
    </Card>
  );
};

export default Tooltips;