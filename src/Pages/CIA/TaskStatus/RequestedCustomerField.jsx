import React, { useState } from 'react';
import { IconButton, MenuItem } from '@mui/material';
import { AddBox } from '@mui/icons-material';
import { GridClearIcon } from '@mui/x-data-grid';
import FormTextField from '../../../Components/StyledComponents/FormTextField';
import CustomerModal from '../../../Components/ModalWindow/CustomerModal';
import FormButton from '../../../Components/StyledComponents/FormButton';
import { AppRoutes } from "../../../Data/AppRoutes";
import { useNavigate, useParams } from "react-router";
import FormControl from '@mui/material/FormControl';

const RequestedCustomerField = ({ values, setFieldValue, type, setOpenCustomer ,fullWidth}) => {
  const [openAddCustomerModal, setOpenAddCustomerModal] = useState(false);

  const handleAddCustomer = () => {
    setOpenAddCustomerModal(true);
  };
  const navigate = useNavigate();
  return (
    <>
    <FormControl
            sx={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
      <FormTextField
        id="requested_by"
        name="requested_by"
        label="Requested Customer"
        variant="filled"
        fullWidth
        size="small"
        required
        onClick={() => {
          if (!values.selectedCustomer?.firstName && type !== 'view') {
            setOpenCustomer(true);
          }
        }}
        value={values.selectedCustomer?.firstName ?? ''}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => setFieldValue('selectedCustomer', '')}
              sx={{
                visibility: values.selectedCustomer?.firstName ? 'visible' : 'hidden',
              }}
              disabled={type === 'view'}
            >
              {(type === 'add' || type === 'edit') && <GridClearIcon />}
            </IconButton>
          ),
        }}
        disabled={type === 'view'}
        error={values.selectedCustomer?.firstName && !values.selectedCustomer?.id}
        helperText={values.selectedCustomer?.firstName && !values.selectedCustomer?.id ? 'Please select a customer' : ''}
        
        sx={{ width: fullWidth === true ? `calc(100% - 100px)` : 'default',
                    '& .MuiInputBase-root': {
                        borderTopRightRadius: 0,borderBottomRightRadius:0
                    },
                }}
      />
      {(type === 'add' || type === 'edit') && (
        <FormButton
        variant="contained"
        color="primary"
        onClick={() => navigate(`${AppRoutes.customer_add.path}`)}
        startIcon={<AddBox />}
        sx={{borderTopLeftRadius:0,borderBottomLeftRadius:0}}
      >
        Add Guest
      </FormButton>
      )}
      </FormControl>
      <CustomerModal
        openCustomer={openAddCustomerModal}
        setOpenCustomer={setOpenAddCustomerModal}
        sendData={setFieldValue}
      />
    </>
  );
};

export default RequestedCustomerField;
