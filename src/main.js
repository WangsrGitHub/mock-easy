/* eslint-disable no-new */

import Vue from 'vue'
import {
  Button,
  Select,
  Input,
  Container,
  Header,
  Main,
  Footer,
  Row,
  Col,
  Avatar,
  Card,
  ButtonGroup,
  Table,
  TableColumn,
  Form,
  FormItem,
  Menu,
  MenuItem,
  Link,
  Dialog,
  Option,
  Checkbox,
  CheckboxGroup
} from 'element-ui'
import store from './store'
// import router from './router'
import App from './App.vue'
import './style/index.scss'

const {chrome} = window

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Input.name, Input)
Vue.component(Container.name, Container)
Vue.component(Header.name, Header)
Vue.component(Main.name, Main)
Vue.component(Footer.name, Footer)
Vue.component(Row.name, Row)
Vue.component(Avatar.name, Avatar)
Vue.component(Card.name, Card)
Vue.component(ButtonGroup.name, ButtonGroup)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Menu.name, Menu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Link.name, Link)
Vue.component(Dialog.name, Dialog)
Vue.component(Option.name, Option)
Vue.component(Col.name, Col)
Vue.component(Checkbox.name, Checkbox)
Vue.component(CheckboxGroup.name, CheckboxGroup)

// 监听服务端口变化
chrome.storage.local.onChanged.addListener((changes, namespace) => {
  if (changes.port) {
    store.dispatch('setConfig', {
      port: changes.port.newValue
    })
  }
})

// 启动服务
chrome.runtime.getBackgroundPage((data) => {
  data.startWebserver().then(res => {
    store.dispatch('setConfig', res)
    Vue.mixin({
      methods: {
        changePort (port) {
          chrome.storage.local.set({port}, () => {})
          this.background.startWebserver()
        }
      },
      computed: {
        background () {
          return data
        }
      }
    })

    new Vue({
      el: '#app',
      store,
      // router,
      render: h => h(App)
    })
    data.getProject().then(data => {
      console.log(data)
      store.commit('SET_PROJECT_LIST', data)
    })
  })
})