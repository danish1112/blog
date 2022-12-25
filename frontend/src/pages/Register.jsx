import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {MDBCard, MDBCardBody, MDBCardFooter,MDBIcon, MDBInput, MDBValidation, MDBBtn, MDBSpinner } from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'
import { register } from '../redux/features/authSlice'

const initialState = {
    firstName : '',
    lastName : '',
    email : '',
    password : '',
    confirmPassword : ''
}

const Register = () => {
    const [formValues, setFormvalues] = useState(initialState)
    const {email, password, firstName, lastName, confirmPassword } = formValues

    const { loading, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onInputChange = (e) => {
        let {name, value} = e.target;
        setFormvalues({...formValues, [name] : value})
    }

    useEffect(() => {
        console.log(error);
        if(error){
            toast.error(error)
        }
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
          return toast.error('password should match')
        }
        if(email && password && firstName && lastName && confirmPassword){
          dispatch(register({formValues, navigate, toast}))
        }
    }
  return (
    <div  
    style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}>
        <MDBCard alignment='center'>
            <MDBIcon fas icon="user-circle" className="fa-2x" />
            <h5>Sign In</h5>
            <MDBCardBody>
            <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-6">
              <MDBInput
                label="First Name"
                type="text"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide first name"
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="Last name"
                type="text"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide last name"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your password"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your confirm password"
              />
            </div>
            <div className='col-md-12'>
                <MDBBtn style={{width : '100%'}} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                   Register
                </MDBBtn>
            </div>
            </MDBValidation>
            </MDBCardBody>
            <MDBCardFooter>
               <Link to='/login'>
                <p>Already have an account? Sign in</p>
               </Link>
            </MDBCardFooter>
        </MDBCard>
    </div>
  )
}

export default Register