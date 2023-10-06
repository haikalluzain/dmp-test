import { RequestWithAuth } from "@api/middlewares/authMiddleware";
import {responseNotFound, successResponse} from "@utils/response";
import { NextFunction, Request, Response } from "express";
import axios from 'axios';

const http = axios.create({
    baseURL: 'https://dev6.dansmultipro.com/api/recruitment'
});

const getJobList = async (req: RequestWithAuth, res: Response, next: NextFunction) => {
    try {
        const { page, description, location, full_time } = req.query
        const { data } = await http.get(`/positions.json`, {
            params: {
                page,
                description,
                location,
                full_time
            }
        })

        return successResponse(res, "Get the list of jobs", data)
    } catch (error) {
        return responseNotFound(res)
    }
}

const getJobDetail = async (req: RequestWithAuth, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { data } = await http.get(`/positions/${id}`)

        return successResponse(res, "Get the job detail", data)
    } catch (error) {
        return responseNotFound(res)
    }
}

export = {
    getJobList,
    getJobDetail
}