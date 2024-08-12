import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Dialog, Button, TextField, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const FormDialog = ({ open, onClose, defaultValues }) => {
  const [formValues, setFormValues] = useState(defaultValues || { name: '', company: 'FCI', code: '' });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // Handle form submission logic
    console.log('Form Submitted:', formValues);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{defaultValues ? 'Update Resource' : 'Add New Resource'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Resource Name"
          type="text"
          fullWidth
          variant="outlined"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Company"
          type="text"
          fullWidth
          variant="outlined"
          name="company"
          value={formValues.company}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Code"
          type="text"
          fullWidth
          variant="outlined"
          name="code"
          value={formValues.code}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit}  variant="contained" color="inherit">
          {defaultValues ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};


FormDialog.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.any,
  defaultValues: PropTypes.any
}

export default FormDialog;
