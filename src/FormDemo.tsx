import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";


const schema = yup.object({
    firstName: yup.string().required('firstname is required'),
    lastName: yup.string().required('lastName is required'),
}).required()

type Inputs = {
    firstName: string
    lastName: string
}

const ReactForm = () => {
    const {register, handleSubmit, formState: {errors}} =
        useForm<Inputs>(
            {
                resolver: yupResolver(schema)
            }
        );

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return <>
        <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: 'column'}}>
            <input {...register("firstName")} />
            {errors?.firstName && errors.firstName.message}

            <input {...register("lastName", {pattern: /^[A-Za-z]+$/i})} />
            {errors?.lastName && errors.lastName.message}
            <input type="submit"/>


        </form>
    </>
}

export default ReactForm