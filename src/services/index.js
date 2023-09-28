import Vue from "vue";
import auth from './auth.services'
import users from './user.services'
import roles from './roles.services'
import profiles from './profiles.services'
import typeRoles from './typeRoles.services'
import paths from './path.services'
import product from './product.services'

Vue.prototype.services = {
    auth,
    users,
    roles,
    profiles,
    typeRoles,
    paths,
    product
}
