import pathServices from "../../services/path.services"

export default {
    namespaced: true,
    state: {
        alert: {
            show: false,
            type: "info",
            message: "",
            timeout: 2500,
        },
        loader: false,
        sideBar: false,
        menu: [
          {
            "nombre": "Bolsa de empleo",
            "uri": "https://admin-bolsadempleo-rh.egob.sv",
            "icono": "",
            "childrens": [
              {
                "nombre": "Mantenimientos",
                "uri": "",
                "icono": "mdi-list-box-outline",
                "childrens": [
                  {
                    "nombre": "Formacion",
                    "uri": "/formacion",
                    "icono": "mdi-school-outline"
                  },
                  {
                    "nombre": "Conocimientos",
                    "uri": "/conocimientos",
                    "icono": "mdi-medal-outline"
                  },
                  {
                    "nombre": "Capacidades",
                    "uri": "/capacidades",
                    "icono": "mdi-wrench-outline"
                  },
                  {
                    "nombre": "Areas de interes",
                    "uri": "/areas-interes",
                    "icono": "mdi-magnify"
                  },
                  {
                    "nombre": "Palabras clave",
                    "uri": "/palabras-claves",
                    "icono": "mdi-alphabet-latin"
                  },
                  {
                    "nombre": "Cargos",
                    "uri": "/cargos",
                    "icono": "mdi-briefcase-outline"
                  }
                ]
              },
              {
                "nombre": "Ofertas",
                "uri": "/ofertas",
                "icono": "mdi-briefcase-outline",
                "childrens": []
              },
              {
                "nombre": "Candidatos",
                "uri": "/candidatos",
                "icono": "mdi-format-list-bulleted",
                "childrens": []
              }
            ]
          },
          {
            "nombre": "Contratacion",
            "uri": "https://admin-contratacion-rh.egob.sv",
            "icono": "", //mdi-text-account
            "childrens": [
              {
                "nombre": "Contrato",
                "uri": "",
                "icono": "mdi-clipboard-check-outline",
                "childrens": [
                  {
                    "nombre": "Procesos",
                    "uri": "/contrato/procesos",
                    "icono": "mdi-file-tree-outline"
                  },
                  {
                    "nombre": "Asignar proceso",
                    "uri": "/contrato/asignacion-proceso",
                    "icono": "mdi-window-restore"
                  },
                ]
              }
            ]
          },
          {
            "nombre": "Planilla y nómina",
            "uri": "https://",
            "icono": "",
            "childrens": [
              {
                "nombre": "Catalogos generales",
                "uri": "",
                "icono": "mdi-list-box",
                "childrens": [
                  {
                    "nombre": "Tipo de documento",
                    "uri": "/tipo-documento",
                    "icono": "mdi-file-document-multiple"
                  },
                  {
                    "nombre": "Paises",
                    "uri": "/pais",
                    "icono": "mdi-map"
                  },
                  {
                    "nombre": "Departamentos",
                    "uri": "/departamento",
                    "icono": "mdi-map-marker"
                  },
                  {
                    "nombre": "Municipios",
                    "uri": "/municipios",
                    "icono": "mdi-map-marker-radius"
                  },
                  {
                    "nombre": "Estado civil",
                    "uri": "/estado-civil",
                    "icono": "mdi-account-question"
                  },
                  {
                    "nombre": "Tipo sangre",
                    "uri": "/tipo-sangre",
                    "icono": "mdi-water"
                  },
                  {
                    "nombre": "Sexo",
                    "uri": "/sexo",
                    "icono": "mdi-gender-male-female"
                  },
                  {
                    "nombre": "Parentesco",
                    "uri": "/parentesco",
                    "icono": "mdi-account-child"
                  },
                  {
                    "nombre": "Admra. de pensiones",
                    "uri": "/administradora-pensiones",
                    "icono": "mdi-account-cash"
                  },
                  {
                    "nombre": "Formacion academica",
                    "uri": "/formacion-academica",
                    "icono": "mdi-school"
                  },
                  {
                    "nombre": "Nivel educativo",
                    "uri": "/nivel-educativo",
                    "icono": "mdi-book-outline"
                  },
                  {
                    "nombre": "Tipo de institucion",
                    "uri": "/tipo-institucion",
                    "icono": "mdi-domain"
                  },
                  {
                    "nombre": "Institucion",
                    "uri": "/institucion",
                    "icono": "mdi-office-building"
                  },
                  {
                    "nombre": "Estado de empleado",
                    "uri": "/estado-empleado",
                    "icono": "mdi-account-settings"
                  },
                  {
                    "nombre": "Discapacidad",
                    "uri": "/discapacidad",
                    "icono": "mdi-account-injury"
                  },
                  {
                    "nombre": "Tipo de establecimiento",
                    "uri" : "/tipo-establecimiento",
                    "icono": "mdi-office-building-cog"
                  },
                  {
                    "nombre": "Establecimiento",
                    "uri": "/establecimiento",
                    "icono": "mdi-home-city"
                  },
                  {
                    "nombre": "Estado puesto funcional",
                    "uri": "/estado-puesto-funcional",
                    "icono": "mdi-folder-alert"
                  },
                  {
                    "nombre": "Puesto funcional",
                    "uri": "/puesto-funcional",
                    "icono": "mdi-folder-account"
                  },
                  {
                    "nombre": "Instituciones financieras",
                    "uri": "/institucione-financiera",
                    "icono": "mdi-bank"
                  },
                  {
                    "nombre": "Pagaduria",
                    "uri": "/pagaduria",
                    "icono": "mdi-cash-register"
                  },
                  {
                    "nombre": "Tipo acreedor",
                    "uri": "/tipo-acreedor",
                    "icono": "mdi-store-outline"
                  },
                  {
                    "nombre": "Acreedores",
                    "uri": "/acreedor",
                    "icono": "mdi-store-plus-outline"
                  }
                ]
              },
              {
                "nombre": "Catalogos de plazas",
                "uri": "",
                "icono": "mdi-list-box",
                "childrens": [
                  {
                    "nombre": "Categoria plaza",
                    "uri": "/categoria-plaza",
                    "icono": "mdi-border-all"
                  },
                  {
                    "nombre": "Estado plaza",
                    "uri": "/estado-plaza",
                    "icono": "mdi-border-all"
                  },
                  {
                    "nombre": "Plaza nominal",
                    "uri": "/plaza-nominal",
                    "icono": "mdi-file-document-multiple"
                  },
                  {
                    "nombre": "Sistema pago",
                    "uri": "/sistema-pago",
                    "icono": "mdi-cash-fast"
                  },
                  {
                    "nombre": "Presupuesto financia",
                    "uri": "/presupuesto-financia",
                    "icono": "mdi-cash-multiple"
                  },
                  {
                    "nombre": "Tipo financiamiento",
                    "uri": "/tipo-financiamiento",
                    "icono": "mdi-wallet"
                  },
                  {
                    "nombre": "Formalizacion",
                    "uri": "/formalizacion",
                    "icono": "mdi-file-check"
                  },
                  {
                    "nombre": "Remuneración",
                    "uri": "/remuneracion",
                    "icono": "mdi-credit-card-check-outline"
                  }
                ]
              },
              {
                "nombre": "Estructura",
                "uri": "/estructura",
                "icono": "mdi-lan",
                "childrens": []
              },
              {
                "nombre": "Específico de gasto",
                "uri": "/especifico-gasto",
                "icono": "mdi-cash-check",
                "childrens": []
              },
              {
                "nombre": "Cifrado presupuestario",
                "uri": "/cifrado-presupuestario",
                "icono": "mdi-file-document-multiple-outline",
                "childrens": []
              },
              {
                "nombre": "Puesto por unidad",
                "uri": "/puesto-unidad",
                "icono": "mdi-lan",
                "childrens": []
              },
              {
                "nombre": "Planilla",
                "uri": "/planilla",
                "icono": "mdi-card-text",
                "childrens": []
              },
              {
                "nombre": "Nómina",
                "uri": "/nomina",
                "icono": "mdi-card-text",
                "childrens": []
              },
              {
                "nombre": "Configuraciones",
                "uri": "",
                "icono": "mdi mdi-cog",
                "childrens": [
                  {
                    "nombre": "Configuración de Ley",
                    "uri": "/configuracion-parametros-sistema/",
                    "icono": "mdi-grid-large"
                  },
                  {
                    "nombre": "Catálogo de ingresos",
                    "uri": "/ingresos",
                    "icono": "mdi-cash-fast"
                  },
                  {
                    "nombre": "Catálogo de deducciones",
                    "uri": "/deducciones",
                    "icono": "mdi-cash-fast"
                  }
                ]
              }
            ]
          },
          {
            "nombre": "Bolsa de empleo",
            "uri": "https://bolsadempleo-rh.egob.sv",
            "icono": "",
            "childrens": [
              {
                "nombre": "Editar Perfil",
                "uri": "/mi-perfil",
                "icono": "mdi-pencil-outline",
                "childrens": []
              },
              {
                "nombre": "Documentacion",
                "uri": "/mi-expediente",
                "icono": "mdi-folder-account-outline",
                "childrens": []
              },
              {
                "nombre": "Mi CV",
                "uri": "/mi-curriculum",
                "icono": "mdi-account-box-outline",
                "childrens": []
              },
              {
                "nombre": "Mis Postulaciones",
                "uri": "/mis-postulaciones",
                "icono": "mdi-send-outline",
                "childrens": []
              },
              {
                "nombre": "Mis Favoritos",
                "uri": "/favoritos",
                "icono": "mdi-heart-outline",
                "childrens": []
              },
              {
                "nombre": "Mis Invitaciones",
                "uri": "/mis-invitaciones",
                "icono": "mdi-email-outline",
                "childrens": []
              }
            ]
          }
        ],
        rutas: [


        ],
    },
    getters: {
        getAlert: (state) => {
            return state.alert;
        },
    },
    mutations: {
        setAlert: (state, payload) => {
            state.alert = payload;
        },
        setLoader: (state, payload) => {
            state.loader = payload;
        },
        setSideBar: (state, payload) => {
            state.sideBar = payload;
        },
        setMenu: (state, menu) => {
            state.menu = menu;
        },
        setRutas: (state, rutas) => {
            state.rutas = rutas;
        },
    },
    actions: {
        getMenu: async ({commit}) => {
            const response = await pathServices.getAuthorizedPaths()
            const menu = getNavItem(response?.data)
            commit("setMenu", menu);
            commit("setRutas", response.data);

        },
        clearMenu: ({commit}) => {
            commit("setMenu", []);
            commit("setRutas", []);
        }
    },
};

const getNavItem = (items) => {
    return items.filter((item) => {
        if (!item.mostrar) return false
        if (item.childrens?.length > 0) item.childrens = getNavItem(item.childrens)
        return true
    })
}
