import css from './index.module.css'
import {useContext} from "react";
import {ConfigContext} from "../../context/ConfigContext.ts";

const ToDo = () => {
    const {config, setConfig} = useContext(ConfigContext)!;

    const clickHandle = () => {

        setConfig((val) => {

            return {
                ...val,
                title: "糯米"
            }

        })

    }


    return (
        <>
            <div className={css.box}>这是ToDo
                从最外层传过来的值

                {config.title} {config.site}
            </div>

            <button onClick={clickHandle}>点击</button>
        </>
    )

}

export default ToDo
