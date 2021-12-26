import {useState,useCallback} from 'react'

export const useHttp = () =>{
    const [process,setProcess] = useState('waiting');

   //БЛЯТЬ СТЕЙТ МАШИНА БЛЯТЬ
   //ВЖЕ КРАЩЕ БЛЯТЬ ФАК МАШИНА НАХОЙ
   //СКИНУТИ ГРШІ НА ЛІКУВАННЯ 0x75f0a201e7F1a6684428374B2cd8f3B624ea37Cf
    const request = useCallback(async (url,method = 'GET',body = null,headers = {'Content-Type': 'application/json'}) =>{
        setProcess('loading')
        try{
            const response = await fetch(url,{method,body,headers});
            const data = await response.json();
            return(data);
        }
        catch(e){
            setProcess('error')
            throw e;
             
        }

    }, [])

    const clearError = useCallback(()=>{
        setProcess('loading')
     },[])
    return {clearError,request,process,setProcess}
};