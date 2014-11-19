# context-search

_Highlights search terms._

Descends to the text nodes and highlight the found words there.
Can be used to hide not matching elements as well, filtering the
table by setting appropiate css.

## Exports only one interface to instantiate it:

`function (control, list)`

- _control_  is an input element (or any other) that sends
	keyup events and has a .value property.
- _list_ is the element which has sub items to be filtered
	and highlighted.

Requirement is that the sub elements to be filtered have the
class `context-search--item`. Only elements below these will
be filtered/highlighted.

##  Uses the following classes:

- `.context-search--filtered`: is set on the main list element when there at least one match
- `.context-search--item`: is expected on the items which will be searched
- `.context-search--match`: is set on those .context-search--item which have a match.
- `.context-search--highlight`: is the class used for the `span`-Elements which surround found
	elements.

## Example css:

``` css
.context-search--filtered .context-search--item {
	display: none;
}
.context-search--item.context-search--match {
	display: table-row; // in this example a table is filtered
}
.context-search--highlight {
	background-color: yellow;
	box-shadow: 0 0 1px 1px yellow;
}
```
