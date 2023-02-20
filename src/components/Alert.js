import React from 'react'

export default function Alert(props) {
    const capitalise=(word)=>{
        let str= word.toLowerCase()
        return(str.charAt(0).toUpperCase()+str.slice(1))
    }
  return (
    props.alert && <div style={{display:"flex","justifyContent":"center"}} className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
 {props.alert.msg} 
</div>
  )
}