import active from "./active.env"

const envs = {
  prod: {
    DEV_API: "not available",
  
  },
  dev: {
    DEV_API: "http://xxx.xxx.xx.xx:xxxx/graphql",
  
  },
}


export default envs[active]