import * as yup from 'yup'

const schema = yup.object().shape({
    description: yup.string().required(),
    total_member: yup.number().required(),
    open_recruitment: yup.number().required(),
    region: yup.string().required()
})

export default schema
