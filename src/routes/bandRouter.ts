import express from "express"
import { BandController } from "../controller/BandController"

export const bandRouter = express.Router()

const bandController = new BandController()

bandRouter.get("/", bandController.getBandDetails)
bandRouter.post("/create", bandController.createBand)