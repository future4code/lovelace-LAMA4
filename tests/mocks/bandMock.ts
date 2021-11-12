import { Band, BandData } from "../../src/model/Band";

export const bandFromDBMock: BandData = {
    id: 'id_mock',
    name: 'band1',
    music_genre: 'rock',
    responsible: 'Eunice'
}

export const bandClassMock = new Band(
    'id_mock',
    'band1',
    'rock',
    'Eunice'
)