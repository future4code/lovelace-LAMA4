import { Request, Response } from "express"
import { BandBusiness } from "../business/BandBusiness"
import { BandDatabase } from "../data/BandDatabase"
import { BandInputDTO } from "../model/Band"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

const bandBusiness = new BandBusiness(
    new IdGenerator(),
    new Authenticator(),
    new BandDatabase()
)

export class BandController {

    public async createBand(req: Request, res: Response): Promise<void> {

        try {
            const { name, musicGenre, responsible } = req.body
            const token = req.headers.authorization as string

            const input: BandInputDTO = {
                name,
                musicGenre,
                responsible
            }

            await bandBusiness.createBand(input, token)

            res.status(200).send('Banda criada com sucesso')

        } catch (error: any) {
            res.status(error.statusCode).send({ message: error.sqlMessage || error.message })
        }
    }

    public async getBandDetails(req: Request, res: Response): Promise<void> {

        try {
            
            const name = (req.query.name as string || "")
            const id = (req.query.id as string || "")

            const band = await bandBusiness.getBandByIdOrName(name, id)

            res.status(200).send(band)

        } catch (error: any) {
            res.status(error.statusCode).send({ message: error.sqlMessage || error.message })
        }
    }

}