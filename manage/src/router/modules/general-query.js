import Layout from '../../layout'


/*
* 二级菜单栏
* */
const generalQuery = {
    path:'/general-query',
    component:Layout,
    name:"GeneralQuery",
    meta:{title:'通用查询',icon:'el-icon-search'},
    redirect:'/general-query/datasource',
    children:[
        {
          path:'datasource',
          name:'datasource',
          component: ()=>import('../../views/general-query/data-source-management'),
          meta:{title:'数据源管理'}
        },
        {
            path:'dictionary',
            name:'dictionary',
            component: ()=>import('../../views/general-query/data-dictionary-management'),
            meta:{title:'数据字典管理'}
        },
        {
            path:'query',
            name:'query',
            component: ()=>import('../../views/general-query/query-definition-management'),
            meta:{title:'查询定义管理'}
        },
        {
            path:'chart',
            name:'chart',
            component: ()=>import('../../views/general-query/chart-definition-management'),
            meta:{title:'图表定义管理'}
        }
    ]
}

export default generalQuery