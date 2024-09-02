import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({data})=> {
    const nav = useNavigate();
    const [sortType, setSortType] = useState("latest"); //일기 정렬방식 상태 저장

    const onChangeSortType = (e)=>{ //변경할때 호출
        setSortType(e.target.value); //상태바꿈
    }

    const getSortedDate = ()=> {
        return data.toSorted((a, b)=>{
            if (sortType === "oldest") {
                return Number(a.createdDate) - Number(b.createdDate);
            } else {
                return Number(b.createdDate) - Number(a.createdDate); 
            }
        });
    }

    const sortedDate =  getSortedDate();

    return (
        <div className="DiaryList">
            <div className="menu_bar">
                <select onChange={onChangeSortType}>
                    <option value="latest">최신순</option>
                    <option value="oldest">오래된 순</option>
                </select>
                <Button 
                onClick={()=> nav("/new")}
                text={"새 일기 쓰기"} type={"POSITIVE"}/>
            </div>
            <div className="list_wrapper">
                {sortedDate.map((item)=> <DiaryItem key={item.id} {...item}/>)}
            </div> 
        </div>
    )
};

export default DiaryList;