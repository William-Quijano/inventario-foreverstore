<template>
  <v-container fluid class="pa-0">
    <search-component :search-cliente="true" :search-producto="true"
                      :search-fecha="true"></search-component>
    <v-row class="fill-height mt-5 mx-5">
      <v-col class="mb-16">

        <v-sheet height="64">
          <v-row>
            <v-col cols="12" class="d-flex justify-end">

              <v-btn
                  small
                  color="purple"
                  class="white--text"
                  @click="createDeliveryDialog = true"
              >
                Nueva entrega
              </v-btn>

            </v-col>
          </v-row>
        </v-sheet>
        <v-sheet height="64">
          <v-toolbar
              flat
          >
            <v-btn
                outlined
                class="mr-4"
                color="grey darken-2"
                @click="setToday"
            >
              Today
            </v-btn>
            <v-spacer></v-spacer>
            <v-menu
                bottom
                right
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    outlined
                    color="grey darken-2"
                    v-bind="attrs"
                    v-on="on"
                >
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="prev"
            >
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="next"
            >
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
          </v-toolbar>
        </v-sheet>


        <v-sheet height="600">
          <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="events"
              :event-color="getEventColor"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"
          ></v-calendar>
          <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
          >
            <v-card
                color="grey lighten-4"
                min-width="350px"
                flat
            >
              <v-toolbar
                  :color="selectedEvent.color"
                  dark
              >
                <!--                <v-btn icon>-->
                <!--                  <v-icon>mdi-pencil</v-icon>-->
                <!--                </v-btn>-->
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <!--                <v-btn icon>-->
                <!--                  <v-icon>mdi-heart</v-icon>-->
                <!--                </v-btn>-->
                <!--                <v-btn icon>-->
                <!--                  <v-icon>mdi-dots-vertical</v-icon>-->
                <!--                </v-btn>-->
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn
                    text
                    color="secondary"
                    @click="selectedOpen = false"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>

    <v-dialog
        v-model="createDeliveryDialog"
        transition="dialog-bottom-transition"
        fullscreen
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar
              color="pink"
              class="purple--text"
          >
            Creación de nueva entrega
          </v-toolbar>
          <v-card-text class="mt-10">
            <v-row>
              <v-col cols="12" md="6">
                <v-autocomplete
                    v-model="deliveries.customer"
                    :items="[]"
                    item-text="name"
                    item-value="id"
                    label="Cliente"
                    outlined
                    rounded
                    class="inputStyle"
                    dense
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-divider class="purple"></v-divider>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
                text
                color="red"
                @click="createDeliveryDialog = false"
            >
              cancelar
            </v-btn>
            <v-btn
                text
                color="purple"
                @click="addCutomer"
            >
              Guardar
            </v-btn>

          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>
<script>
import SearchComponent from "@/components/SearchComponent.vue";

export default {
  name: 'EntregasController',
  components: {SearchComponent},
  data() {
    return {
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      createDeliveryDialog: false,
      events: [],
      customers: [],
      deliveries: {
        customer: null
      },
      headers: [
        {
          text: 'Nombre',
          value: 'nombre',
          aling: 'center'
        },
      ]
    }
  },
  computed: {
    marginTop() {
      let marginTop = {}
      if (this.$vuetify.breakpoint.mdAndUp) {
        marginTop.marginTop = '150px'
      } else {
        marginTop.marginTop = '430px'
      }
      // else {
      //     marginTop.marginTop = '50px'
      //
      //   }
      return marginTop
    }
  },
  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay({date}) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({nativeEvent, event}) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    async getCustomers() {
      try {
        this.loading = true
        this.customers = []
        let query = this.$query(this.$collection(this.$DB, 'customers'))

        const response = await this.$getDocs(query)
        this.customers = await response.map(async (doc) => ({id: doc.id, ...doc.data()}))

        setTimeout(()=>{
          this.loading = false
        },1500)
      } catch (e) {
        setTimeout(()=>{
          this.loading = false
        },1500)
        this.temporalAlert({
          show: true,
          message: "No se pudieron cargar los clientes",
          type: "error",
        })
      }
    },
    async updateRange({start, end}) {
      const events = []

      let query = this.$query(this.$collection(this.$DB, 'deliveries'))

      const response = await this.$getDocs(query)

      response.forEach((doc) => {
        const allDay = this.rnd(0, 3) === 0
        const first = this.moment(doc?.data()?.deliver_date.toDate()).tz('America/El_Salvador').format('YYYY-MM-DD HH:mm')
        const second = this.moment(doc?.data()?.deliver_date.toDate()).add(1, 'hours').tz('America/El_Salvador').format('YYYY-MM-DD HH:mm')

        events.push({
          name: doc.data().name,
          start: first,
          end: second,
          color: 'purple',
          timed: !allDay,
        })
      })

      this.events = events
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
}
</script>
<style lang="scss" scoped>
::v-deep .v-toolbar__content {
  justify-content: center;
}
</style>
