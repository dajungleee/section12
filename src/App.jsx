import './App.css'
import { useReducer, useRef, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Diary from './pages/Diary'
import Home from './pages/Home'
import New from './pages/New'
import Notfound from './pages/Notfound'
import Edit from './pages/Edit'


//1. "/" : 모든 일기를 조회하는 Home 페이지
//2. "/new"  : 새로운 일기를 작성하는 New 페이지
//3. "/diary" : 일기를 상세히 조회하는 Diary 페이지

const mockData = [
  {
    id: 1,
    createdDate : new Date("2024-08-19").getTime(),
    emotionId : 1,
    content : "1번 일기 내용"
  },
  {
    id: 2,
    createdDate : new Date("2024-08-18").getTime(),
    emotionId : 2,
    content : "2번 일기 내용"
  },
  {
    id: 3,
    createdDate : new Date("2024-07-07").getTime(),
    emotionId : 3,
    content : "2번 일기 내용"
  },
]

//일기데이터를 생성, 수정, 삭제 할수있다
function reducer(state, action) {
  switch(action.type) {
    case 'CREATE' : 
      return [action.data, ... state];
    case "UPDATE" :
      return state.map((item)=>{
        String(item.id) === String(action.data.id) ? action.data : item
      });
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
      default:
        return state;
  }
}

//전역 상태관리를 위해 컨텍스트생성
//컨텍스트 값이 변경되래마다 해당 컨텍스트를 사용하는 모든 컴포넌트 렌더링

export const DiaryStateContext = createContext(); //일기목록 data 를 전역적으로 공유
export const DiaryDispatchContext = createContext(); //일기 데이터를 추가,수정, 삭제하는 함수를 전역적으로 공유


//useReducer()
//state       : 상태이름 
//dispatch    : 상태 (state)를 변경시 필요한 정보를 전달하는 '함수'
//reducer     : dispatch를 확인해서 state를 변경해주는 '함수'
//initalState : state 에 전달할 초기값 

function App() {
  const [data, dispatch] = useReducer(reducer, mockData); //리듀서는 디스패치로 상태변경 [상태, 상태를 업데이트하는 dispatch]
  const idRef = useRef(3)

  //새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id : idRef.current++,
        createdDate,
        emotionId,
        content,
      }
    })

  }
  
  //기존일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  //기존 일기 삭제
  const onDelete = (id)=>{
    dispatch({
      type: "DELETE",
      id
    })
  }

  //라우트로 페이지간의 네비게이션 처리
  //각각의 라우트는 특정경로에따라 해당 컴포넌트를 렌더링
  return (
    <>
      <DiaryStateContext.Provider value={data}> 
        <DiaryDispatchContext.Provider value={{
          onCreate,
          onUpdate,
          onDelete
        }}>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/new' element={<New />}></Route>
          <Route path='/diary/:id' element={<Diary />}></Route>
          <Route path='/edit/:id' element={<Edit />}></Route>
          <Route path='*' element={<Notfound/>}></Route>
        </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}


export default App
