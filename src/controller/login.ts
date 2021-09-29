import { NextFunction, Request, Response } from "express";
import { reqPost } from "../vo/parser";
import { createError, createPayload, IPayload } from "../vo/payload";

export interface ISignRes {
    message: string;
    email: string | undefined;
    nickname: string | undefined;
    code: number;
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

    if (email === "") {
      payload.error = createError(101, "이메일 주소를 입력해주세요");
    } else if (pwd === "") {
      payload.error = createError(102, "패스워드를 입력해주세요.");
    } else if (nickname === "") {
      payload.error = createError(103, "닉네임을 입력해주세요.");
    } else{
        payload.data = {
            message: "회원가입 성공",
            email: email,
            nickname: nickname,
            code: 200,
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
  email: string;
}

/**
* 이메일 Select 
*/
export const isEmailSelect = async (
req: Request,
res: Response,
next: NextFunction
) => {
  const payload: IPayload<IemailRes> =
  createPayload<IemailRes>();
try {
  payload.result = false;
  const email = reqPost<string>(req, "email");

  if (email === "") {
    payload.error = createError(101, "입력된 이메일 주소가 없습니다.");
  }
  else if (email === "s8282909@naver.com"){
      payload.data = {
          message: "이메일 조회 성공",
          code: 202,
          email: email,
        };
      payload.result = true;        
  } else{
      payload.data = {
          message: "이메일 없음",
          code: 201,
          email: "",
        };
      payload.result = false;
  }
  
} catch (err) {
  res.status(500);
  payload.error = createError(100, "서버내부 에러", err);
}
res.json(payload);
};




