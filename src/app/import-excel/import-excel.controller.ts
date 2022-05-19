
import { Remult } from 'remult';
import { BackendMethod } from 'remult/src/server-action';
import * as xlsx from 'xlsx';//https://sheetjs.com/
import { Product } from '../products/product';

export class ImportExcelController {
    @BackendMethod({ allowed: true })
    static async importProductsFromExcel(dataArray: any, remult?: Remult) {
        const productRepo = remult!.repo(Product);
        let i = 0;
        for (const row of dataArray) {
            i++;
            //find existing product by name
            let p = await productRepo.findFirst({ name: row[xlsx.utils.decode_col("A")] }, { createIfNotFound: true });
            p.price = row[xlsx.utils.decode_col("B")];
            await p.save();
        }
        return i;
    }
}