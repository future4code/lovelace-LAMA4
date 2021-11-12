import { BandData } from "../../src/model/Band";
import { bandMock } from "./bandMock";

export class BandDatabaseMock {
    public async createBand(id: string, name: string, musicGenre: string, responsible: string): Promise<void> { }

    public async getBandByNameOrID(input: string): Promise<BandData[]> {
        return [bandMock]
    }
}