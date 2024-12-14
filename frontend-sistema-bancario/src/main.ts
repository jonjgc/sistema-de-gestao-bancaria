import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Importações do Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Importa os estilos básicos do Vuetify
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Criando instância do Vuetify
const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(router);
app.use(vuetify);

app.mount('#app');

