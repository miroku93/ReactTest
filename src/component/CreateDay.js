import useFetch from "../hooks/useFetch";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function CreateDay(){    
    const { t } = useTranslation(["createday"]);
    const days = useFetch("http://localhost:3001/days");
    const navigate = useNavigate();

    function addDay(e){
        fetch(`http://localhost:3001/days/`, {
            method :'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body : JSON.stringify({
                day:days.length + 1,
            }),
        }).then(res => {
            if (res.ok) {
                alert("Day가 생성이 완료 되었습니다.");
                navigate(`/`);            
            }
        });
    }

    return(
        <>
           <h3>현재 일수 : {days.length}{t("day")}</h3>
            <button onClick={addDay}>{t("addday")}</button>
        </>
      
    );     
}