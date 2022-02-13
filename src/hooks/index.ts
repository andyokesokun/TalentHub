import { useState } from "react";
import { useDispatch,TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, AppState} from "../store";


export const useAppDispatch = () =>useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const usePagination = (startPage: number) =>{
        
    const [currentPageNum, setCurrentPageNum] = useState(startPage);

  
    const nextPage = () => {
        setCurrentPageNum(currentPageNum + 1)    
    }

    return {currentPageNum,nextPage}
} 
