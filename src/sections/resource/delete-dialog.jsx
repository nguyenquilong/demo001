import PropTypes from 'prop-types';
import React, { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent, DialogActions,
} from '@mui/material';

import Iconify from '../../components/iconify';

const DeleteDialog = ({ resourceId, name, onClose  }) => {

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    onClose?.();
  };

  const handleDelete = () => {
     // delete resourceId
    console.log('delete resource: ', resourceId)
  }


  return (
  <>
    <MenuItem onClick={handleOpenMenu} sx={{ color: 'error.main' }}>
      <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
      Delete
    </MenuItem>
    <Dialog open={open} onClose={handleCloseMenu} fullWidth>
      <DialogTitle>Delete Resource</DialogTitle>
      <DialogContent>
        {`Do you want to delete '${ name }' resource?`}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseMenu} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete}  variant="contained" color="inherit">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  </>
  );
};


DeleteDialog.propTypes = {
  resourceId: PropTypes.any,
  name: PropTypes.any,
  onClose: PropTypes.any
}

export default DeleteDialog;
