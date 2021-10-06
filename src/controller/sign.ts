import { NextFunction, Request, Response } from "express";
import { addUser, getCountByEmail, getCountByNickname, IUserAdd, IUserCount } from "../db/user";
import { reqPost } from "../vo/parser";
import { createError, createPayload, IPayload } from "../vo/payload";

export interface ISignRes {
    message: string;
    code: number;
    email: string | undefined;
    nickname: string | undefined;
  }

/**
 * 회원가입 실행
 */
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const payload: IPayload<ISignRes> =
    createPayload<ISignRes>();
  try {
    payload.result = false;
    const email = reqPost<string>(req, "email");
    let tell = reqPost<string>(req, "tell") 
    const nickname = reqPost<string>(req, "nickname")
    const pwd = reqPost<string>(req, "pwd");
    const agmkSmsLms = reqPost<boolean>(req, "agmkSmsLms") ? 0 : 1;
    const agmkEmail = reqPost<boolean>(req, "agmkEmail") ? 0 : 1; 
    
    tell === undefined ? tell = "01012345678" : tell 

    if (email === "") {
      payload.error = createError(101, "이메일 주소를 입력해주세요");
    } else if (pwd === "") {
      payload.error = createError(102, "패스워드를 입력해주세요.");
    } else if (nickname === "") {
      payload.error = createError(103, "닉네임을 입력해주세요.");
    } else{
       // DB 회원생성 
       try {
        await addUser(email as string, tell as string, nickname as string, pwd as string, agmkSmsLms as number, agmkEmail as number)
        
        payload.data = {
          message: "회원가입 성공",
          code: 200,
          email: email,
          nickname: nickname,
        };
        payload.result = true;

      } catch (err: any) {
       
        /**
         * typeScript 4.4이후는 err 타입이 unknown으로 적용되어 any 타입으로 변경해야함 
         */
        if (err.code === 'ER_DUP_ENTRY') {
          payload.error = createError(105, "회원가입 불가 관리자에게 문의하여 주시기 바랍니다.");
          console.log("addUser : DB 컬럼 Unique 제약조건 위반 오류")
          console.log("addUser : " + err)
        } else {
          payload.error = createError(105, "회원가입 불가 관리자에게 문의하여 주시기 바랍니다.");
          console.log("addUser : " + err)
        }
      }
    }
    
  } catch (err) {
    res.status(500);
    payload.error = createError(100, "서버내부 에러", err);
  }
  res.json(payload);
};

export interface IemailRes {
  message: string;
  code: number;
}

/**
* 아이디, 닉네임 중복검사
*/
export const isCheck = async (
req: Request,
res: Response,
next: NextFunction
) => {
  const payload: IPayload<IemailRes> =
  createPayload<IemailRes>();
try {
  payload.result = false;
  //중복검사 타입 확인
  const type = req.params.type


  switch(type) { 
    case "email": { 
      // GET으로 넘겨받은 이메일
      const email = req.query.email
      // DB 회원 이메일 중복확인 
      const info: IUserCount = await getCountByEmail(email as string);

      if (email === "") {
        payload.error = createError(101, "입력한 이메일 주소가 없습니다.");
      }
      else if (info.count === 0){
          payload.data = {
              message: "사용가능한 이메일입니다.",
              code: 201,
            };
            payload.result = true;    
      } else{
          payload.data = {
              message: "이메일이 중복되었습니다.",
              code: 202,
            };
          payload.result = true;
      }
       break; 
    } 
    case "nickname": { 
      // GET으로 넘겨받은 닉네임
      const nickname = req.query.nickname
      // DB 회원 닉네임 중복확인 
      const info: IUserCount = await getCountByNickname(nickname as string);      
   

      if (nickname === "") {
        payload.error = createError(101, "입력한 닉네임이 없습니다.");
      }
      else if (info.count ===  0){
          payload.data = {
              message: "사용가능한 닉네임입니다.",
              code: 201,
            };
            payload.result = true;     
      } else{
          payload.data = {
              message: "닉네임이 중복되었습니다.",
              code: 202,
            };
          payload.result = true;
      }
      
       break; 
    } 
    default: { 
      payload.data = {
        message: "잘못된 형식의 요청입니다.",
        code: 500,
      };
       break; 
    } 
 } 

} catch (err) {
  res.status(500);
  payload.error = createError(100, "서버내부 에러", err);
}
res.json(payload);
};

