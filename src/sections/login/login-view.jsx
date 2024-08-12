// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';


// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();
  




//   [6:09 PM] Hien Nguyen Thai
// {
//     "userId": 1,
//     "username": "hiennt273@fpt.com",
//     "role": "admin",
//     "companyId": 1,
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxLCJpYXQiOjE3MjM0NjA4MjgsImV4cCI6MjMyODI2MDgyOCwianRpIjoiMSJ9.PH4M9aNoTKlT3v8C6jIJTJrd6yZWSimdttlMbZcPUjE"
// }
 


  const handleClick = async () => {

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users');

      // longga 
      console.log(response)

      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('role', response.data.role)


    } catch (error) {
      console.log(error);
    }

    router.push('/');
  };

  
  const clickV2 = async () => {
    const getToken = localStorage.getItem('accessToken')
    const payload = 
      {
        firstName: 'Fred',
        lastName: 'Flintstone',
        orders: [1, 2, 3],
        photo: document.querySelector('#fileInput').files
      }
    const response = await axios.post('/user', payload , {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken}`
      }
    })
    console.log('response', response)
  }

  const renderForm = (
    <>
      <Stack spacing={3}>
        <Box sx={{ height: '10px' }} />
        <TextField
          name="name"
          label="Organization name"
          InputProps={{
            endAdornment: <InputAdornment position="end">.localhost:3030</InputAdornment>,
          }}
        />

        {/* <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}
      <Box sx={{ height: '30px' }} />
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 620,
          }}
        >
          <Typography variant="h4">Sign in to system</Typography>

          {/* <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography> */}

          {/* <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack> */}

          {/* <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider> */}

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
