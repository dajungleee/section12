import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";

import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

const getMonthlyData = (pivotDate, data) => {
    const beginTime = new Date(
      pivotDate.getFullYear(),
      pivotDate.getMonth(),
      1,
      0,
      0,
      0
    ).getTime();
  
    const endTime = new Date(
      pivotDate.getFullYear(),
      pivotDate.getMonth() + 1,
      0,
      23,
      59,
      59
    ).getTime();
  
    return data.filter(
      (item) =>
        beginTime <= item.createdDate && item.createdDate <= endTime
    );
  };

const Home = ()=> {
    const data = useContext(DiaryStateContext);  //일기데이터가져옴 (DiaryStateContext는 다른컴포넌트와 데이터를 공유하기위해 사용)
    const [pivotDate, setPivotDate] = useState(new Date()); //현재보고있는 월 pivotDate 상태관리

    const monthlyData = getMonthlyData(pivotDate, data); //현재보고있는 월의 데이터만 가져오기

    const onIncreaseMonth = () => { //pivotDate 상태 변경
        setPivotDate(
            new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1)
        );
    };
    const onDecreaseMonth = () => {
        setPivotDate(
            new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1)
        );
    };

    //변경된 상태 기반으로 DiaryList 업데이트
    return (
        <div>
            <Header title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
                leftChild={<Button onClick={onDecreaseMonth} text={"<"}/>}
                rightChlid={<Button onClick={onIncreaseMonth} text={">"}/>}
            />
            <DiaryList data={monthlyData}/>
        </div>
    )
}

export default Home;