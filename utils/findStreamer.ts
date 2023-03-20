import { UserData } from "../types/types";

export const findStreamer = (data: UserData[], id: string) => data?.findIndex((streamerid) => streamerid.id == id)
