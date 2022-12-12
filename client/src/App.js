import React, {useEffect, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './App.css';
// import { Axios } from "axios";
import Axios from 'axios';
// import { response } from "express";
// import e, { response } from "express";
// import { response } from "express";

  const FormSetting = () => {
    
    // const [data, setData] = useState({
    //   name: "",
    //   email: "",
    //   country: ""
    // })
    // // console.log(data);


    // useEffect(() => {
    //   const postData = async () => {
    //     const response = await fetch("http://localhost:3003/api/save-users", {
    //       method: 'POST',
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         name: "",
    //         email: "",
    //         country: ""
    //       })
    //     }) 
    //     // const sendData = await response.json();
    //     // console.log(sendData);
    //     // data(sendData);
      
    //   }
      
    //   postData(); 
    //   console.log("after call function");
      
    // },[]); 

    const [data, setData] = useState({
      name: "",
      email: "",
      country: ""
    })

    useEffect(() => {
      Axios.post('http://localhost:3003/api/save-users')
      .then(req => {
        console.log("Sending data to api", req.data)
        setData(req.data)
      }).catch(err => console.log(err))
    }, [])
    
    const postData = (e) => {
      e.preventDefault();
      Axios.post('http://localhost:3003/api/save-users', {
        name: "",
        email: "",
        country: ""
      }).then(res => console.log('Posting data', res)).catch(err => console.log(err))
    }
    
    const handleSubmit = (e) => {
      const newData = {...data}
      newData[e.target.id] = e.target.value
      setData(newData);
      console.log(newData);
    }

    const submitHandler = (e) => {
      e.preventDefault(e);
      console.log({data});
    }

    
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
      data.country = getCountryId;
    } 
    
    return (
        <>
          <Formik
            initialValues={{
              name: "",
              email: "",
              country: ""
            }}
            onSubmit={({values, resetForm}) => {
              // const submitHandler = (e) => {
              //   e.preventDefault();
              //   console.log({data});
              // }
              // postData();
              resetForm();
              console.log("Form sent");
              changeFormSent(true);
              setTimeout(() => changeFormSent(false), 5000);
                           
            }}
            //  
        
            validate={(values) => {
              let errors = {values};

              // Name Validation  
              if(!data.name) {
                errors.name = "Please insert name"
              } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(data.name)) {
                errors.name = "Name can only contain letters"
              }
              
              // Email validation 
              if(!data.email) {
                errors.email = "Please insert an email"
              } else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(data.email)) {
                errors.email = "Email no found"
              }

              // Country validation
              if(!data.country) {
                  errors.country = "Please select a country"
                } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(data.country)) {
                    errors.country = "Country no found"
                  }
                  return errors;
                }}
                >

              {( {errors} ) => (
                <div className="container">
                <Form 
                  onSubmit={postData}
            //       onSubmit={({values, resetForm}) => {
            //   // const submitHandler = (e) => {
            //   //   e.preventDefault();
            //   //   console.log({data});
            //   // }
            //         resetForm();
            //         submitHandler();
            //         console.log("Form sent");
            //         changeFormSent(true);
            //         setTimeout(() => changeFormSent(false), 5000);
                           
            // }}
                // method="POST"
                className="form">
                
                  <div>
                      <label htmlFor="name">Name</label>
                      <Field 
                      onChange={(e) => handleSubmit(e)}
                      value={data.name}
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
                      onChange={(e) => handleSubmit(e)}
                      value={data.email}
                      type="text" 
                      id="email" 
                      name="email" 
                      placeholder="E-mail" 
                    />
                      <ErrorMessage name="email" component={() => (<div className="error">{errors.email}</div>)} />
                  </div>
                  <div>
                    <Field name="country" value={data.country} as="select" onChange={(e) => handleCountry(e)}>
                      <option placeholder="Select-Country" value={data.country}> -- Select Country -- </option>
                    {
                      countries.map((getCountry) => (
                        <option key={ getCountry.id }>{ getCountry.name.common } ( { getCountry.altSpellings[0] } )</option>                      

                      ))
                    }
                    </Field>
                      {/* <ErrorMessage name="country" component={() => (<div className="error">{errors.country}</div>)} /> */}
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
