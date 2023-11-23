import React from 'react'
import {useFormik} from "formik";
import {FormValues} from "./FormikDemo.tsx";
import * as yup from 'yup'

const schema = yup.object({
    name: yup.string().required('name is required!'),
    parameters: yup.array().of(yup.object({
        name: yup.string().required('Name is required'),
        description: yup.string().required('Description is required'),
    }))
})

interface FormikHookDemoProps {
}

const FormikHookDemo: React.FC<FormikHookDemoProps> = () => {
    const initialValues: FormValues = {
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
    const formik = useFormik<FormValues>({
        initialValues,
        validationSchema: schema,
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));

        }
    })

    console.log(formik.errors);


    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name}
                </div>
                <div>
                    <label htmlFor="hobby">Hobby</label>
                    <input
                        id="hobby"
                        name="hobby"
                        type="checkbox"
                        onChange={formik.handleChange}
                        value={'game'}
                    />
                    <input
                        id="hobby"
                        name="hobby"
                        type="checkbox"
                        onChange={formik.handleChange}
                        value={'code'}
                    />
                </div>
                <div>
                    <label htmlFor="gender">Gender</label>
                    <input
                        id="gender"
                        name="gender"
                        type="radio"
                        onChange={formik.handleChange}
                        value={'male'}
                    />
                    <input
                        id="gender"
                        name="gender"
                        type="radio"
                        onChange={formik.handleChange}
                        value={'female'}
                    />
                </div>
                {
                    formik.values.parameters.map((v, i) => {

                        return <div key={i}>
                            <label htmlFor="name">Name</label>
                            <input name={`parameters[${i}].name`} value={v.name} onChange={formik.handleChange}/>
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/*  @ts-expect-error */}
                            {formik.errors.parameters && formik.errors.parameters[i]?.name}
                            <label htmlFor="description">Description</label>
                            <input name={`parameters[${i}].description`} value={formik.values.parameters[i].description}
                                   onChange={formik.handleChange}/>
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/*  @ts-expect-error */}
                            {formik.errors.parameters && formik.errors.parameters[i]?.description}
                        </div>
                    })
                }
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
export default FormikHookDemo