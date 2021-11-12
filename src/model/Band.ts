export class Band {
    constructor(
        private id: string,
        private name: string,
        private musicGenre: string,
        private responsible: string
    ) { }

    getId() {
        return this.id
    }

    getName() {
        return this.name
    }

    getEmail() {
        return this.musicGenre
    }

    getPassword() {
        return this.responsible
    }

    setId(id: string) {
        this.id = id
    }

    setName(name: string) {
        this.name = name
    }

    setEmail(musicGenre: string) {
        this.musicGenre = musicGenre
    }

    setPassword(responsible: string) {
        this.responsible = responsible
    }

    static toBandModel(band: any): Band {
        return new Band(band.id, band.name, band.music_genre, band.responsible)
    }
}

export interface BandInputDTO {
    name: string
    musicGenre: string
    responsible: string
}

export interface BandData {
    id: string
    name: string
    music_genre: string
    responsible: string
}