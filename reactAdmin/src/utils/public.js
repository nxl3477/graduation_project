export const sleep = (time) => new Promise( (resolved, rejected)=> {
  setTimeout(()=>{
    resolved(true)
  }, time)
})
