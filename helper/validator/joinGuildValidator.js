import * as yup from 'yup'

const schema = yup.object().shape({
    experience: yup.string().required()
})

export default schema
