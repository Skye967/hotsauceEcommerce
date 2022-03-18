import React from 'react';
import { TextField, Grid} from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({ name, label}) => {
     const {register, control} = useFormContext();

  return (
    <Grid item xs={12} s={6}>
        <Controller
            render={() => (
            <TextField
            defaultValue=''
            {...register(name)}
            control={control}
            name={name}
            label={label}
            fullWidth
            required 
            ></TextField>
            )}
        />
    </Grid>
  )
}

export default FormInput