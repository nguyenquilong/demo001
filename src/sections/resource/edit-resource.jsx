import { useState } from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';

import FormDialog from './form-dialog';
import Iconify from '../../components/iconify';

function EditResource({id,
                        name,
                        company,
                        type,
                        code}) {
  const [open, setOpen] = useState(false);


  return <>
    <MenuItem onClick={()=> {setOpen(true)}}>
      <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
      Edit
    </MenuItem>
    <FormDialog open={open} onClose={() => {setOpen(false)}} defaultValues={{
      id, name, company, type, code
    }}/>

  </>
}

EditResource.propTypes = {
  company: PropTypes.any,
  name: PropTypes.any,
  type: PropTypes.any,
  code: PropTypes.any,
  id: PropTypes.any,
};


export default EditResource;