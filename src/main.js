import Vue from "vue";
import "./plugins/axios";
import "./plugins/http_client";
import "./plugins/utils";
import "./plugins/security"
import App from "./App.vue";
import router from "./router";
import './services'
import store from "./store";
import vuetify from "./plugins/vuetify";
import vMask from "v-mask";
import "./assets/scss/variables.scss";
import firebaseConfig from "./firebase/config";
import {initializeApp} from "firebase/app"
import {v4} from "uuid"
import {

} from 'firebase/firestore/lite';
import { getCountFromServer, addDoc,
  collection,
  deleteDoc,
  doc,
  endAt,
  endBefore,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  startAt,
  Timestamp,
  where,
writeBatch,
    runTransaction
} from 'firebase/firestore';
import {deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import momentTime from "moment-timezone";
import loadComponentes from "@/plugins/loadComponents";
import Vuelidate from 'vuelidate'
// Import Vue FilePond
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import imagePreview from 'image-preview-vue'
import 'image-preview-vue/lib/imagepreviewvue.css'

import {VTextField} from 'vuetify/lib'
import VCurrencyField from "v-currency-field";


const app = initializeApp(firebaseConfig);
Vue.prototype.$DB = getFirestore(app)
// Vue.prototype.$db = firestore2(app)
Vue.prototype.$writeBatch = writeBatch
Vue.prototype.$storage = getStorage(app)
Vue.prototype.$ref = ref
Vue.prototype.$uploadBytesResumable = uploadBytesResumable
Vue.prototype.$getDownloadURL = getDownloadURL
Vue.prototype.$deleteObject = deleteObject
Vue.prototype.$collection = collection
Vue.prototype.$runTransaction = runTransaction
// Vue.prototype.$collection2 = collection2
Vue.prototype.$timestamp = Timestamp
Vue.prototype.$where = where
Vue.prototype.$startAt = startAt
Vue.prototype.$startAfter = startAfter
Vue.prototype.$limitToLast = limitToLast
Vue.prototype.$endBefore = endBefore
Vue.prototype.$endAt = endAt
Vue.prototype.$orderBy = orderBy
Vue.prototype.$limit = limit
Vue.prototype.$query = query
Vue.prototype.$getDocs = getDocs
Vue.prototype.$getDoc = getDoc
Vue.prototype.$getCountFromServer = getCountFromServer
Vue.prototype.$addDoc = addDoc
Vue.prototype.$deleteDoc = deleteDoc
Vue.prototype.$doc = doc
Vue.prototype.v4 = v4


// Create component
const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview
);

Vue.use(imagePreview)

Vue.component('FilePond', FilePond)

Vue.component('v-text-field', VTextField)

Vue.use(VCurrencyField, {
  locale: "es-US",
  decimalLength: 2,
  autoDecimalMode: true,
  min: 0,
  max: null,
  defaultValue: 0,
  valueAsInteger: false,
  allowNegative: false,
});

Vue.prototype.$currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const moment = require("moment");
require("moment/locale/es");
Vue.prototype.moment = moment;

Vue.use(vMask);
Vue.use(require("vue-moment"), {
  moment,
  momentTime,
});

loadComponentes(Vue);

Vue.config.productionTip = false;

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
