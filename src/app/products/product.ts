import { Entity, Fields, IdEntity } from "remult";

@Entity('products', {
    allowApiCrud: true
})
export class Product extends IdEntity {
    @Fields.string()
    name = '';
    @Fields.number()
    price = 0;
}