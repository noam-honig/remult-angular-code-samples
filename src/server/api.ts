import { remultExpress } from 'remult/remult-express';
import { createPostgresConnection } from 'remult/postgres';
import { User } from '../app/users/user';
import { SignInController } from '../app/users/SignInController';
import { UpdatePasswordController } from '../app/users/UpdatePasswordController';
import { Product } from '../app/products/product';
import { ImportCsvController } from '../app/import-csv/import-csv.controller';
import { ImportExcelController } from '../app/import-excel/import-excel.controller';

export const api = remultExpress({
    entities: [User, Product],
    controllers: [SignInController, UpdatePasswordController, ImportCsvController, ImportExcelController],
    dataProvider: async () => {
        if (process.env['NODE_ENV'] === "production")
            return createPostgresConnection({ configuration: "heroku" })
        return undefined;
    }
});