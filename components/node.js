import { useState } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

function NodeDetailDialog(props) {
  const { onClose, open, name } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Node Details</DialogTitle>
      <Paper sx={{ textAlign: 'center', padding: 1 }}>
        Name: {name}
      </Paper>
    </Dialog>
  );
}

NodeDetailDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

const Node = ({ node }) => {
  const [open, setOpen] = useState(false);

  const showDetail = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ margin: 'auto', padding: 1, textAlign: 'center' }}>
      <ButtonBase
        onClick={showDetail}
      >
        <Image
          title={node.name}
          alt={node.name}
          src={node.image}
          height={64}
          width={64}
        />
      </ButtonBase>
      <NodeDetailDialog
        open={open}
        onClose={handleClose}
        name={node.name}
      />
      {node.name}
    </Box>
  );
}

// LeafNodes returns a list of Nodes.
const LeafNodes = ({ nodes }) => {
  return nodes.map((node, index) => (
    <Node key={index} node={node} />
  ));
}

export default LeafNodes
