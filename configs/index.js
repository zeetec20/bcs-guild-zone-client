import color from 'styles/_color.variable.module.scss'
import font from 'styles/_font.variable.module.scss'
import regions from 'configs/regions'

const config = {
    color,
    font,
    env: {
        domain: process.env.API_URL
    },
    regions
}

export default config