import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import {
  Dialog,
  Button,
  Select,
  TextField,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogContent, DialogActions,
} from '@mui/material';

const FormDialog = ({ open, onClose, defaultValues, isCreateChildren }) => {
  const [formValues, setFormValues] = useState(defaultValues || { name: '', company: 'FCI', code: '', attributes: '', parentResource: {
    label: 'None', value: ''
    } });


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
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{defaultValues && !isCreateChildren ? 'Update Resource' : 'Add New Resource'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{mt: 1}}>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Parent Resource</InputLabel>
          <Select
            value={formValues.parentResource?.value}
            label="Parent Resource"
            name="parentResource"
            onChange={handleChange}
            autoWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {formValues.parentResource &&             <MenuItem value={formValues.parentResource?.value}>{formValues.parentResource?.label}</MenuItem>
            }
          </Select>
        </FormControl>

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
          type="text"
          name="attributes"
          label="Attributes"
          multiline
          fullWidth
          rows={4}
          value={formValues.attributes}
          onChange={handleChange}
        />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit}  variant="contained" color="inherit">
          {defaultValues && !isCreateChildren ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};


FormDialog.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.any,
  defaultValues: PropTypes.any,
  isCreateChildren: PropTypes.any
}

export default FormDialog;
