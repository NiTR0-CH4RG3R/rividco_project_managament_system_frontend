import React, { useState } from 'react';
import FormTextField from '../StyledComponents/FormTextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function WarrentyField({ required, name, onChange, disabled, onBlur, error, helperText, fullWidth, ...props }) {

    const [unit, setUnit] = useState('months');
    const [displayWarrenty, setDisplayWarrenty] = useState(0);

    return (
        <FormControl
            sx={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <FormTextField
                {...props}
                required={required}
                label="Warrenty"
                type="text"
                name={name}
                value={displayWarrenty}
                onInput={(e) => {
                    setDisplayWarrenty(e.target.value);
                    if (unit === 'months') {
                        onChange({ target: { name: name, value: Number(e.target.value) } });
                    } else {
                        onChange({ target: { name: name, value: Number(e.target.value) * 12 } });
                    }

                }}
                sx={{ width: fullWidth === true ? `calc(100% - 100px)` : 'default',
                    '& .MuiInputBase-root': {
                        borderTopRightRadius: 0,borderBottomRightRadius:0
                    },
                }}
                onAbort={onChange}
                disabled={disabled}
                onBlur={onBlur}
                error={error}
                helperText={helperText}
            />
            <FormTextField
                {...props}
                select
                label="Unit"
                value={unit}
                disabled={disabled}
                defaultValue={'months'}
                sx={{ width: '100px' ,'& .MuiInputBase-root': {
                    borderTopLeftRadius: 0,borderBottomLeftRadius:0
                },}}
                onChange={(e) => {
                    setUnit(e.target.value);
                    if (e.target.value === 'months') {
                        setDisplayWarrenty(displayWarrenty * 12);
                    } else {
                        setDisplayWarrenty(displayWarrenty / 12);
                    }
                }}
            >
                <MenuItem value='months'>Months</MenuItem>
                <MenuItem value='years'>Years</MenuItem>
            </FormTextField>
        </FormControl>
    );
}