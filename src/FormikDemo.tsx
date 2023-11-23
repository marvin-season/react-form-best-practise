import React from 'react'
import {FieldArray, Formik} from "formik";

import * as yup from 'yup'

const schema = yup.object({
    name: yup.string().required('name is required!'),
})

interface FormikDemoProps {
}

interface FormValues {
    name: string;
    hobby: string[];
    gender: 'male' | 'female';
    parameters: {
        name: string;
        description: string;
    }[];
}

const FormikDemo: React.FC<FormikDemoProps> = () => {
    const initValues: FormValues = {
        name: '',
        hobby: [],
        gender: "male",
        parameters: [
            {
                name: '',
                description: '',
            },
        ],
    }

    return (
        <>
            <Formik initialValues={initValues} validationSchema={schema} onSubmit={(values) => {
                console.log(values)
            }}>
                {
                    ({values, errors, isSubmitting, handleSubmit, handleChange}) => {
                        return <>
                            <form onSubmit={handleSubmit}>
                                <div style={{display: "flex", justifyContent: "flex-start"}}>
                                    <label>name:</label>
                                    <input name={'name'} value={values.name} onChange={handleChange}/>
                                    {errors.name && <span>{errors.name}</span>}
                                </div>
                                <div style={{display: "flex", justifyContent: "flex-start"}}>
                                    <label>checkbox: </label>
                                    <input type={'checkbox'} name={'hobby'} defaultChecked={true} value={'code'}
                                           onChange={handleChange}/>
                                    <input type={'checkbox'} name={'hobby'} value={'game'} onChange={handleChange}/>
                                </div>
                                <div style={{display: "flex", justifyContent: "flex-start"}}>
                                    <label>radio: </label>
                                    <input type={'radio'} name={'gender'} value={'female'}
                                           onChange={handleChange}/>
                                    <input type={'radio'} name={'gender'} value={'male'} onChange={handleChange}/>
                                </div>
                                <FieldArray name={'parameters'} render={(arrayHelpers) => {
                                    return <>
                                        {
                                            values.parameters.map((a, i) => {
                                                return <div key={i}
                                                            style={{display: "flex", justifyContent: "flex-start"}}>
                                                    <label>参数</label>
                                                    <div>
                                                        <label>name:</label>
                                                        <input name={`parameters[${i}].name`}
                                                               value={values.parameters[i].name}
                                                               onChange={handleChange}/>
                                                    </div>
                                                    <div>
                                                        <label>description:</label>
                                                        <input name={`parameters[${i}].description`}
                                                               value={values.parameters[i].description}
                                                               onChange={handleChange}/>
                                                    </div>
                                                    <button onClick={() => {
                                                        arrayHelpers.push({
                                                            name: '',
                                                            description: ''
                                                        })
                                                    }}>增加
                                                    </button>
                                                    <button onClick={() => {
                                                        arrayHelpers.remove(i)
                                                    }}>删除
                                                    </button>

                                                </div>
                                            })
                                        }


                                    </>
                                }}></FieldArray>
                                <div>
                                    <button type="submit">
                                        Submit
                                    </button>
                                </div>

                            </form>
                        </>
                    }
                }

            </Formik>
        </>
    )
}
export default FormikDemo