module.exports = function (list, term) {
	var rows = list.querySelectorAll('.context-search--item');
	if (term.length) {
		term = term.toLowerCase();
		addClass(list, 'context-search--filtered');
		filterElements(rows, term);
	} else {
		removeClass(list, 'context-search--filtered');
		var highlightElements = list.querySelectorAll('[data-original-text]');
		for (var i = highlightElements.length - 1; i >= 0; i -= 1) {
			removeHighlightFromText(highlightElements[i]);
		}
	}
};

function filterElements (rows, term) {
	for (var i = rows.length - 1; i >= 0; i -= 1) {
		var el = rows[i];
		var text = el.textContent;
		if (text) {
			text = text.toLowerCase();
			text = text.trim();
			text = text.replace(/\s{2}/g, ' ');
		}
		if (text && text.indexOf(term) !== -1) {
			if (highlightElement(el, term)) {
				addClass(el, 'context-search--match');
			} else {
				removeClass(el, 'context-search--match');
			}
		} else {
			removeClass(el, 'context-search--match');
		}
	}
}

function highlightElement (el, term) {
	var found = false;
	if (!el.children.length) {
		found = highlightText(el, term);
	} else if (containsHighlightNode(el)) {
		found = highlightText(el, term);
	} else {
		for (var i = el.children.length - 1; i >= 0; i -= 1) {
			found = found | highlightElement(el.children[i], term);
		}
	}
	return found;
}

function containsHighlightNode (el) {
	return el.children.length === 1 && el.children[0].className === 'context-search--highlight';
}

function highlightText (el, term) {
	var text = el.getAttribute('data-original-text') || el.textContent;
	var startPos = text.toLowerCase().indexOf(term);
	if (startPos !== -1) {
		addHighlightToText(el, text, term, startPos);
		return true;
	} else if (el.getAttribute('data-original-text')) {
		removeHighlightFromText(el);
		return false;
	}
}

function addHighlightToText (el, text, term, startPos) {
	var before = text.slice(0,startPos);
	var after = text.slice(startPos + term.length);
	var between = text.slice(startPos, startPos + term.length);
	el.setAttribute('data-original-text', text);
	el.innerHTML = before + '<span class="context-search--highlight">' + between + '</span>' + after;
}

function removeHighlightFromText (el) {
	var text = el.getAttribute('data-original-text');
	el.removeAttribute('data-original-text');
	el.innerHTML = text;
}

function addClass (el, className) {
	if (el.className.indexOf(className) === -1) {
		el.className += ' ' + className;
	}
}

function removeClass (el, className) {
	var regex = new RegExp(className, 'g');
	el.className = el.className.replace(regex, '');
}
