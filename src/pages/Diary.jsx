import { useParams, useNavigate } from "react-router-dom"; //url 파라미터의 값을 가져오는 커스텀훅
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiray from "../hooks/useDiary";
import { getStringedDate } from "../util/get-stringed-date";

const Diary = ()=> {
    const params = useParams();
    const nav = useNavigate(); 

    const curDiaryItem = useDiray(params.id);

    if (!curDiaryItem) {
        return <div>데이터 로딩중...!</div>
    }

    const {createdDate, emotionId, content} = curDiaryItem;
    const title = getStringedDate(new Date(createdDate));

    return (
        <div>
            <Header title={title} 
                leftChild={<Button text={"< 뒤로 가기"} onClick={()=>{nav(-1)}}/>}
                rightChlid={<Button text={"수정하기"} onClick={()=>{nav(`/edit/${params.id}`)}}/>}
            />
            <Viewer emotionId={emotionId} content={content}/>
        </div>
    )
}

export default Diary;