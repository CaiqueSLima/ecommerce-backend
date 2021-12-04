import csv from 'csvtojson'

export class CsvToJson {
    
    public static async convertFile(filePath: string): Promise<any> {
        try {
            return await csv().fromFile(filePath)
        } catch (error) {
            console.log(error)
        }
    }
}