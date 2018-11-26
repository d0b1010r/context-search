module.exports = function (list, term) {
	const rows = list.querySelectorAll('.context-search--item');
	let keyWords = term.trim().toLowerCase().split(/[ ,]+/).filter(Boolean);
	if (keyWords.length && keyWords.length > 0) {
		addClass(list, 'context-search--filtered');
		filterElements(rows, keyWords);
	} else {
		removeClass(list, 'context-search--filtered');
		const highlightElements = list.querySelectorAll('[data-original-text]');
		for (let i = highlightElements.length - 1; i >= 0; i -= 1) {
			removeHighlightFromText(highlightElements[i]);
		}
	}
};

function filterElements (rows, terms) {
	for (let i = rows.length - 1; i >= 0; i -= 1) {
		const el = rows[i];
		let text = el.textContent;
		text = text ? text.trim().toLowerCase().replace(/\s{2}/g, ' ') : null;
		if (terms.every(term => text && text.indexOf(term) !== -1)) {
			if (highlightElement(el, terms[0])) {
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
	let found = false;
	if (!el.children.length) {
		found = highlightText(el, term);
	} else if (containsHighlightNode(el)) {
		found = highlightText(el, term);
	} else {
		for (let i = el.children.length - 1; i >= 0; i -= 1) {
			found = found || highlightElement(el.children[i], term);
		}
	}
	return found;
}

function containsHighlightNode (el) {
	return el.children.length === 1 && el.children[0].className === 'context-search--highlight';
}

function highlightText (el, term) {
	let text = el.getAttribute('data-original-text') || el.textContent;
	let startPos = text.toLowerCase().indexOf(term);
	if (startPos !== -1) {
		addHighlightToText(el, text, term, startPos);
		return true;
	} else if (el.getAttribute('data-original-text')) {
		removeHighlightFromText(el);
		return false;
	}
}

function addHighlightToText (el, text, term, startPos) {
	let before = text.slice(0, startPos);
	let after = text.slice(startPos + term.length);
	let between = text.slice(startPos, startPos + term.length);
	el.setAttribute('data-original-text', text);
	el.innerHTML = before + '<span class="context-search--highlight">' + between + '</span>' + after;
}

function removeHighlightFromText (el) {
	let text = el.getAttribute('data-original-text');
	el.removeAttribute('data-original-text');
	el.innerHTML = text;
}

function addClass (el, className) {
	if (el.className.indexOf(className) === -1) {
		el.className += ' ' + className;
	}
}

function removeClass (el, className) {
	let regex = new RegExp(className, 'g');
	el.className = el.className.replace(regex, '');
}
