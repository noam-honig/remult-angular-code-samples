# Full Page Payout
In many applications will would like to make use of the entire height of the application, while maintaining the ability to scroll in page.

In this demo we show how to construct a page, using a top part, a bottom part and a middle scroll part.

To do this, we first need to add the following styles:
```scss
.full-page {
  height: 100%;
  display: flex;
  flex-flow: column;
}
.grow-item {
  height: 250px;
  flex-grow: 1;
  flex-shrink: 0;
  overflow-y: auto;
}
```

> We usually add these styles to the `styles.scss` file but it can also be added to the specific component scss file

Next, in the html part, we need to have a single root item tagged with the class `full-page`

```html
<div class="full-page">
</div>
```

Under that div, mark the item you want to grow as the page grows, and to scroll if needed with the `grow-item` class.

See [angular html sample](./full-page-layout.component.html)
