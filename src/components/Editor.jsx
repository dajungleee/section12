import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constanrts";
import { getStringedDate } from "../util/get-stringed-date";

//리스트를 랜더링할때(map) 각 항목에 고유한 key를 부여하는것이 좋음
//{...item} 스프레드연산자를 이용하여 모든 객체를 props로 전달
//map 함수
//() 간단한 표현식을 반환할떄, jsx를 암시적으로 반환
//{} 블록을 정의하고 명시적으로 return 을 사용해야할때, 복작한 로직

const Editor = ({initData, onSubmit}) => {
    const [input, setInput] = useState({ //데이터 보관
        createdDate : new Date(),
        emotionId : 3,
        content : "",
    });

    const nav = useNavigate();

    useEffect(()=>{
        if (initData) {
            setInput({
                ...initData,
                createdDate: new Date(Number(initData.createdDate)),
            });
        }
    }, [initData]);

    const onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === "createdDate") {
            value = new Date(value);
        }


        setInput({
            ...input,
            [name] : value,
        })
    }

    const onClickSubmitButton = ()=>{
        onSubmit(input);
    }

    return (
        <div className="Editor">
            <section className="date_section">
                <h4>오늘의 날짜</h4>
                <input name="createdDate" onChange={onChangeInput} type="date" value={getStringedDate(input.createdDate)} />
            </section>
            <section className="emotion_section">
                <h4>오늘의 감정</h4>
                <div className="emotion_list_wrapper">
                    {emotionList.map((item)=>(
                        <EmotionItem 
                        onClick={()=> onChangeInput({
                            target : {
                                name : "emotionId",
                                value : item.emotionId,
                            }
                        })}
                        key={item.emotionId} {...item} isSelected={item.emotionId === input.emotionId}/>
                    ))}
                </div>
            </section>
            <section className="content_section">
                <h4>오늘의 일기</h4>
                <textarea 
                name="content"
                value={input.content}
                onChange={onChangeInput}
                placeholder="오늘은 어땠나요?"></textarea>
            </section>
            <section className="button_section">
                <Button onClick={()=> nav(-1)} text={"취소하기"}/>
                <Button 
                onClick={onClickSubmitButton}
                text={"작성완료"} type={"POSITIVE"} />
            </section>
        </div>
    );
}

export default Editor;