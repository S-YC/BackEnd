import { query } from "../lib/mysql";

export interface IUser {
  useridx: number;
  email: string;
  tell: string;
  nick: string;
  pass: string;
  pwd: string;
  salt: string;
  si: string;
  gugun: string;
  dong: string;
  addr: string;
  zip: string;
  regdate: string;
  /** 상태값 */
  u_status: string;
}


export interface IUserLoginHistory {
  useridx: number;
  token: string;
  ip1: string;
  ip2: string;
  ip3: string;
  ip4: string;
}

export interface IUserAdd {
  useridx: number;
  email: string;
  tell: string;
  nick: string;
  pass: string;
  pwd: string;
  salt: string;
  si: string;
  gugun: string;
  dong: string;
  addr: string;
  zip: string;
  regdate: string;
  /** 상태값 */
  u_status: string;
}

export interface IUserCount {
  count: number;
}


/**
 * 회원가입
 * @param {String} email 이메일
 * @param {String} nick  닉네임
 * @param {String} pwd   패스워드
 * @param {String} sms_yn 문자 수신동의 (0 :동의, 1: 미동의)
 * @param {String} email_yn 이메일 수신동의 (0 :동의, 1: 미동의)
 * @memberof Db
 */
 export async function addUser(
  email: string,
  nick: string,
  pwd: string, 
  sms_yn: number, 
  email_yn: number   
) {
  try {
    const rows: Array<IUserAdd> = await query<IUserAdd>(
      `insert into user_info (email, tell, nick, pwd, u_status, sms_yn, email_yn, utype, si, gugun, dong, zip, regdate) values ('${email}','01012345678','${nick}','${pwd}', '0', '${sms_yn}', '${email_yn}', '0', '123', '123', '123', '123', NOW())`
    );
    return rows;
  } catch (err) {
    throw err;
  }
}


/**
 * 이메일 중복검사 
 * @param {String} email 이메일
 * @returns {Array} cOUNT 결과
 * @description  IUserCount 인터페이스 변수와 컬럼명이 동일해야함 (별칭 사용)
 * @memberof Db
 */
 export async function getCountByEmail(
  email: string
): Promise<IUserCount> {
  try {
    const rows: Array<IUserCount> = await query<IUserCount>(
      `SELECT COUNT(email) as count FROM user_info where email = '${email}'`
    );
    return rows[0];
  } catch (err) {
    throw err;
  }
}

/**
 * 닉네임 중복검사 
 * @param {String} nickname 닉네임
 * @returns {Array} cOUNT 결과
 * @description  IUserCount 인터페이스 변수와 컬럼명이 동일해야함 (별칭 사용)
 * @memberof Db
 */
 export async function getCountByNickname(
  nickname: string
): Promise<IUserCount> {
  try {
    const rows: Array<IUserCount> = await query<IUserCount>(
      `SELECT COUNT(nick) as count FROM user_info where nick = '${nickname}'`
    );
    return rows[0];
  } catch (err) {
    throw err;
  }
}



/**
 * 이메일로 회원 정보 가져오기
 * @param {String} email 이메일
 * @returns {Array} 회원 리스트
 * @memberof Db
 */
export async function getUserByEmail(
  email: string
): Promise<IUser | undefined> {
  try {
    const rows: Array<IUser> = await query<IUser>(
      `SELECT * FROM user_info where email = '${email}'`
    );
    return rows[0];
  } catch (err) {
    throw err;
  }
}


export async function addLogin(
  useridx: number,
  token: string,
  ip: Array<string>
) {
  try {
    const rows: IUserLoginHistory[] = await query<IUserLoginHistory>(
      `INSERT INTO user_login_history(useridx, token, regdate, ip1, ip2, ip3, ip4) VALUES(${useridx}, ${token} now(), ${ip[0]}, ${ip[1]}, ${ip[2]}, ${ip[3]})`
    );
    return rows;
  } catch (err) {
    throw err;
  }
}

export async function firstLoginToken(
  useridx: number
): Promise<IUserLoginHistory | undefined> {
  try {
    const rows: IUserLoginHistory[] = await query<IUserLoginHistory>(
      `SELECT * FROM user_login_history where useridx = '${useridx}' ORDER BY updated_at DESC`
    );
    return rows[0];
  } catch (err) {
    throw err;
  }
}
