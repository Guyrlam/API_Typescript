import { Request, Response } from 'express';

export class APIResponse {
    static error(res: Response, data: string) {
        //console.log(data)
        const msgInfos = (data as string).split(/\|/gim);
        //console.log(msgInfos);
        if (msgInfos.length >= 2) {
            const msgs = msgInfos[1].replace(/(,$)/gim, '').split(',');

            res.status(Number(msgInfos[0])).json({
                data: null,
                messages: msgs,
            });
        } else {
            res.status(201).json({
                data: null,
                messages: data,
            });
        }
    }

    static sucess(res: Response, data: any, status = 200) {
        return res.status(status).json({
            data: data,
            messages: [],
        });
    }
}
