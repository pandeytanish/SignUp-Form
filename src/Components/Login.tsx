import  { ChangeEvent, Component, FormEvent } from 'react'
import { Box, FormControl, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

interface FormProps {
};

type Values = {
    name: string;
    email: string;
    password: string;
}

interface FormState {
    values : Values;
    arr : Values[]
  };
  
export default class extends Component<FormProps,FormState> {
    constructor (props : FormProps) {
        super(props);
        this.state = {
           values:{
            name : '',
            email : '',
            password : ''
           },
           arr : []
        }
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        } as unknown as Pick<FormState, keyof FormState>);
      }
   handleSubmit = (event: FormEvent<HTMLFormElement>) =>  {
    event.preventDefault();
    console.log(this.state);
  }
  render() {

    return (
      <Box sx={{display : 'flex', justifyContent : 'center' , alignItems : 'center' ,margin : '2rem'}}>
  <Box>
    <form onSubmit={this.handleSubmit} >
      <TextField  name='name' value={this.state.values.name}
            onChange={this.handleChange}margin='dense' required fullWidth label="Name"  />
      <TextField name='email'  value={this.state.values.email} onChange={this.handleChange} margin='dense' required fullWidth label="Email"  />
      <TextField name='password' value={this.state.values.password} onChange={this.handleChange} margin='dense' required fullWidth label="Password" />
      <Button type='submit' variant='contained'>Submit</Button>
    </form>

    </Box>
        
 </Box>
      
    )
  }
}


// import { ChangeEvent, Component, FormEvent } from 'react';
// import { Box, Typography } from '@mui/material';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

// interface FormProps {};

// type Values = {
//   name: string;
//   email: string;
//   password: string;
// }

// interface FormState {
//   values: Values;
//   arr: Values[];
// };

// export default class MyForm extends Component<FormProps, FormState> {
//   constructor(props: FormProps) {
//     super(props);
//     this.state = {
//       values: {
//         name: '',
//         email: '',
//         password: ''
//       },
//       arr: []
//     };
//   }

//   handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     this.setState((prevState) => ({
//       values: {
//         ...prevState.values,
//         [name]: value,
//       }
//     }));
//   }

//   handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     this.setState((prevState) => ({
//       arr: [...prevState.arr, prevState.values],
//       values: { name: '', email: '', password: '' }
//     }), () => {
//       console.log(this.state.arr);
//     });
//   }
  
//   render() {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem' }}>
//         <Box>
//           <form onSubmit={this.handleSubmit}>
//             <TextField
//               name='name'
//               value={this.state.values.name}
//               onChange={this.handleChange}
//               margin='dense'
//               required
//               fullWidth
//               label="Name"
//             />
//             <TextField
//               name='email'
//               value={this.state.values.email}
//               onChange={this.handleChange}
//               margin='dense'
//               required
//               fullWidth
//               label="Email"
//             />
//             <TextField
//               name='password'
//               value={this.state.values.password}
//               onChange={this.handleChange}
//               margin='dense'
//               required
//               fullWidth
//               label="Password"
//             />
//             <Button type='submit' variant='contained'>Submit</Button>
//           </form>
//         </Box>
//       </Box>
//     );
//   }
// }


