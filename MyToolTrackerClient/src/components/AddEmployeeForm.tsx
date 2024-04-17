import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from "react";
import { Employee } from "@/types/employee";
import { EmployeeType } from "@/types/employeeType";
import { EmployeeService } from "@/services/employeeService";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const employeeService = new EmployeeService();

const schema = z.object({
  firstName: z.string().min(3).max(25),
  lastName: z.string().min(3).max(25),
  idCardNumber: z.string().length(10).regex(/^[0-9A-Z]+$/, { message: "Only number and uppercase letters!"}),
  jmbg: z.string().length(13).regex(/^\d+$/),
  contactNumber: z.string().min(9).max(10).regex(/^\d+$/),
  employeeTypeId: z.number().min(1),
});

const AddEmployeeForm = () => {
  const [employeeTypes, setEmployeeTypes] = useState<EmployeeType[]>([]);

  useEffect(() => {
    employeeService.getEmployeeTypes().then((data) => {
      setEmployeeTypes(data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Employee>({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      idCardNumber: "1234567890",
      jmbg: "1234567890123",
      contactNumber: "123456789",
      employeeTypeId: 1,
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = async (employee: Employee) => {
    try {
      await employeeService.createEmployee(employee);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('firstName')}
        label={ errors.firstName ? errors.firstName.message : "First Name" }
        error={errors.firstName ? true : false}
        margin="normal"
        fullWidth
      />
      <TextField
        {...register('lastName')}
        label={ errors.lastName ? errors.lastName.message : "Last Name" }
        error={errors.lastName ? true : false}
        margin="normal"
        fullWidth
      />
      <TextField
        {...register('idCardNumber')}
        label={ errors.idCardNumber ? errors.idCardNumber.message : "ID Card Number" }
        error={errors.idCardNumber ? true : false}
        margin="normal"
        fullWidth
      />
      <TextField
        {...register('jmbg')}
        label={ errors.jmbg ? errors.jmbg.message : "JMBG" }
        error={errors.jmbg ? true : false}
        margin="normal"
        fullWidth
      />
      <TextField
        {...register('contactNumber')}
        label={ errors.contactNumber ? errors.contactNumber.message : "Contact Number" }
        error={errors.contactNumber ? true : false}
        margin="normal"
        fullWidth
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="type">Employee Type</InputLabel>
        <Select
          {...register('employeeTypeId')}
          label="Employee Type"
          labelId="type"
          error={errors.employeeTypeId ? true : false}
          fullWidth
        >
          { employeeTypes.map((type) => (
            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          disabled={isSubmitting}
          sx={{ height: '56px', mt: '16px' }}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth>
          { isSubmitting ? <CircularProgress color="secondary" /> : "Add Employee" }
        </Button>
      </Box>
    </form>
  )
}

export default AddEmployeeForm;
