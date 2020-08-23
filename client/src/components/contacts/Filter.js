import React,{useContext,useRef,useEffect} from 'react'
 import ContactContext from '../../Context/contact/contactContext'
const Filter = () => {
    const contactContext = useContext(ContactContext)
    const text=useRef('')
    const { filter_ac, Clearfilter,filtered } = contactContext
    
    useEffect(() => {
        if (filtered === null) {
            text.current.value=''
    }
})
    const filtering = e => {
        if (text.current.value!=='') {
            filter_ac(e.target.value)
        } else {
            Clearfilter()
         }
     }
    return (
     <form>
            <input type="text" ref={text} placeholder="Filter a member..." onChange={filtering} />   
    </form>
    )
}

 

export default Filter
