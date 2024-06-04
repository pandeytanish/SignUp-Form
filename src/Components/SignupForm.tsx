import React, { Component, ChangeEvent, MouseEvent } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Typography,
  Link,
  Stack,
  Box,
  Select,
  MenuItem,
  Avatar,
  Grid
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Define the interface for component props
interface SignUpFormProps { }

// Define the interface for component state
interface SignUpFormState {
  formValues: {
    fullName: string;
    email: string;
    country: string;
    phone: string;
    password: string;
    showPassword: boolean;
  };
  formErrors: {
    fullName?: string;
    email?: string;
    country?: string;
    phone?: string;
    password?: string;
  };
  passwordRequirements: {
    minLength: boolean;
    hasNumber: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
  };
  isSubmitted: boolean;
}

const countries = [
  { label: 'UAE', name: 'UAE', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/640px-Flag_of_the_United_Arab_Emirates.svg.png', code: '+971' },
  { label: 'Oman', name: 'Oman', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Oman.svg/1024px-Flag_of_Oman.svg.png', code: '+968' },
  { label: 'KSA', name: 'KSA', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/640px-Flag_of_Saudi_Arabia.svg.png', code: '+966' },
  { label: 'Bahrain', name: 'Bahrain', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Bahrain.svg/640px-Flag_of_Bahrain.svg.png', code: '+973' },
  { label: 'Qatar', name: 'Qatar', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Qatar.svg/640px-Flag_of_Qatar.svg.png', code: '+974' },
  { label: 'Kuwait', name: 'Kuwait', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_of_Kuwait.svg/640px-Flag_of_Kuwait.svg.png', code: '+965' },
  { label: 'New Zealand', name: 'New Zealand', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/640px-Flag_of_New_Zealand.svg.png', code: '+64' }
];

class SignUpForm extends Component<SignUpFormProps, SignUpFormState> {
  constructor(props: SignUpFormProps) {
    super(props);
    this.state = {
      formValues: {
        fullName: '',
        email: '',
        country: 'Bahrain',
        phone: '',
        password: '',
        showPassword: false,
      },
      formErrors: {},
      passwordRequirements: {
        minLength: false,
        hasNumber: false,
        hasUpperCase: false,
        hasLowerCase: false,
      },
      isSubmitted: false,
    };
  }

  handleChange = (prop: keyof SignUpFormState['formValues']) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string | undefined; value: unknown; }>) => {
    const value = event.target.value as string;
    this.setState({
      formValues: { ...this.state.formValues, [prop]: value },
    }, () => {
      if (prop === 'password') {
        this.checkPasswordCriteria(value);
      }
    });
  };

  handleCountryChange = (event: { target: { value: any; }; }) => {
    const selectedCountry = countries.find(country => country.name === event.target.value);
    this.setState({
      formValues: { ...this.state.formValues, country: event.target.value, phone: selectedCountry?.code || '' },
    });
  };

  handleClickShowPassword = () => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        showPassword: !this.state.formValues.showPassword,
      },
    });
  };

  handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  checkPasswordCriteria = (password: string) => {
    this.setState({
      passwordRequirements: {
        minLength: password.length >= 8,
        hasNumber: /\d/.test(password),
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
      }
    });
  };

  validate = () => {
    const errors: SignUpFormState['formErrors'] = {};
    if (!this.state.formValues.fullName) errors.fullName = 'Full Name is required';
    if (!this.state.formValues.email) errors.email = 'Email Address is required';
    if (!this.state.formValues.country) errors.country = 'Country is required';
    if (!this.state.formValues.phone) errors.phone = 'Phone Number is required';
    if (!this.state.formValues.password) errors.password = 'Password is required';
    this.setState({ formErrors: errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.validate()) {
      this.setState({ isSubmitted: true });
      console.log('Form submitted', this.state.formValues);
    }
  };

  renderPasswordCriteria = () => {
    const { password } = this.state.formValues;
    const { passwordRequirements } = this.state;
    if (!password) return null;

    return (
      <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', lineHeight: '100px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color={passwordRequirements.minLength ? 'green' : 'red'}>
              Minimum 8 characters
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color={passwordRequirements.hasNumber ? 'green' : 'red'}>
              At least one number
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color={passwordRequirements.hasUpperCase ? 'green' : 'red'}>
              At least one uppercase letter
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color={passwordRequirements.hasLowerCase ? 'green' : 'red'}>
              At least one lowercase letter
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  render() {
    const { formValues, formErrors } = this.state;
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', backgroundColor : '#e0e0e0', height : '100vh' }}>
        <FormControl
          sx={{ width: '80%', height: 'auto', padding: '24px', backgroundColor : 'white' }}
          component="form"
          onSubmit={this.handleSubmit}
        >
       
          <Typography sx={{textAlign : 'left'}} variant="h5">Need an Account - Sign Up</Typography>
          <Typography sx={{textAlign : 'left', color : 'skyblue'}} variant="h6">Basic Information</Typography>
    
          <TextField
            margin="dense"
            sx={{ marginTop: '10px' }}
            id="full-name"
            label="Full Name"
            variant="outlined"
            value={formValues.fullName}
            onChange={this.handleChange('fullName')}
            error={Boolean(formErrors.fullName)}
            helperText={formErrors.fullName}
          />
          <TextField
            margin="dense"
            sx={{ marginTop: '10px' }}
            id="email-address"
            label="Email Address"
            variant="outlined"
            value={formValues.email}
            onChange={this.handleChange('email')}
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
          />
          <FormControl margin="dense" sx={{ marginTop: '10px', width: '100%' }} variant="outlined">
            <InputLabel id="country-select-label">Country</InputLabel>
            <Select
              labelId="country-select-label"
              id="country-select"
              value={formValues.country}
              onChange={this.handleCountryChange}
              label="Country"
              error={Boolean(formErrors.country)}
            >
              {countries.map((country) => (
                <MenuItem key={country.name} value={country.name}>
                  <Stack direction="row" alignItems="center">
                    <Avatar src={country.flag} alt={`${country.name} flag`} sx={{ width: 24, height: 24, marginRight: '10px' }} />
                    {country.label}
                  </Stack>
                </MenuItem>
              ))}
            </Select>
            {formErrors.country && (
              <Typography variant="caption" color="error">
                {formErrors.country}
              </Typography>
            )}
          </FormControl>

          <FormControl margin="dense" sx={{ marginTop: '10px', width: '100%' }} variant="outlined">

            <TextField
              margin="dense"
              label="Phone Number"
              variant="outlined"
              placeholder='Phone Number'
              onChange={this.handleChange('phone')}
              error={Boolean(formErrors.phone)}
              helperText={formErrors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {formValues.country && (
                      <Typography variant="body1" sx={{ color: 'black', marginRight: '10px' }}>
                        {countries.find(country => country.name === formValues.country)?.code || ''}
                      </Typography>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl margin="dense" sx={{ marginTop: '10px', width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={formValues.showPassword ? 'text' : 'password'}
              value={formValues.password}
              onChange={this.handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                    edge="end"
                  >
                    {formValues.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              error={Boolean(formErrors.password)}
            />
            {formErrors.password && (
              <Typography variant="caption" color="error">
                {formErrors.password}
              </Typography>
            )}
          </FormControl>
          {this.renderPasswordCriteria()}
          <FormControlLabel
            control={<Checkbox name="terms" color="primary" />}
            label="I agree to the Terms and Conditions"
            sx={{ marginTop: '10px' }}
          />
          <Button type="submit" variant="contained" sx={{ marginTop: '10px' }}>
            Sign Up
          </Button>
        </FormControl>
      </Box>
    );
  }
}

export default SignUpForm;

