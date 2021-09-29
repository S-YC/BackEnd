import { Request } from "express";

export function reqPost<T>(req: Request, name: string): T | undefined {
  if (req.body[name] !== undefined) {
    switch(typeof req.body[name]) {
      case "string":
        return req.body[name].replace(/'/gi, "&#39;") as T;
      default:
        return req.body[name] as T;
    }
  }
  return undefined;
}
