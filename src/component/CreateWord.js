import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useFetch from "../hooks/useFetch";
import { useTranslation } from "react-i18next";
import { type } from "@testing-library/user-event/dist/type";

export default function CreateWord(){
    const { t } = useTranslation(["createword"]);
    const days = useFetch("http://localhost:3001/days");
    const navigate = useNavigate();
    const [isLoading, SetIsLoading] = useState(false);


    function onSubmit(e){
        e.preventDefault();

        if(!isLoading){
            SetIsLoading(true);
            fetch(`http://localhost:3001/words/`, {
                method :'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body : JSON.stringify({
                    day:dayRef.current.value,
                    eng:engRef.current.value,
                    kor:korRef.current.value,
                    isDone: false,
                }),
            }).then(res => {
                if (res.ok) {
                    alert("Word가 생성이 완료 되었습니다.");
                    navigate(`../day/${dayRef.current.value}`);
                    SetIsLoading(false);          
                }
            });
        }
    }

    const engRef = useRef(null);
    const korRef = useRef(null);
    const dayRef = useRef(null);

    return(
        <form onSubmit={onSubmit}>
            <div className ="input_area">
                <label>{t("eng")}</label>
                <input type ="text" placeholder="computer" ref={engRef}></input>
            </div>
            <div className ="input_area">
                <label>{t("kor")}</label>
                <input type ="text" placeholder="컴퓨터" ref={korRef}></input>
            </div>
            <div className ="input_area">
                <label>{t("date")}</label>
                <select ref={dayRef}>
                    {days.map(day =>(
                         <option key ={day.id} value ={day.day}>
                            {day.day}
                        </option>
                    ))}
                   
                </select>
            </div>
            <button
            style = {{
                opacity: isLoading ? 0.3 :1,
            }}
            >
                {isLoading ? `${t("saving")}` : `${t("save")}`}</button>
        </form>
    );     
}