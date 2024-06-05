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
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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
  { label: 'Bahrain', name: 'Bahrain', flag: 'https://image.similarpng.com/very-thumbnail/2021/04/Waving-Bahrain-flag-icon-isolated-on-transparent-background-PNG.png', code: '+973' },
  { label: 'Oman', name: 'Oman', flag: 'https://png.pngtree.com/png-vector/20220427/ourmid/pngtree-oman-flag-icon-png-gold-border-png-image_4557809.png', code: '+968' },
  { label: 'Egypt', name: 'Egypt', flag: 'https://image.similarpng.com/very-thumbnail/2020/06/Egypt-flag-icon-on-transparent-background-PNG.png', code: '+20' },
  { label: 'KSA', name: 'KSA', flag: 'https://w7.pngwing.com/pngs/367/785/png-transparent-saudi-arab-asia-circle-country-flag-nation-national-o-shaped-flag-icon.png', code: '+966' },
  { label: 'Qatar', name: 'Qatar', flag: 'https://png.pngtree.com/png-vector/20220610/ourmid/pngtree-circular-world-flag-qatar-icon-png-image_4830149.png', code: '+974' },
  { label: 'Kuwait', name: 'Kuwait', flag: 'https://cdn-icons-png.flaticon.com/512/197/197459.png', code: '+965' },
  { label: 'New Zealand', name: 'New Zealand', flag: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWHRvRfDYPYxXa2dbCZeYluMlQeF1fsnuZw&s', code: '+64' },
  { label: 'UAE', name: 'UAE', flag: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeswJD5ECFO5XRuDZKKX2xR0JBajD0pjXSHw&s', code: '+971' }
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
      <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', gap : 1}}>
        <Grid sx={{textAlign : 'left', marginLeft : '4px'}} container spacing={2}>
          <Grid item xs={6}>
            <Typography sx={{fontSize : {xs: '10px' , md :'14px' , lg :'17px'}}}  variant="body1" color={passwordRequirements.minLength ? 'green' : 'red'}>
              8 characters Minimum
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{fontSize : {xs: '10px' , md :'14px' , lg :'17px'}}} variant="body1" color={passwordRequirements.hasUpperCase ? 'green' : 'red'}>
            one uppercase character
            </Typography>
          </Grid>
        </Grid>
        <Grid sx={{textAlign : 'left', marginLeft : '4px'}} container spacing={2}>
          <Grid item xs={6}>
            <Typography sx={{fontSize : {xs: '10px' , md :'14px' , lg :'17px'}}} variant="body1" color={passwordRequirements.hasNumber ? 'green' : 'red'}>
            One Number
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{fontSize : {xs: '10px' , md :'14px' , lg :'17px'}}} variant="body1" color={passwordRequirements.hasLowerCase ? 'green' : 'red'}>
            one lowercase character
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  render() {
    const { formValues, formErrors } = this.state;
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fafafa', width: 'fit', height: 'auto' }}>
        <Box display={{ xs: 'none', md: 'none', lg: 'block' }} sx={{ marginLeft: '3rem' }}>
          <img style={{ width: '45vw', height: '100%' }} src='https://warrantyapp-308736-react.b308736.dev.eastus.az.svc.builder.cafe/static/media/signup_left_image.016c1705.png' />
        </Box>
        <Box sx={{ width: { xs: "90vw", md: '90vw', lg: '50vw' }, height: { xs : 'fit', lg :'95%'}, boxShadow: 4, borderRadius: '14px', backgroundColor: 'white', margin: '2rem' }}>
          <FormControl
            sx={{ width: '90%', padding: '24px', lineHeight : {xs : 10} }}
            component="form"
            onSubmit={this.handleSubmit}
          >
            <Typography sx={{ textAlign: 'left', fontSize : {xs: '18px' , md :'24px' , lg :'30px'} }} variant="h5">Need an Account - Sign Up</Typography>
            <Typography sx={{ textAlign: 'left', color: 'skyblue',fontSize : {xs: '14px' , md :'20px' , lg :'24px'} }} variant="h6">Basic Information</Typography>
           
            <TextField
              size='small'
              margin="dense"
              sx={{ marginTop: '10px' }}
              id="full-name"
              label="Full Name"
              placeholder='Full Name'
              variant="outlined"
              value={formValues.fullName}
              onChange={this.handleChange('fullName')}
              error={Boolean(formErrors.fullName)}
              helperText={formErrors.fullName}
            />
            <TextField
              size='small'
              margin="dense"
              sx={{ marginTop: '10px' }}
              id="email-address"
              label="Email Address"
              placeholder='Email Address'
              variant="outlined"
              value={formValues.email}
              onChange={this.handleChange('email')}
              error={Boolean(formErrors.email)}
              helperText={formErrors.email}
            />
            <FormControl margin="dense" sx={{ marginTop: '10px', width: '100%' }} variant="outlined">
              <InputLabel id="country-select-label">Country</InputLabel>
              <Select
                size='small'
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
                size='small'
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
                size='small'
                id="outlined-adornment-password"
                type={formValues.showPassword ? 'text' : 'password'}
                value={formValues.password}
                onChange={this.handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      size='small'
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
            <Typography>
              
            </Typography>
            <FormControlLabel
              control={<Checkbox name="terms" color="primary" />}
              label="I agree to the Terms and Conditions"
              sx={{ marginTop: '10px' }}
            />
            <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
              <Button type="submit" variant="contained" sx={{ marginTop: '10px', width: '50%', height: '3rem' }}>
                Sign Up
              </Button>
              <Typography variant='h6'>Already have an account? <Link>Sign In</Link></Typography>

            </Stack>

          </FormControl>
        </Box>

      </Box>
    );
  }
}

export default SignUpForm;

