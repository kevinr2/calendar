import { useEffect } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useForm } from "../../hooks/useForm";
import "./loginPage.css";
import Swal from 'sweetalert2'


const loginFormFields={
  loginEmail:'',
  loginPassowrd: ''
}
const registerFormFields={
  registerName: '',
  registerEmail:'',
  registerPassowrd: '',
  registerPassowrd2: '',
}

export const LoginPage = () => {

   const {startLogin, errorMessage,startRegister}=useAuthStore()

  const {loginEmail,loginPassowrd,onInputChange:onLoginInpuntChange} = useForm(loginFormFields)
  const {registerEmail,registerName,registerPassowrd,registerPassowrd2, onInputChange:onRegisterChange} = useForm(registerFormFields)


  const loginSubmit = (event)=>{
    event.preventDefault();
    startLogin({email:loginEmail, password:loginPassowrd})
  }
  const registerSubmit = (event)=>{
    event.preventDefault();
    if (registerPassowrd !== registerPassowrd2) {
      Swal.fire('error en registro','contraseñas no son iguales', 'error')
      return
    }
    startRegister({name:registerName, password:registerPassowrd,email:registerEmail})

    
  }
  useEffect(() => {
    if(errorMessage !==undefined){
      Swal.fire('error en la autenticacion',errorMessage,'error')
    }

  }, [errorMessage])
  


  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInpuntChange}
                autoComplete="username"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassowrd"
                value={loginPassowrd}
                onChange={onLoginInpuntChange}
                autoComplete="current-password"
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterChange}
                autoComplete="username"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassowrd"
                value={registerPassowrd}
                onChange={onRegisterChange}
                autoComplete="new-password"
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassowrd2"
                value={registerPassowrd2}
                onChange={onRegisterChange}
                autoComplete="new-password"
              />
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
