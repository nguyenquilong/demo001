import { useState } from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';

import FormDialog from './form-dialog';
import Iconify from '../../components/iconify';

function AddChildResource({
                        parentId, name

}) {
  const [open, setOpen] = useState(false);


  return <>
    <MenuItem onClick={()=> {setOpen(true)}}>
      <Iconify icon="eva:plus-fill" sx={{ mr: 2 }} />
      Add child
    </MenuItem>
    <FormDialog open={open} onClose={() => {setOpen(false)}} defaultValues={{
      parentResource: {
        value: parentId,
        label: name,
      }
    }} isCreateChildren/>

  </>
}

AddChildResource.propTypes = {
  parentId: PropTypes.any,
  name: PropTypes.any,
};


export default AddChildResource;