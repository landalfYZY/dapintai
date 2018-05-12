import Vue from 'vue'
import Router from 'vue-router'

/**
 * user interface pages
 */
import uiMain from '../components/ui_page/ui_main'
import uiHome from '../components/ui_page/ui_home'
import uiLogin from '../components/ui_page/ui_login'
import uiRegister from '../components/ui_page/ui_register'
import pay from '../components/ui_page/pay'

//小程序模板页
import uiTemplate from '../components/ui_page/program_template/ui-template'
import uiTemplateDetail from '../components/ui_page/program_template/ui_template_detail'

//小程序功能与服务
import uiFunction from '../components/ui_page/program_function/ui_program_function'

//快速制作小程序
import uiProgramPanel from '../components/ui_page/ui_program_panel'

//控制台
import uiConsole from '../components/ui_page/console/ui_console'
import uiConsoleOverview from '../components/ui_page/console/ui_console_overview'
import uiConsoleMiniprogram from '../components/ui_page/console/ui_console_miniprogram'
import uiConsoleMiniprogramCreate from '../components/ui_page/console/ui_console_miniprogram_create'
import uiConsoleMiniprogramModal from '../components/ui_page/console/ui_console_miniprogram_modal'
import uiConsoleGallery from '../components/ui_page/console/ui_console_gallery'
import uiConsoleModal from '../components/ui_page/console/ui_console_modal'
import uiConsoleModalUpdate from '../components/ui_page/console/ui_console_modal_update'
import uiConsoleTrans from '../components/ui_page/console/ui_console_trans'
import richText from '../components/ui_page/rich_text'
import richTextlist from '../components/ui_page/rich_text_list'

import article from '../components/ui_page/article'
import articleUpdate from '../components/ui_page/article_update'
Vue.use(Router)

export default new Router({
  routes: [
    { path:'/ui_login',name:'uiLogin',component:uiLogin},
    { path:'/ui_register',name:'uiRegister',component:uiRegister},
    { path: '/', name: 'uiMain', component: uiMain ,children:[
      { path:'/ui_home',name:'uiHome',component: uiHome},
      { path:'/ui_template',name:'uiTemplate',component:uiTemplate},
      { path:'/ui_template_detail',name:'uiTemplateDetail',component:uiTemplateDetail},
      { path:'/ui_function',name:'uiFunction',component:uiFunction},
      {path:'/article',name:'article',component:article},
      {path:'/pay',name:'pay',component:pay},
      { path:'/ui_console',name:'uiConsole',component: uiConsole,children:[
        {path:'/ui_console_overview',name:'uiConsoleOverview',component:uiConsoleOverview},
        {path:'/ui_console_miniprogram',name:'uiConsoleMiniprogram',component:uiConsoleMiniprogram},
        {path:'/ui_console_miniprogram_create',name:'uiConsoleMiniprogramCreate',component:uiConsoleMiniprogramCreate},
        {path:'/ui_console_miniprogram_modal',name:'uiConsoleMiniprogramModal',component:uiConsoleMiniprogramModal},
        {path:'/ui_console_gallery',name:'uiConsoleGallery',component:uiConsoleGallery},
        {path:'/ui_console_modal',name:'uiConsoleModal',component:uiConsoleModal},
        {path:'/ui_console_modal_update',name:'uiConsoleModalUpdate',component:uiConsoleModalUpdate},
        {path:'/ui_console_trans',name:'uiConsoleTrans',component:uiConsoleTrans},
        {path:'/rich_text',name:'richText',component:richText},
        {path:'/rich_text_list',name:'richTextlist',component:richTextlist},
        {path:'/article_update',name:'articleUpdate',component:articleUpdate},
      ]}
    ]},
    { path:'/ui_program_panel',name:'uiProgramPanel',component:uiProgramPanel},
  ]
})
