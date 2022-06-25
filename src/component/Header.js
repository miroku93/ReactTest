import {Link} from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export default function Header() {
    const { i18n, t } = useTranslation(["common"]);

	useEffect(() => {
        console.log(localStorage.getItem("i18nextLng")?.length)
		if (localStorage.getItem("i18nextLng")?.length > 2) {
			i18next.changeLanguage("ko");
		}
	}, []);

    const handleLanguageChange = (e) => {
        console.log(e.target.value);
		i18n.changeLanguage(e.target.value);
	};
    return (
        <div className="header">
            <h1> 
                <Link to="/">토익 영단어(고급)</Link>
            </h1>
            <div className="menu">
                <Link to="create_word" className="link">
                    {t("addword")}
                </Link>
                <Link to="create_day" className="link">
                    {t("addday")}
                </Link>
                <select
					className="bg-dark border-0 ml-1 mr-2"
					value={localStorage.getItem("i18nextLng")}
					onChange={handleLanguageChange}
				>
                    <option value="ko">한글</option>
					<option value="en">English</option>
x
				</select>
            </div>
        </div>
    );

}