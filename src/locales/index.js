import en_messages from './en'
import de_messages from './de'
import ru_messages from './ru'
import bs_messages from './bs'
import es_messages from './es'
import br_messages from './br'
import en from 'react-intl/locale-data/en'
import de from 'react-intl/locale-data/de'
import ru from 'react-intl/locale-data/ru'
import bs from 'react-intl/locale-data/bs'
import es from 'react-intl/locale-data/es'
import br from 'react-intl/locale-data/br'

const locales = [
    {
        locale: 'en',
        messages: en_messages,
        data: en
    },
    {
        locale: 'de',
        messages: de_messages,
        data: de
    },
    {
        locale: 'bs',
        messages: bs_messages,
        data: bs
    },
    {
        locale: 'ru',
        messages: ru_messages,
        data: ru
    },
    {
        locale: 'es',
        messages: es_messages,
        data: es
    },
    {
        locale: 'br',
        messages: br_messages,
        data: br
    }

]

export default locales
