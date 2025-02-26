import style from './index.module.css'
import ToDo from "../toDo/index.tsx";
import {ConfigContext} from "../../context/ConfigContext.ts";
import {useContext} from 'react';

const ToDoList = () => {
    const {config} = useContext(ConfigContext)!;

    return (
        <>
            <div className={style.box}>这里是ToDoList组件,最外面层级传过来的值
                {config.title}{config.site}


                <ToDo/>
            </div>


        </>

    )

}

export default ToDoList
