export default ({ app, store }, inject) => {
    inject("rules", {
      hasPermission(s) {
        if(store.getters.isAdmin){
          return true
        } else if (s) {
          if(s=='all'){
            return true;
          }
          var p = s.split(",");
          if (store.getters.userpermissions) {
            const found = p.some((r) => store.getters.userpermissions.includes(r));
            return found;
          }
  
          return false;
        }
        //return true;
      },
      hasRealm(r) {
        if (store.getters.realm) {
          console.log(store.getters.realm, r, store.getters.realm === r)
          return store.getters.realm === r;
        }
        return false;
      },
    });
  };