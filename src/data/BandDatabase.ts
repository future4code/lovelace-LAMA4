import { BaseDatabase } from "./BaseDatabase"
import { Band } from "../model/Band"

export class BandDatabase extends BaseDatabase {

  private static TABLE_NAME = "lama_bands"

  public async createBand(id: string, name: string, musicGenre: string, responsible: string): Promise<void> {
      await this.getConnection()
        .insert({
          id,
          name,
          music_genre: musicGenre,
          responsible
        })
      .into(BandDatabase.TABLE_NAME)
  }

  public async getBandByNameOrID(input: string): Promise<Band[]> {
    const result = await this.getConnection()
      .select('*')
      .from(BandDatabase.TABLE_NAME)
      .where('name', 'like', `%${input}%`)
      .orWhere({ id: input })

    return result
  }
}