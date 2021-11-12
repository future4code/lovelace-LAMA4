export class HashManagerMock {
    public async hash(string: string): Promise<string> {
        return 'hash'
    }

    public async compare(string: string, hash: string): Promise<boolean> {
        
    }
}