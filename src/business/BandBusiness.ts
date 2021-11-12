import { BandDatabase } from "../data/BandDatabase";
import { CustomError } from "../error/BaseError";
import { BandInputDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private bandDatabase: BandDatabase
        ){}

    public async createBand(band: BandInputDTO): Promise<void> {

        if (!band.name || !band.musicGenre || !band.responsible) {
            throw new CustomError("Missing input", 422)
        }

        const id = this.idGenerator.generate()

        await this.bandDatabase.createBand(
            id,
            band.name,
            band.musicGenre,
            band.responsible
        )
    }



}