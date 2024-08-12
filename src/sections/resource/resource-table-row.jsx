import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

import EditResource from './edit-resource';
import DeleteDialog from './delete-dialog';
import AddChildResource from './add-child-resource';


// ----------------------------------------------------------------------

export default function ResourceTableRow({
  selected,
  id,
  name,
  company,
  type,
  code,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{company}</TableCell>

        <TableCell>{code}</TableCell>

        <TableCell>{type}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >

        <EditResource name={name} type={type} code={code} id={id} company={company}/>

        <AddChildResource parentId={id} name={name}/>

     <DeleteDialog name={name} onClose={handleCloseMenu}  resourceId={id}/>
      </Popover>

    </>
  );
}

ResourceTableRow.propTypes = {
  company: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  type: PropTypes.any,
  code: PropTypes.any,
  selected: PropTypes.any,
  id: PropTypes.any,
};
