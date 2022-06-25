import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Day({word:w}) {
    const { t } = useTranslation(["word"]);
    const [word,setWord] = useState(w);
    const [isShow, setIsShow] = useState(false);
    const [isDone, setIsDone] = useState(word.isDone);

    function toggleShow() {
        setIsShow(!isShow);
    }

    function toggleDone() {
        //setIsDone(!isDone);
        fetch(`http://localhost:3001/words/${word.id}`,{
            method :'PUT',
            headers: {
                'Content-Type':'application/json',
            },
            body : JSON.stringify({
                ...word,
                isDone: !isDone,
            }),
        }).then(res => {
            if (res.ok) {
                setIsDone(!isDone);
            }
        });

    }

    function del() {
        if(window.confirm('삭제 하시겠습니까?')){
            fetch(`http://localhost:3001/words/${word.id}`,{
                method :'DELETE',
            })
            .then(res=>{
                if (res.ok){
                    setWord({id : 0});
                }
            })

        }

    }

    if (word.id === 0) {
        return null;
    }

    return (
        <tr className ={isDone ? 'off' : ''}>
            <td><input type="checkbox" checked ={isDone} onChange={toggleDone}/> </td>
            <td>{word.eng}</td>
            <td>{isShow && word.kor}</td>
            <td>
                <button onClick={toggleShow}>{isShow ? `${t("hide")}` : `${t("view")}` }</button>
                <button onClick={del} className = "btn_del">{t("btndel")}</button>
            </td>
        </tr>


    );

}