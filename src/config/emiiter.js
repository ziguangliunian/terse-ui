function broadcast(componentName,eventName,params) {
  this.$children.forEach(child=>{
    if(child.$options.name===componentName){
      this.$emit.call(child,eventName,params)
    }else{
      broadcast.call(child,componentName,eventName,params)
    }
  })

}
export default {
  methods:{
    dispatch(componentName,eventName,params){
      let parent=this.$parent
      let name=parent.$options.name
      while (parent&&(!name||name!==componentName)){
        parent=parent.$parent
        if(parent){
          name=parent.$options.name
        }
      }
      if(parent){
        this.$emit.call(parent,eventName,params)
      }
    },
    broadcast(componentName,eventName,params){
      broadcast.call(this,componentName,eventName,params)
    }
  }
}