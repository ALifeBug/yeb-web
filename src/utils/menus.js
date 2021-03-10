import {getRequest} from "./api";

export const initMenu = (router,store)=>{
    if(store.state.routes.length>0){
        return;
    }

    getRequest('/system/cfg/menu').then(data =>{
        if(data){
            //格式化Router
            let fmtRoutes = formatRoutes(data);
            //添加到router
            router.addRoutes(fmtRoutes);
            //将数据存入vuex
            store.commit('initRoutes',fmtRoutes);
        }
    })
}

export const formatRoutes = (routes) =>{
    let fmtRoutes = [];
    routes.forEach(router=>{
        let{
            path,
            component,
            name,
            iconCls,
            children
        } = router;
        if(children && children instanceof Array){
            //递归
            children = formatRoutes(children);
        }
        let fmtRouter = {
            path:path,
            name:name,
            iconCls:iconCls,
            children:children,
            component(resolve){
                if(component.startsWith('Home')){
                    require(['../views/'+component+'.vue'],resolve)
                }else if(component.startsWith('Emp')) {
                    require(['../views/emp/' + component + '.vue'], resolve);
                }else if(component.startsWith('Per')){
                    require(['../views/per/' + component + '.vue'], resolve);
                }else if(component.startsWith('Sal')){
                    require(['../views/sal/' + component + '.vue'], resolve);
                }else if(component.startsWith('Sta')){
                    require(['../views/sta/' + component + '.vue'], resolve);
                }else if(component.startsWith('Sys')){
                    require(['../views/sys/' + component + '.vue'], resolve);
                }
            }
        }
        fmtRoutes.push(fmtRouter)
    })
    return fmtRoutes;
}