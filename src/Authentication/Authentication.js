import * as React from 'react';
import { useState, useEffect } from 'react';
import { fetchRecipes } from '../store/dataRecipesSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Authentication() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [hideEl, setHideEl] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  console.log('isAvail', isAvailable);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  let password = watch('password');
  let confirmPassword = watch('confirm_password');
  let login = watch('login');

  console.log('errors are', errors);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (hideEl === true) {
      return setTimeout(() => {
        dispatch(fetchRecipes());
        navigate('/');
      }, 3000);
    }
  }, [hideEl]);

  useEffect(() => {
    setIsAvailable(true);
  }, [login]);

  const onSubmit = (data) => {
    fetch('http://localhost:8080/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((flag) => {
        if (flag === false) {
          setIsAvailable(false);
        } else {
          setHideEl(true);
        }
      });
  };

  return (
    <>
      {hideEl === true ? (
        <Box sx={{ pt: '55px' }}>
          <Typography variant="h4" sx={{ fontFamily: 'roboto', fontWeight: 300 }}>
            Вы успешно зарегистрировались
          </Typography>
        </Box>
      ) : (
        <Container
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '55px' }}
        >
          <Typography variant="h4" sx={{ pl: '12px', mb: '15px' }}>
            Вход / Регистрация
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '55px' }}>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <Controller
                control={control}
                name="login"
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-textarea"
                    label="Логин"
                    name="login"
                    error={!!errors.login || isAvailable === false}
                  />
                )}
              />
            </FormControl>
            <Typography variant="h8" sx={{ fontFamily: 'roboto', fontWeight: 300, color: 'red' }}>
              {isAvailable === true ? '' : 'Этот логин занят'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <Controller
                control={control}
                name="password"
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <>
                    <InputLabel htmlFor="outlined-adornment-password" error={!!errors.password}>
                      Пароль
                    </InputLabel>
                    <OutlinedInput
                      {...field}
                      id="outlined-adornment-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Пароль"
                      error={!!errors.password}
                    />
                  </>
                )}
              />
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <Controller
                control={control}
                name="confirm_password"
                defaultValue=""
                rules={{
                  required: true,
                  validate: (value) => {
                    return value === password;
                  },
                }}
                render={({ field }) => (
                  <>
                    <InputLabel htmlFor="outlined-adornment-password" error={!!errors.password}>
                      Повторите пароль
                    </InputLabel>
                    <OutlinedInput
                      {...field}
                      id="outlined-adornment-password"
                      name="confirm_password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Повторите пароль"
                      error={password !== confirmPassword}
                    />
                  </>
                )}
              />
            </FormControl>
          </Box>
          <Button
            disabled={!isValid}
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: '#ccc',
              borderRadius: '18px',
              width: '117px',
              mt: '10px',
              ml: '8px',
              '&:hover': { backgroundColor: '#b5b3b3' },
            }}
          >
            Отправить
          </Button>
        </Container>
      )}
    </>
  );
}
