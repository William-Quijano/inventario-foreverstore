import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '../assets/scss/index.scss'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            //Se definen colores globales para el tema claro
            light : {
                pink: '#ffb3e1',
                purple: '#753979',
                greenWsp: '#25D366'
            },
            dark:{

            }
        }
    }
});
