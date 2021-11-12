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

    static toBandModel(user: any): Band {
        return new Band(user.id, user.name, user.email, user.password)
    }
}

export interface BandInputDTO {
    name: string;
    musicGenre: string;
    responsible: string;
}