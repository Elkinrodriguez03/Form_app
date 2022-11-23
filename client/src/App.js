import React, {useEffect, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './App.css';
// import { response } from "express";

  const FormSetting = () => {

    const [data, setData] = useState({
      name: "",
      email: "",
      country: ""
    })

    useEffect(() => {
      const postData = async () => {
        const response = await fetch("http://localhost:3003/api/save-users", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          } 
        }) 
        const sendData = await response.json();
        console.log(sendData);
        setData(await sendData);
      }
      
      console.log("before check fuction");
      postData(); 
      console.log("after check fuction");
      
    },[]); 
    
    
    const [formSent, changeFormSent] = useState(false);
    
    const [countries, setCountries] = useState([]);
    
    useEffect(() => {
      const getCountry = async () => {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const getCountries = await response.json();
        // console.log(getCountries);
        setCountries(await getCountries);
      }
      getCountry();
    },[]);

    const handleCountry = (event) => {
      const getCountryId = event.target.value;
      console.log(getCountryId);
    } 
    
    return (
        <>
          <Formik
            initialValues={{
              name: '',
              email: '',
              country: ''
            }}
            validate={(values) => {
              let errors = {};

              // Name Validation  
              if(!values.name) {
                errors.name = "Please insert name"
              } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
                errors.name = "Name can only contain letters"
              }
              
              // Email validation 
              if(!values.email) {
                errors.email = "Please insert an email"
              } else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                errors.email = "Email no found"
              }

              // Country validation
              // if(!values.country) {
                //   errors.country = "Please select a country"
                // } else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.country)) {
                  //   errors.country = "Country no found"
                  // }
                  return errors;
                }}
                onSubmit={(values, {resetForm}) => {
                  resetForm();
                  console.log("Form sent");
                  changeFormSent(true);
                  setTimeout(() => changeFormSent(false), 5000);
                }}
          >

              {( {errors} ) => (
                <div className="container">
                <Form className="form">
                  <div>
                      <label htmlFor="name">Name</label>
                      <Field 
                      type="text" 
                      id="name" 
                      name="name" 
                      placeholder="Full Name"
                      />
                      <ErrorMessage name="name" component={() => (<div className="error">{errors.name}</div>)} />
                  </div>
                  <div>
                      <label htmlFor="email">Email</label>
                      <Field 
                      type="text" 
                      id="email" 
                      name="email" 
                      placeholder="E-mail" 
                    />
                      <ErrorMessage name="email" component={() => (<div className="error">{errors.email}</div>)} />
                  </div>
                  <div>
                    <Field name="country" as="select" onChange={(e) => handleCountry(e)}>
                      <option placeholder="Select-Country" value="Select Country"> -- Select Country -- </option>
                    {
                      countries.map((getCountry) => (
                        <option key={ getCountry.id }>{ getCountry.name.common } ( { getCountry.altSpellings[0] } )</option>                      

                      ))
                    }
                    </Field>
                  </div>
                  <button type="submit">Send</button>
                  {formSent && <p className="success">Form sent successfuly!</p>}

                </Form>

                </div>
              )}
          </Formik>
        </>
      )
    }

export default FormSetting;
