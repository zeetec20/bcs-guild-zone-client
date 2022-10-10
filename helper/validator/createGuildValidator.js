import * as yup from 'yup'

const schema = yup.object().shape({
    banner: yup.mixed().test('banner', 'banner is required to create guild', value => !value || value.name != ''),
    logo: yup.mixed().test('logo', 'logo is required to create guild', value => !value || value.name != ''),
    name: yup.string().required(),
    discord: yup.string().notRequired(),
    twitter: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    telegram: yup.string().email().notRequired(),
}).test('social media', 'social media al least one must filled', value => ['discord', 'twitter', 'email', 'telegram'].map(e => value[e] != '').includes(true))

export default schema
