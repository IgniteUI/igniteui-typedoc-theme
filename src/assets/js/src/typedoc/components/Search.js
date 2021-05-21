import { debounce } from "../utils/debounce";
import { Index } from "lunr";
export function initSearch() {
    var searchEl = document.getElementById("tsd-search");
    if (!searchEl)
        return;
    var searchScript = document.getElementById("search-script");
    searchEl.classList.add("loading");
    if (searchScript) {
        searchScript.addEventListener("error", function () {
            searchEl.classList.remove("loading");
            searchEl.classList.add("failure");
        });
        searchScript.addEventListener("load", function () {
            searchEl.classList.remove("loading");
            searchEl.classList.add("ready");
        });
        if (window.searchData) {
            searchEl.classList.remove("loading");
        }
    }
    var field = document.querySelector("#tsd-search-field");
    var results = document.querySelector(".results");
    if (!field || !results) {
        throw new Error("The input field or the result list wrapper was not found");
    }
    var resultClicked = false;
    results.addEventListener("mousedown", function () { return (resultClicked = true); });
    results.addEventListener("mouseup", function () {
        resultClicked = false;
        searchEl.classList.remove("has-focus");
    });
    field.addEventListener("focus", function () { return searchEl.classList.add("has-focus"); });
    field.addEventListener("blur", function () {
        if (!resultClicked) {
            resultClicked = false;
            searchEl.classList.remove("has-focus");
        }
    });
    var state = {
        base: searchEl.dataset.base + "/",
    };
    bindEvents(searchEl, results, field, state);
}
function bindEvents(searchEl, results, field, state) {
    field.addEventListener("input", debounce(function () {
        updateResults(searchEl, results, field, state);
    }, 200));
    var preventPress = false;
    field.addEventListener("keydown", function (e) {
        preventPress = true;
        if (e.key == "Enter") {
            gotoCurrentResult(results, field);
        }
        else if (e.key == "Escape") {
            field.blur();
        }
        else if (e.key == "ArrowUp") {
            setCurrentResult(results, -1);
        }
        else if (e.key === "ArrowDown") {
            setCurrentResult(results, 1);
        }
        else {
            preventPress = false;
        }
    });
    field.addEventListener("keypress", function (e) {
        if (preventPress)
            e.preventDefault();
    });
    /**
     * Start searching by pressing slash.
     */
    document.body.addEventListener("keydown", function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey)
            return;
        if (!field.matches(":focus") && e.key === "/") {
            field.focus();
            e.preventDefault();
        }
    });
}
function checkIndex(state, searchEl) {
    if (state.index)
        return;
    if (window.searchData) {
        searchEl.classList.remove("loading");
        searchEl.classList.add("ready");
        state.data = window.searchData;
        state.index = Index.load(window.searchData.index);
    }
}
function updateResults(searchEl, results, query, state) {
    checkIndex(state, searchEl);
    // Don't clear results if loading state is not ready,
    // because loading or error message can be removed.
    if (!state.index || !state.data)
        return;
    results.textContent = "";
    var searchText = query.value.trim();
    // Perform a wildcard search
    var res = state.index.search("*" + searchText + "*");
    for (var i = 0, c = Math.min(10, res.length); i < c; i++) {
        var row = state.data.rows[Number(res[i].ref)];
        // Bold the matched part of the query in the search results
        var name_1 = boldMatches(row.name, searchText);
        if (row.parent) {
            name_1 = "<span class=\"parent\">" + boldMatches(row.parent, searchText) + ".</span>" + name_1;
        }
        var item = document.createElement("li");
        item.classList.value = row.classes;
        var anchor = document.createElement("a");
        anchor.href = state.base + row.url;
        anchor.classList.add("tsd-kind-icon");
        anchor.innerHTML = name_1;
        item.append(anchor);
        results.appendChild(item);
    }
}
/**
 * Move the highlight within the result set.
 */
function setCurrentResult(results, dir) {
    var current = results.querySelector(".current");
    if (!current) {
        current = results.querySelector(dir == 1 ? "li:first-child" : "li:last-child");
        if (current) {
            current.classList.add("current");
        }
    }
    else {
        var rel = dir == 1
            ? current.nextElementSibling
            : current.previousElementSibling;
        if (rel) {
            current.classList.remove("current");
            rel.classList.add("current");
        }
    }
}
/**
 * Navigate to the highlighted result.
 */
function gotoCurrentResult(results, field) {
    var current = results.querySelector(".current");
    if (!current) {
        current = results.querySelector("li:first-child");
    }
    if (current) {
        var link = current.querySelector("a");
        if (link) {
            window.location.href = link.href;
        }
        field.blur();
    }
}
function boldMatches(text, search) {
    if (search === "") {
        return text;
    }
    var lowerText = text.toLocaleLowerCase();
    var lowerSearch = search.toLocaleLowerCase();
    var parts = [];
    var lastIndex = 0;
    var index = lowerText.indexOf(lowerSearch);
    while (index != -1) {
        parts.push(escapeHtml(text.substring(lastIndex, index)), "<b>" + escapeHtml(text.substring(index, index + lowerSearch.length)) + "</b>");
        lastIndex = index + lowerSearch.length;
        index = lowerText.indexOf(lowerSearch, lastIndex);
    }
    parts.push(escapeHtml(text.substring(lastIndex)));
    return parts.join("");
}
var SPECIAL_HTML = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;",
};
function escapeHtml(text) {
    return text.replace(/[&<>"'"]/g, function (match) { return SPECIAL_HTML[match]; });
}
