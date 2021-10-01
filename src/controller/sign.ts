import { NextFunction, Request, Response } from "express";
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
    const pwd = reqPost<string>(req, "pwd");
    const nickname = reqPost<string>(req, "nickname")
    const agmkEmail = reqPost<boolean>(req, "agmkEmail")
    const agmkSmsLms = reqPost<boolean>(req, "agmkSmsLms")

    console.log(agmkEmail);
    console.log(agmkSmsLms);

    if (email === "") {
      payload.error = createError(101, "이메일 주소를 입력해주세요");
    } else if (pwd === "") {
      payload.error = createError(102, "패스워드를 입력해주세요.");
    } else if (nickname === "") {
      payload.error = createError(103, "닉네임을 입력해주세요.");
    } else{
        payload.data = {
            message: "회원가입 성공",
            code: 200,
            email: email,
            nickname: nickname,

          };
        payload.result = true;
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

  console.log(type);

  switch(type) { 
    case "email": { 
            // 쿼리스트링 파라미터 확인
      const email = req.query.email
      
      if (email === "") {
        payload.error = createError(101, "입력된 이메일 주소가 없습니다.");
      }
      else if (email === "s8282909@naver.com"){
          payload.data = {
              message: "이메일이 중복되었습니다.",
              code: 202,
            };
            payload.result = true;    
      } else{
          payload.data = {
              message: "사용가능한 이메일입니다.",
              code: 201,
            };
          payload.result = true;
      }
       break; 
    } 
    case "nickname": { 
      // 쿼리스트링 파라미터 확인
      const nickname = req.query.nickname
    
      if (nickname === "") {
        payload.error = createError(101, "입력된 닉네임이 없습니다.");
      }
      else if (nickname === "연철리"){
          payload.data = {
              message: "닉네임이 중복되었습니다.",
              code: 202,
            };
            payload.result = true;     
      } else{
          payload.data = {
              message: "사용가능한 닉네임입니다.",
              code: 201,
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


export interface InickNameRes {
  message: string;
  code: number;
}

/**
* 닉네임 중복검사 
*/
export const isnickName = async (
req: Request,
res: Response,
next: NextFunction
) => {
  const payload: IPayload<InickNameRes> =
  createPayload<InickNameRes>();
try {
  payload.result = false;
  const nickname = reqPost<string>(req, "nickname");

  if (nickname === "") {
    payload.error = createError(101, "입력된 닉네임이 없습니다.");
  }
  else if (nickname === "연철리"){
      payload.data = {
          message: "닉네임이 중복되었습니다.",
          code: 202,
        };
      payload.result = true;        
  } else{
      payload.data = {
          message: "사용가능한 닉네임입니다.",
          code: 201,
        };
      payload.result = true;
  }
  
} catch (err) {
  res.status(500);
  payload.error = createError(100, "서버내부 에러", err);
}
res.json(payload);
};

