import csvToJson from 'helper/csvToJson'
import color from 'styles/_color.variable.module.scss'
import font from 'styles/_font.variable.module.scss'
import regions from 'configs/regions'

const config = {
    color,
    font,
    env: {
        domain: 'http://192.168.1.5:4000'
    },
    regions
}

export default config