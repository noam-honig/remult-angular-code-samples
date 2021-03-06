import { BackendMethod, Remult } from "remult";
import { Product } from "../products/product";

export class ImportCsvController {
    @BackendMethod({ allowed: true })
    static async importProductsArray(dataArray: any[][], remult?: Remult) {
        const productRepo = remult!.repo(Product);
        let i = 0;
        for (const row of dataArray) {
            if (row[0]) {
                i++;
                //find existing product by name
                let p = await productRepo.findFirst({ name: row[0] }, { createIfNotFound: true });
                p.price = row[1];
                await p.save();
            }
        }
        return i;
    }
}