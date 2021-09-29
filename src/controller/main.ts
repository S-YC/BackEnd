import { NextFunction, Request, Response } from "express";
import { createError, createPayload, IPayload } from "../vo/payload";


export interface IMatchitem {
    id: number /* DB index */;
    src?: string;
    mainText: string;
    money: string;
    buttonText: string;
    buttonlink: string;
  }

export const matchList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const payload: IPayload<Array<IMatchitem>> =
    createPayload<Array<IMatchitem>>();
  try {
    const IMatchitemList: Array<IMatchitem> = [
        {
          id: 0,
          src: "/",
          mainText: "아이센스 구로점 PC방 대회",
          money: "100",
          buttonText: "4월2일,16강 토너먼트",
          buttonlink: "main",
        },
        {
          id: 1,
          src: "/",
          mainText: "아이센스 영등포점 PC방 대회",
          money: "10",
          buttonText: "4월2일,16강 토너먼트",
          buttonlink: "main",
        },
        {
          id: 2,
          src: "/",
          mainText: "아이센스 신길점 PC방 대회",
          money: "50",
          buttonText: "4월2일,16강 토너먼트",
          buttonlink: "",
        },
        {
          id: 3,
          src: "/",
          mainText: "아이센스 대림점 PC방 대회",
          money: "60",
          buttonText: "다른대회 둘러보기",
          buttonlink: "",
        },
      ];
      payload.result = true;
      payload.data = IMatchitemList;
  } catch (error){
    payload.error = createError(100, "서버내부 에러", error);
  }
  res.json(payload);
}

export interface IChnnelitem {
  id: number;
  src?: string;
  mainText: string;
  chnnelName: string;
  chnnelView: number;
}

export const channelList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const payload: IPayload<Array<IChnnelitem>> =
    createPayload<Array<IChnnelitem>>();
  try {
    const IChnnelitemList: Array<IChnnelitem> = [
      {
        id: 0,
        src: "/",
        mainText: "2021 LCK 중계방송 - MATCH 06",
        chnnelName: "하이TV",
        chnnelView: 3.2,
      },
      {
        id: 1,
        src: "/",
        mainText: "2021 LCK 중계방송 - MATCH 06",
        chnnelName: "하이TV",
        chnnelView: 3,
      },
      {
        id: 2,
        src: "/",
        mainText: "2021 LCK 중계방송 - MATCH 06",
        chnnelName: "하이TV",
        chnnelView: 5.2,
      },
      {
        id: 3,
        src: "/",
        mainText: "2021 LCK 중계방송 - MATCH 06",
        chnnelName: "하이TV",
        chnnelView: 5.2,
      },
      {
        id: 4,
        src: "/",
        mainText: "2021 LCK 중계방송 - MATCH 06",
        chnnelName: "하이TV",
        chnnelView: 5.2,
      },
      {
        id: 5,
        src: "/",
        mainText: "2021 LCK 중계방송 - MATCH 06",
        chnnelName: "하이TV",
        chnnelView: 5.2,
      },
      {
        id: 6,
        src: "/",
        mainText: "2021 LCK 중계방송 - MATCH 06",
        chnnelName: "하이TV",
        chnnelView: 5.2,
      },
      {
        id: 7,
        src: "/",
        mainText: "2021 LCK 중계방송 - MATCH 06",
        chnnelName: "하이TV",
        chnnelView: 5.2,
      },
    ];
    payload.result = true;
    payload.data = IChnnelitemList;
  } catch (error){
    payload.error = createError(100, "서버내부 에러", error);
  }
  res.json(payload);
}